<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      color="bulbul"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      @click.stop="miniVariant = !miniVariant"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="bulbul" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Booking',
          to: '/booking',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'test',
          to: '/test',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'test3',
          to: '/test3',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
<style>
.theme--dark.v-application {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    38deg,
    rgba(0, 0, 0, 1) 3%,
    rgba(25, 91, 125, 1) 63%
  );
}

.bulbul {
  background: rgb(114, 238, 255);
  background: linear-gradient(
    270deg,
    rgba(114, 238, 255, 1) 16%,
    rgba(59, 133, 226, 1) 94%
  );
}
.theme--light.v-sheet {
  background-color: #252525;
  border-color: #7a7676;
  color: #ffff;
}
.blublack {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    38deg,
    rgba(0, 0, 0, 1) 3%,
    rgba(25, 91, 125, 1) 63%
  );
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(255, 255, 255, 0.6);
}
</style>
