<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-item-group v-model="page" mandatory color="indigo">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-card-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Add objects</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-feature-search-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Search page</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Information</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="purple darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Plumsail Test</span>
      </v-toolbar-title>
      <v-text-field
        flat
        v-model="searchStr"
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        @keyup.enter="SearchObjects(searchStr)"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon @click="page=2">
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <!-- creating form -->
      <addPage v-if="page==0" @message="showDialog"></addPage>
      <!-- search page -->
      <searchPage ref="searchPage" :show="page==1" @message="showDialog"></searchPage>
      <!-- info page -->
      <infoPage v-if="page==2"></infoPage>
      <!-- popup message box -->
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Information</v-card-title>
          <v-card-text>{{message}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import searchPage from "./components/SearchPage";
import addPage from "./components/AddPage";
import infoPage from "./components/InfoPage";

export default {
  components: {
    infoPage,
    searchPage,
    addPage,
  },
  props: {
    source: String,
  },
  data: () => ({
    page: 0,
    dialog: false,
    message: "",
    drawer: null,
    searchStr: "",
  }),
  methods: {
    SearchObjects: function (searchStr) {
      this.page = 1;
      this.$refs.searchPage.SearchObjects(searchStr); //не работает пока страница поиска не активна
    },
    showDialog: function (message) {
      this.message = message;
      this.dialog = true;
    },
  },
};
</script>