<template>
  <v-app>
      <!--
    <v-toolbar app>
      <v-toolbar-title v-text="'Oria-testing'"></v-toolbar-title>
    </v-toolbar>-->
    <v-content>
        <v-container>
          <h2><router-link to="/" class="bare-link">
            <v-icon>search</v-icon>
            Check holdings tool</router-link></h2>
          <router-view/>
        </v-container>
    </v-content>
    <v-footer>
        <v-layout
          justify-center
          row
          wrap
        >
            <p>
                Data fra Alma via
                <a href="https://ub-lsm.uio.no/">LSM</a>.
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
}
</script>

<style lang="sass">
i.material-icons
    color: inherit !important
footer
    font-size: 85%
a
    text-decoration: none
h2
    margin-bottom: .5em

.bare-link, .bare-link:visited
    text-decoration: none


.v-content__wrap, .v-footer
    p
        margin: 0
.v-btn
    margin: .8em 0
</style>
