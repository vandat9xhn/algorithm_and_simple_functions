const initial_s = 'deeedbbcccbdaa';
const initial_k = 3;

window.removeDuplicates = function (s = initial_s, k = initial_k) {
    const arr = [''];

    const handle = (i) => {
        const letter = s[i];
        const j = arr.length - 1;
        // console.log(arr, arr.length - 1);

        if (arr[j][0] !== letter || arr.length == 0) {
            arr.push(letter);

            return;
        }

        arr[j] += letter;
        if (arr[j].length === k) {
            arr.pop();

            return;
        }
    };

    for (let i = 0; i <= s.length - 1; i++) {
        handle(i);
    }

    console.log(arr.join(''));
    return arr.join('');
};
