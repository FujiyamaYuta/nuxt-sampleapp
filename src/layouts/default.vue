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
              <b-menu-item icon="account-box" expanded label="参加者">
                <b-menu-item icon="account" label="藤原祐太"></b-menu-item>
                <b-menu-item icon="account" label="藤原祐太"></b-menu-item>
                <b-menu-item icon="account" label="藤原祐太"></b-menu-item>
              </b-menu-item>
              <b-menu-item icon="account" label="My Account">
                <b-menu-item icon="account-box" label="Account data"></b-menu-item>
                <b-menu-item icon="home-account" label="Addresses"></b-menu-item>
              </b-menu-item>
            </b-menu-list>
            <!-- <b-menu-list>
              <b-menu-item label="Expo" icon="link"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
              <b-menu-item icon="logout" label="Logout"></b-menu-item>
            </b-menu-list>-->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false
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
