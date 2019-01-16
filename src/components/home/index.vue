<template>
    <div>
    <p lang="nb">
        Alma instans: 47BIBSYS_UBO
    </p>
    <p lang="nb">
        Legg inn en liste med ISBN-numre og sjekk beholdningen vår for dem.
        Husk at selv om vi ikke har et bestemt ISBN-nummer ikke gir treff kan det være
        vi har en variant av boka med et annet ISBN-nummer.
    </p>
        <form @submit.prevent="submit">

            <v-textarea
                label="ISBN numbers to check:"
                hint="One ISBN number per line. With or without hyphens."
                v-model="inputText"
              ></v-textarea>

            <v-btn
                @click="submit"
                class="white--text"
                color="primary"
                depressed
                :disabled="inputText.length < 10"
              >Check</v-btn>
      </form>
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

export default {
    name: 'home',
    data: () => {
        return {
            inputText: '',
            isLoading: true,
        }
    },
    computed: {
        ...mapState({
            queryString: state => get(state, 'route.query'),
        }),
    },
    methods: {
        submit () {
            let isbns = this.inputText.replace(/[^0-9Xx\n]/g, '').split('\n').filter(x => x.length)
            this.$router.push({path: 'results', query: {isbns: isbns.join(',')}})
        }
    },
}
</script>
