<template>
      <v-container fluid>
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
</template>

<script>
import axios from "axios";
export default {
 data: () => ({
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
        .then(function(response) {
          console.log(response);
          that.ClearForm();
          that.$emit("message", "The object was successfully added to the database.");
        })
        .catch(function (error) {
          console.log(error);
          that.$emit("message", "Something went wrong while adding an object to the server.");
        });
    },
   
  }
}
</script>

<style>

</style>