<template>
    <div>
        <v-layout row align-center>
            <v-flex shrink>
                <v-select
                  :items="fields"
                  v-model="field"
                  solo
                ></v-select>
            </v-flex>
        </v-layout>
        <p lang="nb" v-show="field == 'isbn'">
            Legg inn en liste med ISBN-numre (én per linje) og sjekk raskt beholdningen vår.
            Selv om et bestemt ISBN-nummer ikke gir treff kan det fortsatt være
            vi har en annen variasjon eller utgave av boka.
        </p>
        <p lang="nb" v-show="field == 'title'">
            Legg inn en liste med titler (én per linje) og sjekk raskt beholdningen vår.
        </p>

        <form @submit.prevent="submit">

            <v-textarea
                label="Values to check:"
                hint="One item per line. With or without hyphens."
                v-model="inputText"
                solo
              ></v-textarea>

            <v-btn
                @click="submit"
                class="white--text"
                color="primary"
                depressed
                :disabled="inputText.length < 3"
              >Check</v-btn>

             (Alma-instans: 47BIBSYS_UBO)

        </form>

        <results :searches="searches"></results>
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
import { flattenDeep, uniq, uniqBy } from 'lodash/array';
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
        submit () {
            let values = this.inputText.replace(/,/g, ' ').split('\n').filter(x => x.length)
            this.$router.push({path: '/', query: {q: this.field + ':' + values.join(',')}})
        },
        checkQueryString: function() {
            if (this.queryString && this.queryString.q) {
                let [field, values] = /([^:]+):(.+)/.exec(this.queryString.q).slice(1)
                this.field = field
                values = values.split(',')
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
