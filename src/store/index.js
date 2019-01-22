import Vue from 'vue'
import Vuex from 'vuex'
import apiCall from '@/utils/api'
import { findIndex } from 'lodash/array'
import Bibs from '@/model/Bibs'
import { get } from 'lodash/object';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false,
    searches: [],
  },
  actions: {
    REQUEST_SEARCHES: function ({ commit, state }, {field, values}) {
      commit('BEGIN_SEARCH', { list: values })

      let op = '%3D';
      if (field == 'all_for_ui') op = 'all';

      return Promise.all(values.map(query => {
        return apiCall({
          url: '/alma/search',
          params: {
            query: `alma.${field} ${op} %22${query}%22`,
            limit: 50,
            expand_items: 'true',
          }
        })
        .then(res => {
          if (res.data.results.length) {
            return res
          } else {
            // If no results in IZ, try NZ
            return apiCall({
              url: '/alma/search',
              params: {
                query: `alma.${field} ${op} %22${query}%22`,
                limit: 50,
                nz: 'true',
              }
            })
          }
        }).then(res => {
          commit('SET_SEARCH_RESULTS', { query: query, data: res.data })
        }).catch(err => {
          commit('MARK_SEARCH_AS_FAILED', { query: query })
        })
      })).then(() => {
        commit('END_SEARCH')
      }).catch(() => {
        commit('END_SEARCH')
      })
    },
    CLEAR_SEARCHES: function({ commit, state }) {
      commit('BEGIN_SEARCH', { list: [] })
    },
  },
  mutations: {
    BEGIN_SEARCH: (state, { list }) => {
      if (!list.length) {
        state.loading = false
        state.searches = []
        return
      }
      state.loading = true
      state.searches = list.map(x => ({ query: x, loading: true, error: null, results: [] }) )
    },
    SET_SEARCH_RESULTS: (state, { query, data }) => {
      let idx = findIndex(state.searches, x => x.query == query)
      state.searches[idx].loading = false
      state.searches[idx].results = new Bibs(data.results)
    },
    MARK_SEARCH_AS_FAILED: (state, { query }) => {
      let idx = findIndex(state.searches, x => x.query == query)
      state.searches[idx].loading = false
      state.searches[idx].error = 'An error occured'
    },
    END_SEARCH: (state) => {
      state.loading = false
    }
  },
  getters: {
    // completedProjects: state => {
    //   return state.projects.filter(project => project.completed).length
    // }
  },
})

export default store
