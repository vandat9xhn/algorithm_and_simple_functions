window.badVersion = function (nums = [1, 2], target = 7) {
    let result = 0;
    let count = nums.length;

    while (result < count) {
        const i_center = Math.floor((count + result) / 2);

        if (target > nums[i_center]) {
            result = i_center + 1;
        } else {
            count = i_center;
        }
    }

    return result;

    // let left_count = 0;
    // let result = -1;

    // const get = (arr = [1, 2]) => {
    //     const i_center = Math.floor(arr.length / 2);
    //     const num_center = arr[i_center];

    //     if (num_center === target) {
    //         result = left_count + i_center;
    //         return;
    //     }

    //     if (arr.length === 1) {
    //         result = num_center > target ? left_count : left_count + 1;

    //         return;
    //     }

    //     if (num_center > target) {
    //         get(arr.slice(0, i_center));
    //     } else {
    //         left_count += i_center;
    //         get(arr.slice(i_center));
    //     }
    // };

    // get(nums);

    // return result;
};
