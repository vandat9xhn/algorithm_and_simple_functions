window.searchMatrix = function (
    matrix = [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
    ],
    target = 13
) {
    if (
        matrix.length === 0 ||
        matrix[0][0] > target ||
        matrix.slice(-1)[0].slice(-1)[0] < target
    ) {
        return false;
    }

    let i_matrix = (function () {
        let i_l = 0;
        let i_r = matrix.length - 1;

        while (i_l < i_r) {
            const i_c = Math.ceil((i_l + i_r) / 2);

            if (target < matrix[i_c][0]) {
                i_r = i_c - 1;
            } else {
                i_l = i_c;
            }
        }

        return i_l;
    })();

    let result = (function () {
        let i_l = 0;
        let i_r = matrix[i_matrix].length - 1;
        const arr = matrix[i_matrix];

        if (arr[0] < target || arr.slice(-1)[0] > target) {
            return false;
        }

        while (i_l < i_r) {
            const i_c = Math.ceil((i_l + i_r) / 2);

            if (target < arr[i_c]) {
                i_r = i_c - 1;
            } else {
                i_l = i_c;
            }
        }

        if (arr[i_l] !== target) {
            return false;
        }

        return true;
    })();

    return result;
};
