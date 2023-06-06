<template>
  <v-container :class="name">
    <div>{{ settings.title }}</div>
    <transition fade>
      <ExpenseAdd v-if="name === 'addExpense'" />
    </transition>
    <button @click="$modal.hide()">&times;</button>
  </v-container>
</template>

<script>
export default {
  components: { ExpenseAdd: () => import("./ExpenseAdd.vue") },
  name: "ModalWindow",
  props: {
    name: String,
    settings: Object,
  },
};
</script>

<style scoped>
.addExpense {
  position: absolute;
  top: 30vh;
  left: 20vw;
  background: #f8f8f8;
  padding: 20px;
}
.expenseEdit {
  display: flex;
  position: absolute;
}
button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
