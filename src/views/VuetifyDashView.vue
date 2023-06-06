<template>
  <v-container class="dash__wrapper">
    <!-- eslint-disable  -->
    <v-row class="sm-col-4 col-12">
      <v-col>
        <h5 class="text-h5 text-sm-h3 text-left mb-8">
          My personal expenses
        </h5>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark v-on="on" class="mb-4">
              Add New Expense
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <ExpenseAdd/>
          </v-card>
        </v-dialog>

        <v-data-table
          calculate-widths
          :headers="headers"
          :items="addNumber"
          :page.sync="currentPage"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1 text-h5 text-sm-h3 text-left"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              @click="$context.show([item.number - 1, item, $event])"
            >
              mdi-dots-vertical
            </v-icon>
          </template>
        </v-data-table>

        <v-card class="text-center p-2 mt-2">
          <v-pagination
            v-model="currentPage"
            :length="pageCount"
            color="teal"
          ></v-pagination>
        </v-card>
      </v-col>
      <v-col>
        <div class="text-h6 text-center mb-8">Expenses by Category</div>

        <DiagramChart
          :chartData="chartDataMut"
          :options="chartOptions"
          label="Expenses"
        />
      </v-col>
    </v-row>
    <ExpenseEdit />
  </v-container>
</template>

<script>
import randomColor from "randomcolor";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    DiagramChart: () => import("@/components/DiagrammChart.vue"),
    ExpenseEdit: () => import("@/components/ContextMenu.vue"),
    ExpenseAdd: () => import("@/components/ExpenseAdd.vue"),
  },
  data() {
    return {
      chartOptions: { hoverOffset: 4, width: 100, height: 100 },
      dialog: false,
      currentPage: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: "#", value: "number", align: "start", sortable: true },
        { text: "date", value: "date" },
        { text: "category", value: "category" },
        { text: "value", value: "value" },
        { text: " ", value: "actions", sortable: false },
      ],
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
      "getAllCategories",
      "getTotal",
    ]),
    getColorsArr() {
      const count = this.getCategoryArr.length;
      const colors = randomColor({
        count: count,
        hue: "green",
      });
      return colors;
    },
    getPercentsArr() {
      return this.getAllCategories.map((item) => {
        return Math.round((item.value / this.getTotal) * 100);
      });
    },
    chartDataMut() {
      return {
        labels: this.getCategoryArr,
        datasets: [
          {
            backgroundColor: this.getColorsArr,
            data: this.getPercentsArr,
          },
        ],
      };
    },
    numberOfButtons() {
      return Math.ceil(this.getAllExpenses.length / this.getStackOfPages);
    },
    addNumber() {
      const items = this.getAllExpenses;
      items.forEach((expense, indx) => {
        expense.number = +indx + 1;
      });
      return items;
    },
  },
  async mounted() {},
};
</script>

<style scoped>
div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.dash__wrapper {
  position: relative;
}
</style>
