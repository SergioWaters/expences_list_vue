<template>
  <v-card
    class="text-left pa-8 cols-5 add-form"
    @keyup.esc="keyPressHandler()"
    tabindex="0"
  >
    <h3 v-if="message">{{ message }}</h3>
    <v-text-field v-model="date" type="date" label="Choose Date" tabindex="1" />
    <v-text-field
      v-model.number="value"
      label="Put amount"
      ref="valRef"
      type="number"
    />
    <v-select
      v-model="category"
      label="Choose Category"
      :items="getCategoryArr"
    />
    <v-text-field
      v-model="customCategory"
      label="Or create a custom category"
    />
    <v-btn color="teal" dark @click="addExpence">{{
      action === "edit" ? "Save changes" : "Add expence"
    }}</v-btn>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "ExpenceAdd",
  props: {
    action: { type: String },
    settings: { type: Object },
    indx: { type: Number },
  },
  data() {
    return {
      message: "",
      date: "",
      category: "",
      customCategory: "",
      id: null,
      value: null,
    };
  },
  methods: {
    keyPressHandler() {
      console.log("escape pressed ");
      this.$router.push({
        path: "/",
      });
    },
    ...mapMutations(["updNewExpence", "updEditExpence"]),
    addExpence() {
      this.message = "";
      this.category = this.customCategory || this.category;
      if (!this.category)
        return (this.message = "Choose category, or create one");
      if (!this.value) return (this.message = "Put expence's value");

      const expence = {
        id: this.id,
        category: this.customCategory || this.category,
        date: this.date || this.getCurrentDate,
        value: this.value,
      };

      if (this.action === "edit") {
        this.updEditExpence([this.indx, expence]);
      }
      if (!this.settings) this.updNewExpence(expence);
      this.message = `You've added ${this.value} to ${expence.category} category`;
    },
  },
  computed: {
    ...mapGetters(["getCategoryArr"]),
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${y}.${m}.${d}`;
    },
  },
  mounted() {
    focus("valRef");
    if (this.settings) {
      const obj = this.settings;
      this.category = obj.customCategory || obj.category;
      this.value = obj.value;
      this.date = obj.date;
      this.id = obj.id;
    }
    if (this.$route.query.push) {
      console.log(this.$route);
      if (this.$route.query.value !== "null") {
        this.customCategory = this.$route.params.category;
        this.value = this.$route.query.value;
        this.addExpence();
      }
      this.$router.push({
        path: "/",
      });
    }
  },
};
</script>

<style scoped>
.add-form {
  max-width: 500px;
  min-width: 300px;
}
</style>
