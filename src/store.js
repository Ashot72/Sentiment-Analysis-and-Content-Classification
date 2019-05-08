import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import url from '@/url'
import { mapRating } from '@/helpers/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comments: [],
    tags: [],
    error: ''
  },
  mutations: {
    addComment (state, comment) {
      state.comments.push(comment)
    },
    addRating (state, { comment, rating }) {
      const items = state.comments.filter(c => c.comment === comment)
      Vue.set(items[items.length - 1], 'rating', rating)
    },
    addTag (state, categories) {
      categories.forEach(({ name }) => {
        const tag = state.tags.find(t => t.name === name)
        tag ? tag.count++ : state.tags.push({ name, count: 1 })
      })
    },
    failed (state, e) {
      state.error = (e.response && e.response.data) || e.message || e
    }
  },
  actions: {
    analyse ({ commit }, comment) {
      commit('addComment', { comment })

      // The content to be classified must have at least 20 tokens (words)
      // in order for the Natural Language API to return a response.
      // extractDocumentSentiment works with less characters but as we
      // call extractDocumentSentiment with classifyText then we will get an error
      // when a comment contains less than 20 tokens. To avoid we should call extractDocumentSentiment
      // and classifyText separately.
      // *** Error in invoking the Natural Language API. Reason : Error: 3 INVALID_ARGUMENT:
      // Invalid text content: too few tokens (words) to process.
      return axios
        .post(url, {
          content: comment,
          extractDocumentSentiment: true,
          classifyText: true
        })
        .then(({ data: { categories, documentSentiment: { score } } }) => {
          commit('addRating', {
            comment,
            rating: mapRating(score)
          }),
          commit('addTag', categories)
        })
        .catch(error => commit('failed', error))
    }
  }
})
