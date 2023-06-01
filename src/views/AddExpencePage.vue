<template>
  <v-container>
    <div class="text-h5 text-sm-h3 text-left mb-8">Add your expence</div>
    <hr />
    <v-container class="d-flex justify-center align-center">
      <ExpenceAdd />
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "CalculatorView",
  components: {
    ExpenceAdd: () => import("../components/ExpenceAdd.vue"),
  },
};
</script>
