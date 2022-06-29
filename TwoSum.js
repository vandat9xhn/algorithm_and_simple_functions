const initial_nums = [1, 2, 3, 6, 4];
const initial_target = 6;

window.twoSum = function (nums = initial_nums, target = initial_target) {
    const set_nums = new Set(nums);

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const _num = target - num;

        if (set_nums.has(_num)) {
            const index_1 = nums.slice(i + 1).indexOf(_num);
            if (index_1 >= 0) {
                return [i, index_1];
            }
        }
    }
};
