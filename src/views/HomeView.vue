<template>
  <v-container>
    <v-row class="sm-col-4 col-12">
      <v-col>
        <div class="text-h5 text-sm-h3 text-left mb-8">
          My personal expenses
        </div>

        <v-dialog v-model="dialog">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark v-on="on">
              Add New Expense <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <ExpenseAdd />
          </v-card>
        </v-dialog>

        <ExpensesList :expensesArr="getExpensesSlice" />
        <ExpensesPagination
          @clickHandler="updateFocusPage"
          :pages="getAllExpenses.length"
          :focus="getFocusPage"
          :stack="getStackOfPages"
        />
      </v-col>
      <v-col>dia</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import ExpensesList from "../components/ExpensesList.vue";
import ExpensesPagination from "../components/ExpensesPagination.vue";

export default {
  name: "HomeView",
  components: {
    ExpensesList,
    ExpensesPagination,
    ExpenseAdd: () => import("@/components/ExpenseAdd.vue"),
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapMutations([
      "updateExpenses",
      "updateFocusPage",
      "updateStackOfPages",
      "addNewExpense",
    ]),
  },
  computed: {
    ...mapGetters([
      "getAllExpenses",
      "getExpensesSlice",
      "getStackOfPages",
      "getFocusPage",
      "getCategoryArr",
    ]),
  },
};
</script>

<style scoped>
div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

