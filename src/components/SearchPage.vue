<template>
  <v-container v-if="show">
    <v-row v-if="searchResults.length == 0" justify="center" class="my-3">
      <v-col cols="12" md="6">
        <h3 align="center">Please enter text and press Enter to search</h3>
      </v-col>
    </v-row>
    <v-row v-if="searchResults.length > 0" justify="center" class="my-3">
      <h3>Found {{searchResults.length}} matches</h3>
    </v-row>
    <v-row justify="center" class="my-3">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchStr"
          solo-inverted
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="ma-3 hidden-md-and-up"
          @keyup.enter="SearchObjects(searchStr);"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="searching" justify="center" class="mt-5">
      <v-progress-circular color="blue" indeterminate size="50"></v-progress-circular>
    </v-row>
    <v-row class="my-5 mx-2">
      <v-card
        class="ma-2"
        style="border-top: 5px orange solid; max-width:400px"
        v-for="(item,i) in searchResults"
        :key="i"
      >
        <v-list-item dense v-for="(p,i) in item.props" :key="i">
          <b>{{p.k}}:</b>
          {{p.v}}
        </v-list-item>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["show"],
  data: () => ({
    searchResults: [],
    searchStr: "",
    searching: false,
  }),
  methods: {
    SearchObjects: function (str) {
      if (str == "") return;
      this.searching = true;
      var that = this;
      axios
        .get("/Objects/searchObjects?str=" + str)
        .then(function (response) {
          console.log(response.data);
          that.searchResults = response.data; //JSON.parse(response.data);
          if (that.searchResults.length == 0) {
            that.$emit("message", "No results for this search request.");
          }
          that.searching = false;
        })
        .catch(function (error) {
          console.log(error);
          that.$emit("message", "Something went wrong while we search data.");
          that.searching = false;
        });
    },
  },
};
</script>

<style>
</style>