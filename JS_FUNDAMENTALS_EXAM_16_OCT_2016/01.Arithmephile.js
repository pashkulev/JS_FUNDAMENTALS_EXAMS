function solve(array) {
    array = array.map(Number);
    let currentBestProduct = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < array.length; i++) {
        let currentNumber = array[i];
        if (currentNumber >= 0 && currentNumber < 10) {
            let currentProduct = 1;
            for (let j = i + 1; j <= i + currentNumber; j++) {
                currentProduct *= array[j];
            }

            if (currentProduct > currentBestProduct) {
                currentBestProduct = currentProduct;
            }
        }
    }

    console.log(currentBestProduct);
}

solve([18, 42, 19, 36, 1, -297, 38, 100, 9, -249, -170, -18, -208, -11, -87, -90, -286, -27]);


