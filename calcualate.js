//
const ARR_KEY_NUMBER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ARR_KEY_MORE_NUMBER = ["()", ".", "%"];
const ARR_KEY_FUNC = ["del", "c", "="];
const ARR_KEY_MATH = ["+", "-", "x", "/"];

const getArrIxParentThese = (stack = []) => {
  const arr_ix_open = [];
  const arr = [];

  stack.forEach((item, ix) => {
    if (item === "(") {
      arr_ix_open.push(ix);
      return;
    }

    if (item === ")") {
      const ix_open = arr_ix_open.pop();
      arr.push([ix_open, ix]);
      return;
    }
  });

  return arr;
};

// = -1
const initialArrStack = [
  "1-(-(-(1+1)x1)x1)+(9-1)x2+5",
  "-(-1)",
  "7-(-(1+1)/2+1)",
  "8/4",
  "(3/5+1)x5",
  "-(2/6+1)x6-1+1x(1-2x(1/2))",
];
const initialArrResult = [20, 1, 7, 2, 8, -9];
const initialStack = [...initialArrStack[4].split(""), "+", "0"];
const initial_arr_ix_parent_theses = getArrIxParentThese(initialStack);

//
const handleCalculator = (
  stack = initialStack,
  arr_ix_parent_theses = initial_arr_ix_parent_theses
) => {
  // try {
  const my_calculate = new MyCalculate2(stack, arr_ix_parent_theses);
  const result = my_calculate.getResult();
  return result;
  // } catch (error) {
  //   console.log(error);
  // }
};

class MyCalculate {
  constructor(
    stack = initialStack,
    arr_ix_parent_theses = initial_arr_ix_parent_theses
  ) {
    this.stack = stack;
    this.arr_ix_parent_theses = arr_ix_parent_theses;
    this.obj_result_parent_theses = {};

    this.count_running = 0;
  }

  getNumber = (str_num = "1") => {
    return parseFloat(str_num) / (str_num.slice(-1) === "%" ? 100 : 1);
  };

  handleInParenThese = (i_open = 0, i_close = 0) => {
    let i = i_open;
    let result = 0;
    let operator1 = "+";
    let str_num1 = "0";
    let operator2 = this.stack[i] === "-" ? "-" : "+";
    this.stack[i] === "-" && (i += 1);
    let str_num2 = this.stack[i];

    while (i <= i_close) {
      this.count_running += 1;
      if (this.count_running >= this.stack.length * 10) {
        throw `Exhausted ${this.count_running}`;
      }

      if (str_num2 === "(") {
        str_num2 = `${this.obj_result_parent_theses[i].result}`;
        i = this.obj_result_parent_theses[i].ix_close;
        continue;
      }

      i += 2;

      const num1 = this.getNumber(str_num1);
      const num2 = this.getNumber(str_num2);

      if (["+", "-"].includes(operator1)) {
        if (["+", "-"].includes(operator2)) {
          result += num1 * (operator1 === "+" ? 1 : -1);
          operator1 = operator2;
          str_num1 = str_num2;
          operator2 = this.stack[i - 1];
          str_num2 = this.stack[i];
        } else {
          // operator 2: *, /
          if (operator2 === "/" && num2 === 0) {
            throw "Math is wrong!";
          }

          str_num1 = `${operator2 === "x" ? num1 * num2 : num1 / num2}`;
          operator2 = this.stack[i - 1];
          str_num2 = this.stack[i];
        }
      } else {
        if (operator1 === "/" && num1 === 0) {
          throw "Math is wrong!";
        }
        result = operator1 === "x" ? result * num1 : result / num1;
        operator1 = operator2;
        str_num1 = str_num2;
        operator2 = this.stack[i - 1];
        str_num2 = this.stack[i];
      }
    }

    const num1 = this.getNumber(str_num1);
    if (["+", "-"].includes(operator1)) {
      result += num1 * (operator1 === "+" ? 1 : -1);
    } else {
      result = operator1 === "x" ? result * num1 : result / num1;
    }

    return result;
  };

  getResultObjParentThese = () => {
    this.arr_ix_parent_theses.forEach((item) => {
      const result = this.handleInParenThese(item[0] + 1, item[1]);
      this.obj_result_parent_theses[item[0]] = {
        result: result,
        ix_close: item[1],
      };
    });
  };

  getResult = (rounding = true, num_rounding = 2) => {
    this.getResultObjParentThese();
    let result = this.handleInParenThese(0, this.stack.length - 3);

    if (!rounding) {
      return `${result}`;
    }
    const power_ten = 10 ** num_rounding;
    return `${Math.round(result * power_ten) / power_ten}`;
  };
}

//
class MyCalculate2 {
  constructor(stack = initialStack) {
    this.stack = stack;
    this.count_running = 0;
  }

  getNumber = (str_num = "1") => {
    return parseFloat(str_num) / (str_num.slice(-1) === "%" ? 100 : 1);
  };

  handleInParenThese = (i_open = 0) => {
    let i = i_open;
    let result = 0;
    let operator1 = "+";
    let str_num1 = "0";
    let operator2 = this.stack[i] === "-" ? "-" : "+";
    this.stack[i] === "-" && (i += 1);
    let str_num2 = this.stack[i];

    while (i <= this.stack.length - 1) {
      this.count_running += 1;
      if (this.count_running >= this.stack.length * 2) {
        throw `Exhausted ${this.count_running}`;
      }

      if (str_num2 === "(") {
        const [result_child, i_close] = this.handleInParenThese(i + 1);
        str_num2 = `${result_child}`;
        i = i_close;
        continue;
      }

      if (operator2 === ")") {
        i -= 1;
        break;
      }

      i += 2;

      const num1 = this.getNumber(str_num1);
      const num2 = this.getNumber(str_num2);

      if (["+", "-"].includes(operator1)) {
        if (["+", "-"].includes(operator2)) {
          result += num1 * (operator1 === "+" ? 1 : -1);
          operator1 = operator2;
          str_num1 = str_num2;
          operator2 = this.stack[i - 1];
          str_num2 = this.stack[i];
        } else {
          // operator 2: *, /
          if (operator2 === "/" && num2 === 0) {
            throw "Math is wrong!";
          }

          str_num1 = `${operator2 === "x" ? num1 * num2 : num1 / num2}`;
          operator2 = this.stack[i - 1];
          str_num2 = this.stack[i];
        }
      } else {
        if (operator1 === "/" && num1 === 0) {
          throw "Math is wrong!";
        }
        result = operator1 === "x" ? result * num1 : result / num1;
        operator1 = operator2;
        str_num1 = str_num2;
        operator2 = this.stack[i - 1];
        str_num2 = this.stack[i];
      }
    }

    const num1 = this.getNumber(str_num1);
    if (["+", "-"].includes(operator1)) {
      result += num1 * (operator1 === "+" ? 1 : -1);
    } else {
      result = operator1 === "x" ? result * num1 : result / num1;
    }

    // console.log(result);
    return [result, i];
  };

  getResult = (rounding = true, num_rounding = 2) => {
    let [result] = this.handleInParenThese();

    if (!rounding) {
      return `${result}`;
    }
    const power_ten = 10 ** num_rounding;
    return `${Math.round(result * power_ten) / power_ten}`;
  };
}

// -----

window.calculate = () => {
  const arrResult = [];
  initialArrStack.slice(0).forEach((item) => {
    const stack = [...item.split(""), "+", "0"];
    const result = handleCalculator(stack, getArrIxParentThese(stack));
    arrResult.push(result);
  });

  console.log(arrResult, initialArrResult);
};
