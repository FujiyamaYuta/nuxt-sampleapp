<template>
  <div class="sidebar-page">
    <nav class="navbar header has-shadow" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        type="is-light"
        open
      >
        <div class="p-1">
          <div class="block">
            <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
          </div>
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Menu">
              <b-menu-item icon="information-outline" label="Home" tag="nuxt-link" to="/"></b-menu-item>
              <b-menu-item
                icon="information-outline"
                label="議事録"
                tag="nuxt-link"
                to="/gijiroku/123"
              ></b-menu-item>
              <b-menu-item icon="account-group-outline" expanded>
                <template slot="label" slot-scope="props">
                  参加者
                  <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                </template>
                <b-menu-item icon="account">
                  <template slot="label">
                    藤原祐太
                    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                      <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                      <b-dropdown-item aria-role="listitem">
                        退出させる
                        <b-icon icon="logout" class="is-pulled-right"></b-icon>
                      </b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-menu-item>
                <b-menu-item icon="account">
                  <template slot="label">
                    森
                    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                      <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                      <b-dropdown-item aria-role="listitem">
                        退出させる
                        <b-icon icon="logout" class="is-pulled-right"></b-icon>
                      </b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-menu-item>
                <b-menu-item icon="account">
                  <template slot="label">
                    神谷
                    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                      <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                      <b-dropdown-item aria-role="listitem">
                        退出させる
                        <b-icon icon="logout" class="is-pulled-right"></b-icon>
                      </b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-menu-item>
              </b-menu-item>
              <b-menu-item icon="account">
                <template slot="label" slot-scope="props">
                  個人設定
                  <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                </template>
                <b-menu-item v-show="editNameFlag">
                  <template slot="label">
                    <!-- <b-input ></b-input> -->
                    <input
                      @blur="outOfFocus"
                      ref="refFocus"
                      class="input"
                      v-model="name"
                      type="text"
                      placeholder="名前"
                    />
                  </template>
                </b-menu-item>
                <b-menu-item icon="account" v-show="!editNameFlag">
                  <template slot="label">
                    {{name}}
                    <span @click="editName">
                      <b-icon icon="account-edit" class="is-pulled-right"></b-icon>
                    </span>
                  </template>
                </b-menu-item>
                <b-menu-item icon="emoticon-excited-outline">
                  <template slot="label">
                    アイコン
                    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                      <b-icon icon="account-edit" slot="trigger"></b-icon>
                      <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                      <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-menu-item>
              </b-menu-item>
            </b-menu-list>
            <!-- <b-menu-list>
              <b-menu-item label="Expo" icon="link"></b-menu-item>
            </b-menu-list>-->
            <b-menu-list label="Actions">
              <b-menu-item @click="openLoginModal" icon="login" label="ログイン"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>

      <div class="p-1">
        <b-field>
          <b-switch v-model="reduce">Reduced</b-switch>
        </b-field>
        <div class="container column">
          <nuxt />
        </div>
      </div>
    </section>
    <login-modal ref="loginModal"></login-modal>
  </div>
</template>

<script>
import LoginModal from '~/components/LoginModal'

export default {
  components: {
    LoginModal
  },
  data() {
    return {
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false,
      name: '藤原祐太',
      editNameFlag: false
    }
  },
  methods: {
    openLoginModal() {
      console.log('クリック')
      this.$refs.loginModal.login()
      // this.$buefy.modal.open({
      //   parent: this,
      //   component: LoginModal,
      //   hasModalCard: true,
      //   customClass: 'custom-class custom-class-2',
      //   trapFocus: true
      // })
    },
    editName() {
      console.log('変更')
      this.editNameFlag = true
      // this.$refs.refFocus.focus()
      this.$nextTick(() => this.$refs.refFocus.focus())
    },
    outOfFocus() {
      this.editNameFlag = false
    }
  }
}
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
  width: 100% !important;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    z-index: 2;
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
.b-sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.sidebar-content {
  flex: 1 1 100%;
  overflow-y: scroll;
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.navbar {
  background-color: black;
}
</style>
