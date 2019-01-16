<template>
  <v-app>
      <!--
    <v-toolbar app>
      <v-toolbar-title v-text="'Oria-testing'"></v-toolbar-title>
    </v-toolbar>-->
    <v-content>
      <h2><router-link to="/" class="bare-link">Check holdings tool</router-link></h2>
      <router-view/>
    </v-content>
    <v-footer>
        <p>
            Data fra Alma via
            <a href="https://ub-lsm.uio.no/">LSM</a>.
            Ansvarlig for verktøyet: <a href="mailto:d.m.heggo@ub.uio.no">Dan Michael</a>.
        </p>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {},
}
</script>

<style lang="sass">
h2
    margin-bottom: .5em

.v-content__wrap, .v-footer
    padding: 1em 2em

    p
        margin: 0

.bare-link, .bare-link:visited
    text-decoration: none

.v-btn
    margin: .8em 0
</style>
