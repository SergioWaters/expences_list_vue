<template>
  <v-container class="expenses">
    <v-row>
      <v-col class="text-h5" :cols="1">#</v-col>
      <v-col class="text-h5" :cols="4">Date</v-col>
      <v-col class="text-h5" :cols="4">Category </v-col>
      <v-col class="text-h5" :cols="3">Value </v-col>
    </v-row>
    <v-row v-for="expense in expensesArr" :key="expense.id">
      <v-col :cols="1">{{ getIndex(expense) + 1 }}</v-col>
      <v-col :cols="4">{{ expense.date }}</v-col>
      <v-col :cols="4">{{ expense.category }}</v-col>
      <v-col :cols="2">{{ expense.value }}</v-col>
      <v-col :cols="1" @click="onCont(e, expense)">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-col>
    </v-row>
    <ExpenseEdit />
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ExpensesList",
  components: {
    ExpenseEdit: () => import("./ContextMenu.vue"),
  },
  data() {
    return {
      items: [{ title: "Edit", action: () => {} }, { title: "Delete" }],
      index: null,
    };
  },
  props: {
    expensesArr: Array,
  },
  methods: {
    onContext(e, expense) {
      const props = [this.getIndex(expense), expense, e.currentTarget];
      console.log(props);
      // this.$context.show(props);
    },
    getDate(date) {
      return new Intl.DateTimeFormat("ru-RU").format(new Date(date));
    },

    getIndex(expense) {
      return this.getAllExpenses.indexOf(expense);
    },
  },
  computed: {
    ...mapGetters(["getAllExpenses"]),
  },
};
</script>

<style scoped>
.expenses {
  min-height: 300px;
}
</style>
