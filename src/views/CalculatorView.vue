<template>
  <v-container>
    <h1 class="text-h5 text-sm-h3 text-left mb-8">{{ msg }}</h1>
    <hr />
    <CalculatorComp />
  </v-container>
</template>

<script>
export default {
  name: "CalculatorView",
  components: {
    CalculatorComp: () => import("../components/CalculatorComp.vue"),
  },
  data() {
    return {
      msg: "Calculator",
    };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
