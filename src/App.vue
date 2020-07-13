<template>
  <v-app>

    <v-app-bar
      app
      color="teal"
      dense
      dark
      flat
    >
      <v-container>
        <v-toolbar-title>
          <v-icon>mdi-magnify</v-icon>
          Check holdings tool
        </v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

    <v-footer app>
      <v-layout
        justify-center
        row
        wrap
      >
          <p>
              Data fra Alma via
              <a :href="lsm_url">LSM</a>.
              Ansvarlig: <a href="mailto:d.m.heggo@ub.uio.no">Dan Michael</a>.
              Kildekode: <a href="https://github.com/scriptotek/check-holdings">på GitHub</a>.
          </p>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data: function() {
    return {
      lsm_url: process.env.VUE_APP_LSM_BASE_URL,
    }
  },
}
</script>

<style lang="sass">
body
    background: #eee
footer
    font-size: 85%
</style>
