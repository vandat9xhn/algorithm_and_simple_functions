window.searchRange = function (nums = [1, 2], target = 7) {
    const get = (_target, arr = nums) => {
        let result = 0;
        let count = arr.length;

        while (result < count) {
            const i_center = Math.floor((count + result) / 2);

            if (_target > arr[i_center]) {
                result = i_center + 1;
            } else {
                count = i_center;
            }
        }

        return result;
    };

    const left = get(target - 0.5);

    if (nums[left] !== target) {
        return [-1, -1];
    }

    let right = left - 1;

    while (nums[right] === target) {
        right += 1;
    }

    return [left, right];
};
