window.NSum = function (nums = [2, 2, 2, 2, 2, 2], target = 8, n = 4) {
  if (nums.length < n) {
    return [];
  }

  const result = new Set();

  nums.sort((a, b) => a - b);
  const min = nums[0] >= 0 ? 0 : -nums[0];
  const _target = target + min * n;

  let same = 0;
  let _nums = [];
  // const _nums = nums.map((num) => num + min);
  for (const num of nums) {
    if (num !== _nums.slice(-1)[0]) {
      same = 0;
    } else {
      same += 1;
    }

    if (same < n) {
      _nums.push(num + min);
    }
  }

  const handleLoop = ({ arr = [1], k = 0, new_target = 0, item = [] }) => {
    if (k === 1) {
      if (arr.includes(new_target)) {
        item.push(new_target);
        const new_str = item.map((num) => num - min).join(',');
        result.add(new_str);
      }

      return;
    }

    if (arr.length === 0) {
      return;
    }

    const l_i = arr.length - 1;
    const _new_target = new_target - arr[l_i];

    if (_new_target / (k / 2) > arr[l_i] + arr[l_i - 1]) {
      return;
    }

    if (_new_target < 0) {
      return;
    }
    let max_i = arr.findIndex((num) => num > _new_target);

    if (max_i === -1) {
      max_i = arr.length - 1;
    }

    const new_k = k - 1;

    for (let i = k - 1; i <= max_i; i++) {
      const new_arr = arr.slice(0, i);
      const new_item = [...item];
      new_item.push(arr[l_i]);

      handleLoop({
        arr: new_arr,
        k: new_k,
        new_target: _new_target,
        item: new_item,
      });
    }
  };

  for (let x = n; x <= _nums.length; x++) {
    handleLoop({
      arr: _nums.slice(0, x),
      k: n,
      new_target: _target,
      item: [],
    });
  }

  const _result = [];
  result.forEach((item) => {
    _result.push(item.split(',').map((str) => parseInt(str)));
  });

  return _result;
};

// tach arr am, arr duong va sort
//
