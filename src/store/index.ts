import { createStore } from "vuex";
import { fetchTracks } from "../api";

// Create a new store instance.
const store = createStore({
  state: {
    tracks: [],
  },
  getters: {
    getTracks(state) {
      return state.tracks;
    },
  },
  mutations: {
    setTracks(state, newTracks) {
      state.tracks = newTracks;
    },
  },
  actions: {
    async setTracks({ commit }) {
      try {
        fetchTracks()
          .then((response) => response.json())
          .then((data) => commit("setTracks", data.nowplaying));
      } catch (err) {
      } finally {
        setTimeout(() => store.dispatch("setTracks"), 2000);
      }
    },
  },
});

export default store;
