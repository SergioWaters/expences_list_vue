<template>
  <transition fade>
    <v-card class="edit-menu" v-if="isShown" :style="styles">
      <v-btn v-show="!isEdit" color="red" dark small @click="deleteItem"
        >Delete</v-btn
      >
      <v-btn v-show="!isEdit" color="teal" dark small @click="isEdit = !isEdit">
        Edit
      </v-btn>
      <v-card class="justify-self-center" v-show="isEdit">
        <ExpenceAdd :settings="obj" action="edit" :indx="indx" />
      </v-card>
      <button class="closer" @click="onContextHide">&times;</button>
    </v-card>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ExpenceEdit",
  components: {
    ExpenceAdd: () => import("@/components/ExpenceAdd.vue"),
  },
  data() {
    return {
      isShown: false,
      isEdit: false,
      obj: {},
      indx: null,
      xPos: 0,
      yPos: 0,
    };
  },
  methods: {
    ...mapMutations(["updEditExpence"]),

    deleteItem() {
      this.updEditExpence([this.indx]);
      this.onContextHide();
    },

    onContextShow([indx, obj, e]) {
      this.isEdit = false;

      if (indx === this.indx && this.isShown) {
        this.isShown = false;
      } else {
        this.indx = indx;
        this.isShown = true;
      }

      if (e) this.setPositon(e);
      if (obj) this.obj = obj;
    },

    onContextHide() {
      this.isShown = false;
      this.isEdit = false;
    },

    setPositon(e) {
      this.xPos = e.target.offsetLeft + 100;
      this.yPos = e.target.offsetTop + 30;
    },
  },
  computed: {
    styles() {
      return {
        top: this.yPos + "px",
        right: this.xPos + "px",
      };
    },
  },
  mounted() {
    this.$context.EventBus.$on("show", this.onContextShow);
    this.$context.EventBus.$on("hide", this.onContextHide);
  },
  beforeDestroy() {
    this.$context.EventBus.$off("show", this.onContextShow);
    this.$context.EventBus.$off("hide", this.onContextHide);
  },
};
</script>

<style scoped>
.edit-menu {
  position: absolute;
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  background-color: #f8f8f8;
  padding: 20px;
}

.closer {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 20px;
  line-height: 20px;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
