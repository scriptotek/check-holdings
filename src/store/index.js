import Vue from 'vue'
import Vuex from 'vuex'
import apiCall from '@/utils/api'
import { findIndex } from 'lodash/array'
import Bibs from '@/model/Bibs'
import { get } from 'lodash/object';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    documents: [],
  },
  actions: {
    REQUEST_DOCUMENTS: function ({ commit, state }, isbns) {
      commit('SET_ISBN_LIST', { list: isbns })

      return Promise.all(isbns.map(isbn => {
        return apiCall({url: `/alma/search?expand_items=true&query=alma.all_for_ui%3D%22${isbn}%22`})
            .then(res => {
                commit('SET_DOCUMENT_DATA', { isbn: isbn, data: res.data })
            })
      }));
    }

  },
  mutations: {
    SET_ISBN_LIST: (state, { list }) => {
      state.documents = list.map(x => ({ isbn: x, loading: true, results: [] }) )
    },
    SET_DOCUMENT_DATA: (state, { isbn, data }) => {
      let idx = findIndex(state.documents, x => x.isbn == isbn)
      state.documents[idx].loading = false
      state.documents[idx].results = new Bibs(data.results)
    },
  },
  getters: {
    // completedProjects: state => {
    //   return state.projects.filter(project => project.completed).length
    // }
  },
})

export default store
