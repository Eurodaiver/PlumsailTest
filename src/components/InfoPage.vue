<template>
  <v-container>
    <v-row class="ma-4">
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
        <p><v-icon class="mb-1" color="green">mdi-check-bold</v-icon>Server: .NET Core 2+ or 3+</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>