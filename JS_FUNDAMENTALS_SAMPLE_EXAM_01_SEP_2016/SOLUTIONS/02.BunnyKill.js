function bunnyKill(arr) {
    let matrix = [];
    let bombsCoordinates = new Set(arr.pop().split(' '));
    let invalidBombsCoordinates = new Set();
    for (let row of arr) {
        matrix.push(row.split(' ').map(Number));
    }

    let snowBallDamage = 0;
    let snowBallVictims = 0;

    for (let bombCoordinates of bombsCoordinates) {
        if (invalidBombsCoordinates.has(bombCoordinates)) {
            continue;
        }

        explode(bombCoordinates);
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] > 0) {
                snowBallVictims++;
                snowBallDamage += matrix[row][col];
            }
        }
    }

    console.log(snowBallDamage);
    console.log(snowBallVictims);

    function explode(bombCoordinates) {
        let [x, y] = bombCoordinates.split(',').map(Number);
        let currentDamage = matrix[x][y];
        snowBallDamage += currentDamage;
        snowBallVictims++;

        for (let row = x - 1; row <= x + 1; row++) {
            for (let col = y - 1; col <= y + 1; col++) {
                if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length) {
                    matrix[row][col] -= currentDamage;
                    let currentCoordinates = row + "," + col;
                    if (bombsCoordinates.has(currentCoordinates) &&
                        currentCoordinates !== bombCoordinates &&
                        matrix[row][col] <= 0)  {
                        invalidBombsCoordinates.add(currentCoordinates);
                    }
                }
            }
        }
    }
}

bunnyKill([
    '10 10 10',
    '10 10 10',
    '10 10 10',
    '0,0'
]);

bunnyKill([
    '5 10 15 20',
    '10 10 10 10',
    '10 15 10 10',
    '10 10 10 10',
    '2,2 0,1'
]);