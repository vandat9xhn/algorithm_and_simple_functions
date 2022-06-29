window.searchRotated = function (nums = [4, 5, 6, 7, 0, 1, 2], target = 0) {
    //
    if (nums.length <= 4) {
        return nums.indexOf(target);
    }

    //
    let i = (function () {
        let count = nums.length;
        let _result = 0;
        const first = nums[0];

        while (_result < count) {
            const i_center = Math.floor((count + _result) / 2);

            if (nums[i_center] < first) {
                count = i_center;
            } else {
                _result = i_center + 1;
                if (nums[_result] < first) {
                    break;
                }
            }
        }

        return _result;
    })();

    //
    let _nums = [];
    let left_count = 0;

    if (target >= nums[0]) {
        _nums = nums.slice(0, i);
    } else {
        _nums = nums.slice(i);
        left_count = nums.length - _nums.length;
    }

    //
    let count = _nums.length;
    let result = 0;

    while (result < count) {
        const i_center = Math.floor((count + result) / 2);

        if (target < _nums[i_center]) {
            count = i_center;
            continue;
        }

        if (target === _nums[i_center]) {
            result = i_center;
            break;
        }

        result = i_center + 1;
    }

    //
    result += left_count;

    if (nums[result] !== target) {
        return -1;
    }

    //
    return result;
};
