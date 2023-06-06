export default {
  state: {
    expensesArr: [],
    stackOfPages: 10,
    focusPage: 1,
  },
  getters: {
    getExpensesSlice(state) {
      return state.expensesArr.slice(
        state.stackOfPages * (state.focusPage - 1),
        state.stackOfPages * (state.focusPage - 1) + state.stackOfPages
      );
    },
    getAllExpenses(state) {
      return state.expensesArr;
    },
    getStackOfPages(state) {
      return state.stackOfPages;
    },
    getFocusPage(state) {
      return state.focusPage;
    },
    getCategoryArr(state) {
      let categoryArr = [
        ...new Set(state.expensesArr.map((item) => item.category)),
      ];

      return categoryArr;
    },
    getAllCategories(state) {
      const resultArr = [];
      state.expensesArr.forEach((item) => {
        let newItem = { category: item.category, count: 1, value: item.value };
        const find = resultArr.findIndex(
          (item) => item.category === newItem.category
        );
        if (find < 0) {
          resultArr.push(newItem);
        } else {
          resultArr[find].count++;
          resultArr[find].value += +item.value;
        }
      });
      return resultArr;
    },
    getTotal(state) {
      return state.expensesArr.reduce((res, cur) => res + Number(cur.value), 0);
    },
  },
  mutations: {
    updateExpenses(state, arr) {
      arr.forEach((element) => {
        element.category =
          element.category.charAt(0).toUpperCase() + element.category.slice(1);
        if (!element.id)
          element.id = Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
          );
        element.date = new Intl.DateTimeFormat("ru-RU").format(
          new Date(element.date)
        );
      });
      state.expensesArr = arr;
    },
    updateFocusPage(state, focusPage) {
      state.focusPage = focusPage;
    },
    updateStackOfPages(state, stackOfPages) {
      state.stackOfPages = stackOfPages;
    },
    updNewExpense(state, expense) {
      expense.category =
        expense.category.charAt(0).toUpperCase() + expense.category.slice(1);
      if (!expense.id)
        expense.id = Math.floor(
          Math.random() * Math.floor(Math.random() * Date.now())
        );
      expense.date = new Intl.DateTimeFormat("ru-RU").format(
        new Date(expense.date)
      );
      state.expensesArr.unshift(expense);
    },
    updEditExpense(state, [indx, item]) {
      item
        ? state.expensesArr.splice(+indx, 1, item)
        : state.expensesArr.splice(+indx, 1);
    },
  },
  actions: {
    fetchData(ctx) {
      const arr = [
        {
          date: "2020-03-28",
          category: "Food",
          value: 169,
        },
        {
          date: "2020-03-24",
          category: "Transport",
          value: 360,
        },
      ];
      ctx.commit("updateExpenses", arr);
    },
  },
};
