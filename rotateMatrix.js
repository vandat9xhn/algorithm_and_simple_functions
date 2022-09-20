window.matrixRotation = function (
  matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ],
  r = 2
) {
  const count_row = matrix.length;

  const rotateRectangle = (size = 2, i = 2, degree = 90) => {
    const arr_reg_num = [];
    const xy_max = i + size - 1;

    //
    for (let y = i; y < xy_max; y++) {
      arr_reg_num.push(matrix[i][y]);
    }

    for (let x = i; x < xy_max; x++) {
      arr_reg_num.push(matrix[x][xy_max]);
    }

    for (let y = xy_max; y > i; y--) {
      arr_reg_num.push(matrix[xy_max][y]);
    }

    for (let x = xy_max; x > i; x--) {
      arr_reg_num.push(matrix[x][i]);
    }

    //
    const new_i_origin = (size - 1) * 3;
    const count_reg_num = arr_reg_num.length;
    let i_reg_num = new_i_origin;

    const getNextIRegNum = (y = 0, x = 0) => {
      matrix[x][y] = arr_reg_num[i_reg_num];

      i_reg_num += 1;
      if (i_reg_num > count_reg_num - 1) {
        i_reg_num = 0;
      }
    };

    //
    for (let y = i; y < xy_max; y++) {
      getNextIRegNum(y, i);
    }

    for (let x = i; x < xy_max; x++) {
      getNextIRegNum(xy_max, x);
    }

    for (let y = xy_max; y > i; y--) {
      getNextIRegNum(y, xy_max);
    }

    for (let x = xy_max; x > i; x--) {
      getNextIRegNum(i, x);
    }
  };

  const size_start = count_row % 2 === 0 ? 2 : 3;
  let i_size = size_start;

  while (i_size <= count_row) {
    rotateRectangle(i_size, (count_row - i_size) / 2);
    i_size += 2;
  }

  // console.log(matrix);

  return matrix
};
