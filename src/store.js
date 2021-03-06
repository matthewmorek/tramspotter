import { version } from '../package.json';
import Vue from 'vue';
import Vuex from 'vuex';
import VueWait from 'vue-wait';
import VueGeolocation from 'vue-browser-geolocation';
import axios from 'axios';
import isEmpty from 'lodash/fp/isEmpty';
import bugsnagClient from './utilities/bugsnag';
import { toDate } from 'date-fns';

Vue.use(Vuex);
Vue.use(VueWait);
Vue.use(VueGeolocation);

const autosave = store => {
  store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
  });
};

export default new Vuex.Store({
  state: {
    coordinates: {},
    compiled: {},
    version: ''
  },
  mutations: {
    init_store(state) {
      if (localStorage.getItem('store')) {
        let store = JSON.parse(localStorage.getItem('store'));

        // Check the version stored against current. If different, don't
        // load the cached version
        if (store.version == version) {
          this.replaceState(Object.assign(state, store));
        } else {
          state.version = version;
        }
      }
    },
    update_coordinates(state, { lat, lng }) {
      state.coordinates = {
        ...state.coordinates,
        latitude: lat,
        longitude: lng
      };
    },
    update_metrolink_data(state, data) {
      state.compiled = Object.assign({}, data);
    }
  },
  actions: {
    getCoordinates({ commit }) {
      return new Promise((resolve, reject) => {
        this._vm
          .$getLocation({
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 1800
          })
          .then(coordinates => {
            commit('update_coordinates', coordinates);
            resolve();
          })
          .catch(error => {
            bugsnagClient.notify(error, {
              metaData: {
                context: 'request-geolocation'
              }
            });
            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.error =
                  'Tramspotter was denied access to your location. Check browser permissions.';
                break;
              case error.POSITION_UNAVAILABLE:
                this.error =
                  'Tramspotter could not reliably determine your current location. Try again in a moment.';
                break;
              case error.TIMEOUT:
                this.error =
                  'The request to get your location has timed out. Try again.';
                break;
              case error.UNKNOWN_ERROR:
                this.error = 'An unknown error occurred.';
                break;
            }
            reject(this.error);
          });
      });
    },
    getNearestStopData({ commit, state }) {
      const { longitude, latitude } = state.coordinates;
      return axios
        .get('/.netlify/functions/nearest', {
          params: { longitude, latitude }
        })
        .then(({ data }) => {
          commit('update_metrolink_data', data);
        })
        .catch(error => new Error(error));
    }
  },
  getters: {
    getDistanceToStop: state => {
      const { distance } = state.compiled;
      let readableDistance = (distance / 1609.344).toFixed(2);
      return Number(readableDistance);
    },
    getDepartures: state => {
      if (isEmpty(state.compiled)) {
        return null;
      }

      const { arrivals } = state.compiled;
      return arrivals;
    },
    getTimestamp: state => toDate(state.compiled.timestamp)
  },
  plugins: [autosave],
  strict: process.env.NODE_ENV !== 'production'
});
