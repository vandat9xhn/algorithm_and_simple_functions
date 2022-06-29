window.badVersion = (isBadVersion) =>
    function (n = 10) {
        let left_count = 0;
        let result = -1;

        const get = (k = 10) => {
            const i_center = Math.floor(k / 2);

            if (i_center === 0) {
                result = left_count + 1;
                return;
            }

            if (isBadVersion(left_count + i_center)) {
                get(i_center);
            } else {
                left_count += i_center;
                get(k - i_center);
            }
        };

        get(n);

        return result;
    };
