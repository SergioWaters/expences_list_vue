<template>
  <v-container>
    <h1>{{ msg }}</h1>
    <hr />
    <v-container class="pa-5 d-flex align-center justify-center w-100">
      <v-card class="pa-5 number-keys" elevation="20">
        <v-col>
          <v-row align="center" justify="center" class="d-flex flex-nowrap">
            <v-text-field
              hide-details="true"
              class="ma-1 pa-0 justify-right"
              solo
              v-model.number="operand1"
              name="oper1"
              v-if="!operationPick"
            />
            <v-text-field
              hide-details="true"
              class="ma-1 pa-0 justify-right"
              solo
              v-model.number="operand2"
              name="oper2"
              v-if="!!operationPick"
            />
            <v-btn
              class="ma-1 pa-0 w-2"
              name="backspace"
              small
              @click="removeNumber()"
              >&#5130;</v-btn
            >
          </v-row>
          <v-row align="center" justify="center">
            <v-btn
              :color="operationPick === operation ? 'red' : 'teal'"
              v-for="operation in operationArr"
              :key="operation"
              class="ma-1"
              density="compact"
              :name="operation"
              @click="setOperation(operation)"
            >
              {{ operation }}
            </v-btn>
          </v-row>
          <v-row align="center" justify="center">
            <v-btn
              class="ma-1"
              density="compact"
              :name="number"
              v-for="number in [7, 8, 9]"
              :key="number"
              @click="addNumber(number)"
            >
              {{ number }}
            </v-btn>
          </v-row>
          <v-row align="center" justify="center">
            <v-btn
              class="ma-1"
              density="compact"
              :name="number"
              v-for="number in [4, 5, 6]"
              :key="number"
              @click="addNumber(number)"
            >
              {{ number }}
            </v-btn>
          </v-row>
          <v-row align="center" justify="center">
            <v-btn
              class="ma-1"
              density="compact"
              :name="number"
              v-for="number in 3"
              :key="number"
              @click="addNumber(number)"
            >
              {{ number }}
            </v-btn>
          </v-row>
          <v-row align="center" justify="center">
            <v-btn
              class="ma-1"
              density="compact"
              name="0"
              @click="addNumber(0)"
            >
              0
            </v-btn>
            <v-btn
              class="ma-1"
              density="compact"
              name="'.'"
              @click="addNumber('.')"
            >
              .
            </v-btn>
            <v-btn
              :color="!!result ? 'red' : 'teal'"
              class="ma-1"
              name="backspace"
              @click="calculate(operationPick)"
              >{{ !!result ? "AC" : "=" }}</v-btn
            >
          </v-row>
        </v-col>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "CalculatorComp",
  data() {
    return {
      msg: "Calculator",
      operand1: 0,
      operand2: 0,
      operationPick: null,
      result: 0,
      operationArr: ["+", "-", "/", "*", "%", "p"],
      operandPick: "operand1",
    };
  },
  methods: {
    setOperation(op) {
      this.result = 0;
      this.operationPick = op;
      this.operandPick = "operand2";
    },

    addNumber(number) {
      if (this.operandPick === "operand1") this.result = 0;
      const concat = String(this[this.operandPick]) + String(number);
      this[this.operandPick] === 0 && number !== "."
        ? (this[this.operandPick] = number)
        : (this[this.operandPick] = concat);
    },

    removeNumber() {
      const backspace = String(this[this.operandPick]).slice(0, -1);
      this[this.operandPick] = Number(backspace);
    },

    calculate(operation) {
      this.result = 0;
      const { operand1, operand2 } = this;
      switch (operation) {
        case "+":
          this.result = +operand1 + +operand2;
          break;
        case "-":
          this.result = +operand1 - +operand2;
          break;
        case "/":
          if (+operand2 === 0) return (this.result = "На ноль делить нельзя");
          this.result = +operand1 / +operand2;
          break;
        case "*":
          this.result = +operand1 * +operand2;
          break;
        case "%":
          if (+operand2 === 0) return (this.result = "На ноль делить нельзя");
          this.result = +operand1 % +operand2;
          break;
        case "pow":
          this.result = Math.pow(+operand1, +operand2);
          break;
      }
      this.operand2 = 0;
      this.operand1 = this.result;
      this.operandPick = "operand1";
      this.operationPick = null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.keyboard {
  margin: 20px 0px 50px 0px;
}
.number-keys {
  max-width: 260px;
  display: flex;
}
.calc-display {
}

.calc-wrapper {
}
</style>
