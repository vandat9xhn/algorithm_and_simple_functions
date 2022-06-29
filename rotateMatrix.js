window.matrixRotation = function (
    matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
    ],
    r = 2
) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const getArr = (index = 0) => {
        const arr = []

        for(let i = index; i < rows - index; i ++){
            
        }

        return arr
    }

    const rotatePoints = (arr = [1, 2], x_count = 3, y_count = 3) => {
        const count_point = (x_count + y_count) * 2 - 4;

        if (count_point === 0) {
            return arr;
        }

        const _r = r % count_point;

        if (_r === 0) {
            return arr;
        }

        return [...arr.slice(_r), ...arr.slice(0, _r)];
    };
};
