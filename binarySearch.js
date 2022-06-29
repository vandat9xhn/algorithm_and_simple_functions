window.binarySearch = function (nums = [1, 2, 3], target = 2) {
    let result = -1;
    let left_count = 0;

    const get = (arr = [1, 2, 3]) => {
        const i_center = Math.floor(arr.length / 2);
        const num_center = arr[i_center];

        if (arr[i_center] === target) {
            result = left_count;

            return;
        }

        if (num_center > target) {
            get(arr.slice(0, i_center));
        } else {
            get(arr.slice(i_center));
            left_count += i_center;
        }
    };

    get(nums);

    return result;
};
