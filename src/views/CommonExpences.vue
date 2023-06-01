<template>
  <v-container class="common_expences">
    <h3 class="text-h5 text-sm-h3 text-left mb-8">Popular Categories</h3>
    <hr />
    <v-card
      class="d-flex justify-center flex-column align-start pa-3 ma-10 common-expences"
    >
      <v-text-field
        hide-details="true"
        v-model="amount"
        type="number"
        label="Put your expence"
        solo
      />
      <v-btn
        class="ma-2"
        @click="addExpense(item)"
        v-for="item in getCategoryArr"
        :key="item"
      >
        {{ item }}
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      amount: null,
    };
  },
  methods: {
    addExpense(item) {
      if (!this.amount) return;
      this.$router.push(`/addExpence/${item}?value=${this.amount}&push=true`);
    },
  },
  computed: {
    ...mapGetters(["getCategoryArr"]),
  },
};
</script>
<style scoped>
.common-expences {
  max-width: 600px;
  min-width: 300px;
}
</style>
