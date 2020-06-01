import * as firebase from "~/plugins/firebase";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
  },
});

export const state = () => ({
  // counter: 0,
  userEmail: null,
  userName: null,
  userPhoto: null,
  userUid: null,
  userProfile: null,
  userScreenName: null,
});

export const mutations = {
  storeUser(state, payload) {
    state.userEmail = payload.userEmail;
    state.userName = payload.userName;
    state.userPhoto = payload.userPhoto;
    state.userUid = payload.userUid;
    state.userProfile = payload.userProfile;
    state.userScreenName = payload.userScreenName;
  },
  deleteUser(state) {
    state.userEmail = null;
    state.userName = null;
    state.userPhoto = null;
    state.userUid = null;
    state.userProfile = null;
    state.userScreenName = null;
  },
  setuserItems(state, payload) {
    state.userItems = payload.userItems;
  },
};

export const actions = {
  googleSignIn({ dispatch }) {
    var authUI = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(authUI)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        var uid = user.uid;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  },
  facebookSignIn({ dispatch }) {
    var authUI = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(authUI)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        var uid = user.uid;

        var existUser = db.collection("users").doc(uid);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  },
  githubSignIn({ dispatch }) {
    var authUI = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(authUI)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        var uid = user.uid;
        var existUser = db.collection("users").doc(uid);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  },
  twitterSignIn({ dispatch }) {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        var uid = result.user.uid;
        var user = result.additionalUserInfo.profile;
        var imageUrl = user.profile_image_url_https.replace(
          "_normal",
          "_400x400"
        );
        // ** 画像をURLとして保存する対応
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  },
};
