<template>
  <b-modal :active.sync="isCardModalActive" :width="420" scroll="keep">
    <div class="card">
      <!-- <div class="card-image">
        <figure class="image is-4by3">
          <img src="/static/img/placeholder-1280x960.png" alt="Image" />
        </figure>
      </div>-->
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <!-- <figure class="image is-48x48">
              <img src="/static/img/placeholder-1280x960.png" alt="Image" />
            </figure>-->
          </div>
          <div class="media-content">
            <p class="title is-4">新規登録/ログイン</p>
            <p class="subtitle is-6">ログインするとオーナーになれます。</p>
          </div>
        </div>

        <div class="content">
          <button class="button sosial-button is-medium is-info is-fullwidth" @click="twitter">
            <span class="icon">
              <i class="fab fa-twitter"></i>
              &nbsp;
              <span>Twitter</span>
            </span>
          </button>

          <button
            class="button sosial-button is-medium is-info is-fullwidth"
            style="background-color:white;color:red;border:2px solid; border-color:red;"
            @click="google"
          >
            <span class="icon">
              <i class="fab fa-google"></i>
              &nbsp;
              <span>Google</span>
            </span>
          </button>

          <button
            class="button sosial-button is-medium is-info is-fullwidth"
            style="background-color:#24292e"
            @click="github"
          >
            <span class="icon">
              <i class="fab fa-github"></i>
              &nbsp;
              <span>Github</span>
            </span>
          </button>

          <button
            class="button sosial-button is-medium is-info is-fullwidth"
            style="background-color:#1877f2"
            @click="facebook"
          >
            <span class="icon">
              <i class="fab fa-facebook"></i>
              &nbsp;
              <span>Facebook</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma-social/bin/bulma-social.min.css'

import firebase from 'firebase'
import { firestore } from '~/plugins/firebase.js'

export default {
  // props: {
  //   isCardModalActive: {
  //     type: Boolean,
  //     required: true
  //   }
  // },
  data() {
    return {
      isCardModalActive: false
    }
  },
  methods: {
    login() {
      this.isCardModalActive = true
    },
    twitter() {
      var authUI = new firebase.auth.TwitterAuthProvider()

      // 認証
      const auth = (authUI) => {
        return new Promise((resolve, reject) => {
          console.log('auth')
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code
              var errorMessage = error.message
              var email = error.email
              var credential = error.credential
            })
        })
      }

      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          console.log('createAccount', result)

          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          var userObject = {}
          var user = result.additionalUserInfo.profile
          userObject.token = result.credential.accessToken
          userObject.secret = result.credential.secret
          userObject.uid = result.user.uid
          userObject.refreshToken = result.user.refreshToken
          userObject.imageUrl = user.profile_image_url_https.replace(
            '_normal',
            '_400x400'
          )
          userObject.displayName = user.name
          userObject.profile = user.description
          userObject.screenName = user.screen_name
          userObject.email = user.email
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }

      const setPublicUsertData = (userObject) => {
        return new Promise((resolve, reject) => {
          console.log('setPublicUsertData', userObject)
          var publicUser = firestore.collection('users').doc(userObject.uid)
          publicUser.set(userObject).then((result) => {
            resolve(userObject)
          })
        })
      }

      const setPrivateUsertData = (userObject) => {
        return new Promise((resolve, reject) => {
          console.log('setPrivateUsertData', userObject)
          var privateUsers = firestore
            .collection('privateUsers')
            .doc(userObject.uid)

          privateUsers.set(userObject).then((result) => {
            resolve(userObject)
          })
        })
      }

      const onRejectted = (v) => {
        console.log('onRejectted', v)
      }

      Promise.resolve(authUI)
        .then(auth)
        .then(getAccountData)
        .then(setPublicUsertData)
        .then(setPrivateUsertData)
        .catch(onRejectted)
    },
    facebook() {
      console.log('facebook')
      var authUI = new firebase.auth.FacebookAuthProvider()
      // 認証
      const auth = (authUI) => {
        return new Promise((resolve, reject) => {
          console.log('auth')
          // This gives you a the Facebook OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code
              var errorMessage = error.message
              var email = error.email
              var credential = error.credential
            })
        })
      }

      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          console.log('createAccount', result)

          // This gives you a Facebook Access Token.
          var userObject = {}
          var user = result.user
          userObject.token = result.credential.accessToken
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email // null
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // userObject.profile = result.additionalUserInfo.profile.bio // null
          // userObject.screenName = result.additionalUserInfo.profile.login // null
          resolve(userObject)
        })
      }

      const setPublicUsertData = (userObject) => {
        return new Promise((resolve, reject) => {
          console.log('setPublicUsertData', userObject)
          // ** usersに登録するObjのみを登録する
          var publicUser = firestore.collection('users').doc(userObject.uid)
          publicUser.set(userObject).then((result) => {
            resolve(userObject)
          })
        })
      }

      const setPrivateUsertData = (userObject) => {
        return new Promise((resolve, reject) => {
          console.log('setPrivateUsertData', userObject)
          var privateUsers = firestore
            .collection('privateUsers')
            .doc(userObject.uid)
          // ** privateUsersに登録するObjのみを登録する
          privateUsers.set(userObject).then((result) => {
            resolve(userObject)
          })
        })
      }

      const onRejectted = (v) => {
        console.log('onRejectted', v)
      }

      Promise.resolve(authUI)
        .then(auth)
        .then(getAccountData)
        .then(setPublicUsertData)
        .then(setPrivateUsertData)
        .catch(onRejectted)
    },
    google() {
      console.log('google')
      var authUI = new firebase.auth.GoogleAuthProvider()

      // 認証
      const auth = (authUI) => {
        return new Promise((resolve, reject) => {
          console.log('auth')
          // This gives you a the Google OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code
              var errorMessage = error.message
              var email = error.email
              var credential = error.credential
            })
        })
      }

      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          console.log('getAccountData', result)
          // This gives you a Google Access Token.
          var userObject = {}
          var user = result.user
          userObject.token = result.credential.accessToken
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email // null
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // userObject.profile = result.additionalUserInfo.profile.bio // null
          // userObject.screenName = result.additionalUserInfo.profile.login // null
          debugger
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }

      const setPublicUsertData = (userObject) => {
        return new Promise((resolve, reject) => {
          console.log('setPublicUsertData', userObject)
          var publicUser = firestore.collection('users').doc(userObject.uid)
          // ** usersに登録するObjのみを登録する
          publicUser.set(userObject).then((result) => {
            resolve(userObject)
          })
        })
      }

      const setPrivateUsertData = (userObject) => {
        return new Promise((resolve, reject) => {
          console.log('setPrivateUsertData', userObject)
          var privateUsers = firestore
            .collection('privateUsers')
            .doc(userObject.uid)
          // ** privateUsersに登録するObjのみを登録する
          privateUsers.set(userObject).then((result) => {
            resolve(userObject)
          })
        })
      }

      const onRejectted = (v) => {
        console.log('onRejectted', v)
      }

      Promise.resolve(authUI)
        .then(auth)
        .then(getAccountData)
        .then(setPublicUsertData)
        .then(setPrivateUsertData)
        .catch(onRejectted)
    },
    github() {
      console.log('github')
      var authUI = new firebase.auth.GithubAuthProvider()

      // 認証
      const auth = (authUI) => {
        return new Promise((resolve, reject) => {
          console.log('auth')
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code
              var errorMessage = error.message
              var email = error.email
              var credential = error.credential
            })
        })
      }

      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          console.log('getAccountData', result)

          // This gives you a GitHub Access Token.
          var userObject = {}
          var user = result.user
          userObject.token = result.credential.accessToken
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          userObject.profile = result.additionalUserInfo.profile.bio
          userObject.screenName = result.additionalUserInfo.profile.login
          debugger
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }

      const setPublicUsertData = (userObject) => {
        return new Promise((resolve, reject) => {
          console.log('setPublicUsertData', userObject)
          var publicUser = firestore.collection('users').doc(userObject.uid)
          // ** usersに登録するObjのみを登録する
          publicUser.set(userObject).then((result) => {
            resolve(userObject)
          })
        })
      }

      const setPrivateUsertData = (userObject) => {
        return new Promise((resolve, reject) => {
          console.log('setPrivateUsertData', userObject)
          var privateUsers = firestore
            .collection('privateUsers')
            .doc(userObject.uid)
          // ** privateUsersに登録するObjのみを登録する
          privateUsers.set(userObject).then((result) => {
            resolve(userObject)
          })
        })
      }

      const onRejectted = (v) => {
        console.log('onRejectted', v)
      }

      Promise.resolve(authUI)
        .then(auth)
        .then(getAccountData)
        .then(setPublicUsertData)
        .then(setPrivateUsertData)
        .catch(onRejectted)
    }
  }
}
</script>
<style>
.sosial-button {
  margin-top: 1rem;
}
</style>
