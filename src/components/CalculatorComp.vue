<template>
  <v-container>
    <h1>{{ msg }}</h1>
    <hr />
    <v-container class="pa-5 d-flex align-center justify-center w-100">
      <v-card class="pa-5 number-keys">
        <v-col>
          <v-row align="center" justify="center" class="d-flex">
            <v-text-field
              hide-details="true"
              class="ma-1 pa-0"
              solo
              v-model.number="operand1"
              name="oper1"
              v-if="!operand2"
            />
            <v-text-field
              hide-details="true"
              class="ma-1 pa-0"
              solo
              v-model.number="operand2"
              name="oper2"
              v-if="!!operand2"
            />
            <v-btn class="ma-1" name="backspace" @click="removeNumber()"
              >&#5130;</v-btn
            >
          </v-row>
          <v-row
            class="d-flex"
            align="center"
            justify="center"
            v-if="result"
            transition="scale-transition"
          >
            <span class="result">{{
              operand1 + " " + operationPick + " " + operand2 + " = " + result
            }}</span>
          </v-row>
          <v-row align="center" justify="center">
            <v-btn
              color="teal"
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
              color="teal"
              class="ma-1"
              name="backspace"
              @click="calculate(operationPick)"
              >=</v-btn
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
      this.operationPick = op;
      this.operandPick = "operand2";
    },

    addNumber(number) {
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
      // this.result = "Calculator";
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
  max-width: 300px;
  display: flex;
}
.calc-display {
}

.calc-wrapper {
}
</style>
