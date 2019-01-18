<template>
    <div>
        <div style="height:8px;">
            <v-progress-linear :indeterminate="true" v-show="loading" class="ma-0"></v-progress-linear>
        </div>
        <div v-if="!loading && !searches.length">
            No searches, click the header to go back.
        </div>
        <v-container fluid :key="search.query" v-for="search in searches" class="pa-0 pt-1" style="border-top: 1px solid #eee;">
            <v-layout row wrap>
                <v-flex xs2>
                    {{ search.query }}
                </v-flex>
                <v-flex>
                    <div v-if="search.loading">
                        Waiting...
                    </div>
                    <div v-if="search.error">
                        An error occured!
                    </div>
                    <div v-if="!search.loading && !search.error">
                        <div v-if="!search.results.data.length">
                            <em>Not found, please check manually</em>
                        </div>
                        <v-treeview
                            v-else
                            :items="search.results.treedata()"
                            :open="search.results.open_nodes()"
                            :open-on-click="true"
                            item-key="id">
                                <template slot="label" slot-scope="{ item }">
                                    <v-icon small v-if="item.available === false">report</v-icon>
                                    {{ item.name }} {{ item.edition || '' }}
                                    <span v-if="item.summary" class="summary">({{item.summary}})</span>

                                    <router-link v-if="item.available === false" target="_blank" :to="{name: 'Home', query: {q:'title:' + encodeURIComponent(item.parent_name) }}">Try title search<i class="v-icon markdown--link mdi mdi-open-in-new"></i></router-link>

                                    <a v-if="item.link" :href="item.link" target="_blank" class="markdown--link markdown--external">Oria<i class="v-icon markdown--link mdi mdi-open-in-new"></i></a>

                                    <a v-if="item.ebooklink" :href="item.ebooklink" target="_blank" class="markdown--link markdown--external">Fulltext<i class="v-icon markdown--link mdi mdi-open-in-new"></i></a>

                                </template>
                        </v-treeview>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<style lang="sass">
.summary
    color: #008
.v-treeview-node__root
    height: auto
.v-treeview-node__label
    font-size: 13px
    flex-shrink: 1

.markdown--link
    margin-left: 4px
    font-size: 14px

i + .v-treeview-node__content:hover
    background: #ffe

.v-treeview-node__content
    flex-shrink: 1

*
    -webkit-user-select: auto !important  /* Chrome 49+ */
    -moz-user-select: auto !important     /* Firefox 43+ */
    -ms-user-select: auto !important      /* No support yet */
    user-select: auto !important          /* Likely future */

</style>
<script>
import { mapState } from 'vuex';

export default {
    name: 'results',
    props: [
        'searches',
    ],
    computed: {
        ...mapState({
            loading: state => state.loading,
        }),
    },
}
</script>
