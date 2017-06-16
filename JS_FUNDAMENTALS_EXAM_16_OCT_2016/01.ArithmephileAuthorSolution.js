function solve(input) {
    let max = -Infinity;
    while (input.length > 0) {
        let count = Number(input.shift());
        if (count >= 10 || count < 0) continue;
        let product = 1;
        for (let i = 0; i < count; i++) {
            product *= Number(input[i]);
        }
        if (product > max) {
            max = product;
        }
    }

    console.log(max);
}

solve([18, 42, 19, 36, 1, -297, 38, 100, 9, -249, -170, -18, -208, -11, -87, -90, -286, -27]);