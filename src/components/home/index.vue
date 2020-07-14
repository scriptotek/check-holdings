<template>
    <div>

        <p>
            Verktøyet lar deg raskt sjekke beholdningen i Alma ({{ ALMA_INST }}) for en liste med bøker.
        </p>

        <v-row align="center">
            <v-col cols="12" sm="4">
                <v-select
                  label="Search by"
                  :items="fields"
                  v-model="field"
                  outlined
                  hide-details
                ></v-select>
            </v-col>
            <v-col class="text-body-2">
                <span v-show="field == 'isbn'">
                    Legg inn ett ISBN-nummer per linje i tekstfeltet under, med eller uten bindestreker.
                    OBS: Selv om et bestemt ISBN-nummer ikke gir treff, kan det fortsatt være
                    vi har en annen utgave av boka.
                </span>
                <span v-show="field == 'title'">
                    Legg inn en boktittel per linje i tekstfeltet under.
                </span>
                <span v-show="field == 'all_for_ui'">
                    Legg inn nøkkelord som forfatter, tittel osv. Én linje per bok i tekstfeltet under.
                </span>
            </v-col>
        </v-row>

        <form @submit.prevent="submit">
            <v-textarea
                label="Values to check:"
                v-model="inputText"
                outlined
                hide-details
            ></v-textarea>
            <v-btn
                @click="submit"
                class="my-2"
                color="primary"
                depressed
                :disabled="inputText.length < 3"
              >Check</v-btn>
            <v-btn
                @click="clear"
                class="my-2 ml-2"
                color="secondary"
                depressed
                :disabled="inputText.length == 0"
              >Clear</v-btn>
        </form>

        <results :field="field" :searches="searches" @changeField="changeField($event)"></results>
    </div>
</template>

<style>
    .home {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>

<script>
import { mapState } from 'vuex';
import { get } from 'lodash/object';
import { uniq } from 'lodash/array';
import results from '../results';

export default {
    name: 'home',
    components: {
        results
    },
    data: () => {
        return {
            inputText: '',
            field: 'isbn',
            fields: [
                {text: 'ISBN', value: 'isbn'},
                {text: 'Title', value: 'title'},
                {text: 'Keyword', value: 'all_for_ui'},
            ],
            ALMA_INST: process.env.VUE_APP_ALMA_INST,
        }
    },
    computed: {
        ...mapState({
            queryString: state => get(state, 'route.query'),
            searches: state => get(state, 'searches'),
        }),
    },
    watch: {
        queryString: function(value, oldValue) {
            this.checkQueryString();
        },
    },
    mounted() {
        this.checkQueryString();
    },
    methods: {
        changeField (newField) {
            console.log('CHANGE', newField)
            this.field = newField
            this.submit()
        },
        clear () {
            this.field = 'isbn'
            this.inputText = ''
            this.$router.push({path: '/', query: {}})
        },
        submit () {
            let values = this.inputText
                .replace(/,/g, ' ')
                .split('\n')
                .map(x => x.trim())
                .map(x => {
                    if (this.field == 'isbn') {
                        return x
                            .replace(/ISBN-(10|13)/gi, '')
                            .replace(/[^0-9Xx]/g, '')
                    }
                    return x
                })
                .filter(x => x.length)
            this.$router.push({path: '/', query: {q: this.field + ':' + values.join(',')}})
        },
        checkQueryString: function() {
            if (this.queryString && this.queryString.q) {
                let [field, values] = /([^:]+):(.+)/.exec(this.queryString.q).slice(1)
                this.field = field
                values = uniq(values.split(','))
                this.inputText = values.join('\n')
                this.$store.dispatch('REQUEST_SEARCHES', {field: field, values: values})
            } else {
                this.$store.dispatch('CLEAR_SEARCHES')
                this.inputText = ''
                this.field = 'isbn'
            }
        },
    },
}
</script>
