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
      <v-container v-if="page==0" fluid>
        <v-row align="center" justify="center">
          <v-col cols="11" style="max-width:600px">
            <v-card elevation="5">
              <v-card-title class="orange darken-3 white--text">Create object form</v-card-title>
              <v-form v-model="valid">
                <v-container>
                  <v-row class="mx-2">
                    <v-col cols="12" md="6">
                      <!-- name -->
                      <v-text-field
                        v-model="object.name"
                        :rules="nameRules"
                        :counter="20"
                        prepend-icon="mdi-label-outline"
                        placeholder="Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="text-center">
                      <!-- level -->
                      <v-rating v-model="object.quality"></v-rating>
                      <span class="caption text-uppercase">rating: {{object.quality}}</span>
                    </v-col>
                    <v-col cols="12" md="6">
                      <!-- time -->
                      <v-menu
                        :close-on-content-click="true"
                        transition="scale-transition"
                        offset-y
                        min-width="200px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="object.date"
                            label="Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="object.date" no-title scrollable></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="6">
                      <!-- type -->
                      <v-select :items="types" label="Type" v-model="object.type"></v-select>
                    </v-col>
                    <v-col cols="6">
                      <!-- packaging -->
                      <v-radio-group v-model="object.packaging" :mandatory="true">
                        <v-radio label="Full" value="full"></v-radio>
                        <v-radio label="OEM" value="OEM"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="6">
                      <!-- options -->
                      <v-switch
                        v-model="object.options"
                        label="Fragile"
                        value="fragile"
                        hide-details
                      ></v-switch>
                      <v-switch
                        v-model="object.options"
                        label="Oversized"
                        value="oversized"
                        hide-details
                      ></v-switch>
                    </v-col>
                    <v-col cols="12">
                      <!-- comments -->
                      <v-textarea
                        v-model="object.comments"
                        outlined
                        class="mx-2"
                        label="Comments"
                        rows="3"
                        prepend-icon="mdi-text"
                        :counter="200"
                        :rules="commentsRules"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="white--text" color="red" @click="ClearForm()">Clear</v-btn>
                <v-btn
                  color="success"
                  :disabled="!valid"
                  class="mr-4 white--text"
                  @click=" SaveObject(object);"
                >Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- search page -->
      <v-container v-if="page==1">
        <v-row v-if="searchResults.length == 0" justify="center" class="my-3">
          <v-col cols="12" md="6">
            <h3 align="center">Please enter text and press Enter to search</h3>
            <v-text-field
              v-model="searchStr"
              solo-inverted
              prepend-inner-icon="mdi-magnify"
              label="Search"
              class="ma-3"
              @keyup.enter="SearchObjects(searchStr)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else justify="center" class="my-3">
          <h3>Found {{searchResults.length}} matches</h3>
        </v-row>
        <v-row v-if="searching" justify="center" class="mt-5">
          <v-progress-circular color="blue" indeterminate size="50"></v-progress-circular>
        </v-row>
        <v-row class="my-5">
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
      <!-- into page -->
      <v-container v-if="page==2">
        <v-row>
          <v-col cols="12">
            <h2 class="text-center mb-5">Test task for Vue JS and C# programmers</h2>
            <p>
              <v-icon class="mb-1" color="green">mdi-check-bold</v-icon>1. Create a web form containing different field types e.g. single-line text, multiple-line text, drop-down, date, radio, and checkboxes.
            </p>
            <p>
              <v-icon class="mb-1" color="green">mdi-check-bold</v-icon>2. Add client-side validation for your form.
            </p>
            <p>
              <v-icon class="mb-1" color="green">mdi-check-bold</v-icon>3. Send submissions of your form as JSON-objects to the server. Ex.:
            </p>
            <p class="pl-7">
              {
              field1: 'value1'
              field2: true,
              field3: ['option1', 'option3']
              ...
              }
            </p>
            <p>
              <v-icon class="mb-1" color="green">mdi-check-bold</v-icon>4. Implement API for saving and searching the submissions of your form.
            </p>
            <p>
              <v-icon class="mb-1" color="green">mdi-check-bold</v-icon>5. Create a web page for searching submissions of your form. The search page as well as corresponding API must be universal and should not depend on certain field types the original form consisted of. At the same time, all fields of the original form must be included in the search index. Modifications to the original form e.g. adding/removing fields, changing field types, should not affect API and the search page. If you add new fields to your form, submissions from both forms (prior and after modifications) must be searchable and new fields must be included in the search index automatically.
              The case in this task is quite basic but consider it as a real-life application. Demonstrate your architectural skills, understanding UI/UX, code quality, and simplicity of the building process.
              If you're not able to implement some of the requirements, describe the reason and send us what you have done.
            </p>
            <h3>Technologies</h3>
            <p>
              <v-icon class="mb-1" color="green">mdi-check-bold</v-icon>Client: Vue JS, Bootstrap, TypeScript or ES6/7 with babel, webpack
            </p>
            <p>Server: .NET Core 2+ or 3+</p>
          </v-col>
        </v-row>
      </v-container>
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
import axios from "axios";
axios.defaults.baseURL = "https://plumsailtestapi.azurewebsites.net"; //"http://localhost:5000/";
export default {
  props: {
    source: String,
  },
  data: () => ({
    page: 0,
    dialog: false,
    message: "",
    drawer: null,
    types: ["Soft", "Hard", "Liquid"],
    object: {
      name: "",
      date: "",
      type: "",
      packaging: "",
      options: [],
      quality: 0,
      comments: "",
    },
    searchStr: "",
    searchResults: [],
    searching: false,
    valid: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 20 || "Name must be less than 20 characters",
    ],
    commentsRules: [
      (v) => v.length <= 200 || "Comment must be less than 200 characters",
      (v) => {
        const pattern = /^([a-zA-Zа-яА-Я\- .,:;\r\n"'_0-9]*)$/;
        return pattern.test(v) || v == null || "Invalid symbol.";
      },
    ],
  }),
  methods: {
    ClearForm: function () {
      this.object = {
        name: "",
        date: "",
        type: "",
        packaging: "",
        options: [],
        quality: 0,
        comments: "",
      };
    },
    SaveObject: function (obj) {
      var that = this;
      axios
        .post("/Objects/addObject", obj)
        .then(function (response) {
          console.log(response);
          that.ClearForm();
          that.message = "The object was successfully added to the database.";
          that.dialog = true;
        })
        .catch(function (error) {
          console.log(error);
          that.message =
            "Something went wrong while adding an object to the server.";
          that.dialog = true;
        });
    },
    SearchObjects: function (str) {
      if (str == "") return;
      this.page = 1;
      this.searching = true;
      var that = this;
      axios
        .get("/Objects/searchObjects?str=" + str)
        .then(function (response) {
          console.log(response.data);
          that.searchResults = response.data; //JSON.parse(response.data);
          if (that.searchResults.length == 0) {
            that.message = "No results for this search request.";
            that.dialog = true;
          }

          that.searching = false;
        })
        .catch(function (error) {
          console.log(error);
          that.message = "Something went wrong while we search data.";
          that.dialog = true;
          that.searching = false;
        });
    },
  },
};
</script>