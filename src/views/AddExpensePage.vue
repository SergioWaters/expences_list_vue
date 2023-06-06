<template>
  <v-container>
    <div class="text-h5 text-sm-h3 text-left mb-8">Add your expense</div>
    <hr />
    <v-container class="d-flex justify-center align-center">
      <ExpenseAdd />
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "CalculatorView",
  components: {
    ExpenseAdd: () => import("../components/ExpenseAdd.vue"),
  },
};
</script>
