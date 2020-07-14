<template>
    <div>
        <div style="height:8px;">
            <v-progress-linear :indeterminate="true" v-show="loading" class="ma-0"></v-progress-linear>
        </div>
        <div v-if="!loading && !searches.length">
        </div>
            <v-row no-gutters class="ch-row" :key="search.query" v-for="search in searches">
                <v-col :sm="2" class="pr-2">
                    <strong>{{ search.query }}</strong>
                </v-col>
                <v-col :sm="10">
                    <div v-if="search.loading">
                        Waiting...
                    </div>
                    <div v-if="search.error">
                        An error occured!
                    </div>
                    <div v-if="!search.loading && !search.error">
                        <div v-if="!search.results.data.length">
                            <em>Not found, please check manually</em>
                            <span v-if="field === 'isbn'">, or try
                                <a href='#' @click.prevent="keywordSearch()" class="mx-2">keyword search</a>
                            </span>
                        </div>
                        <v-treeview
                            v-else
                            dense
                            hoverable
                            :activatable="true"
                            :items="search.results.treedata()"
                            :open="search.results.open_nodes()"
                            item-key="id">
                                <template slot="label" slot-scope="{ item }">
                                    <v-icon small v-if="item.available === false">mdi-alert</v-icon>
                                    {{ item.name }} {{ item.edition || '' }}
                                    <span v-if="item.summary" class="summary">({{item.summary}})</span>

                                    <router-link v-if="item.available === false" :to="getTitleSearchLink(item)" class="mx-2">Try title search</router-link>

                                    <v-btn v-if="item.link" text small color="teal" :href="item.link" target="_blank" class="mx-1">
                                        Oria
                                        <v-icon small>mdi-open-in-new</v-icon>
                                    </v-btn>

                                    <v-btn v-if="item.ebooklink" text small color="teal" :href="item.ebooklink" target="_blank" class="mx-1">
                                        Fulltext
                                        <v-icon small>mdi-open-in-new</v-icon>
                                    </v-btn>

                                </template>
                        </v-treeview>
                    </div>
                </v-col>
            </v-row>

        <p v-if="searches.length" style="margin-top:2em;">
            Note: The number of bibliographic records retrieved for <em>each</em> search
            (one search constituting one line in the table above) is capped at 50.
        </p>
    </div>
</template>
<style lang="sass">
.ch-row
    border-bottom: 0.5px solid #009688
.summary
    color: #008


.v-treeview--dense .v-treeview-node__root
    min-height: 30px

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

</style>
<script>
import { mapState } from 'vuex';

export default {
    name: 'results',
    props: [
        'field',
        'searches',
    ],
    computed: {
        ...mapState({
            loading: state => state.loading,
        }),
    },
    methods: {
        keywordSearch() {
            this.$emit('changeField', 'all_for_ui')
        },
        getTitleSearchLink(item) {
            if (!item.parent_name) {
                return {}
            }
            const title = item.parent_name.replace(/,/g, ' ').replace(/ {2}/g, ' ')
            return {
                name: 'Home',
                query: {
                    q: 'title:' + title
                }
            }
        },
    },
}
</script>
