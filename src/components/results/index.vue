<template>
    <div>
          <v-data-table
            :disable-initial-sort="true"
            :headers="headers"
            :items="documents"
            :loading="loading"
            :pagination="{'rowsPerPage': -1}"
            class="elevation-1"
          >

            <template slot="items" slot-scope="props">
              <td style="width: 120px">{{ props.item.isbn }}</td>
              <td>
                <div v-if="props.item.loading">
                    Waiting...
                </div>
                <div v-else>
                    <div v-if="!props.item.results.data.length">
                        <em>ISBN not found, please check manually</em>
                    </div>
                    <v-treeview
                        v-else
                        :items="props.item.results.treedata()"
                        :open="props.item.results.open_nodes()"
                        :open-on-click="true"
                        item-key="id">
                            <template slot="label" slot-scope="{ item }">
                                {{ item.name }}  <a v-if="item.link" :href="item.link" target="_blank">Oria</a>
                            </template>
                        </v-treeview>
                </div>
              </td>
            </template>
          </v-data-table>

    </div>
</template>
<style>
.v-treeview-node__root {
    height: auto;
}
.v-treeview-node__label {
    font-size: 13px;
}
</style>
<script>
import { mapState } from 'vuex';
import { get } from 'lodash/object';
import { flattenDeep, uniq, uniqBy } from 'lodash/array';

export default {
    name: 'results',
    data: () => {
        return {
            loading: true,
            headers: [
                { text: 'ISBN', value: 'isbn', sortable: false },
                { text: 'Matches', value: 'matches', sortable: false },
                // { text: 'Holdings', value: 'holding' },
            ]
        }
    },
    computed: {
        ...mapState({
            queryString: state => get(state, 'route.query'),
            documents: state => get(state, 'documents'),
        }),
    },
    watch: {
        queryString: function(value, oldValue) {
            this.checkQueryString();
        },
        documents: function(value, oldValue) {
            // console.log('Docs updated', value);
        },
    },
    mounted() {
        this.checkQueryString();
    },
    methods: {
        checkQueryString: function() {
            if (this.queryString && this.queryString.isbns) {
                this.$store.dispatch('REQUEST_DOCUMENTS', this.queryString.isbns.split(',')).then(x => {
                    console.log('>>> ALL DONE!')
                    this.loading = false
                })
            }
        }
    }
}
</script>
