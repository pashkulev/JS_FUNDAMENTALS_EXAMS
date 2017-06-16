function xRemove(textLines) {
    let textMatrix = textLines.map(e => Array.from(e));
    let xCoordinates = [];
    for (let row = 1; row < textMatrix.length - 1; row++) {
        for (let col = 1; col < textMatrix[row].length; col++) {
            if (isCenterOfX(row, col)) {
                xCoordinates.push({row: row, col: col});
            }
        }
    }

    for (let xCoordinate of xCoordinates) {
        let row = xCoordinate.row;
        let col = xCoordinate.col;

        textMatrix[row - 1][col - 1] = '';
        textMatrix[row - 1][col + 1] = '';
        textMatrix[row][col] = '';
        textMatrix[row + 1][col - 1] = '';
        textMatrix[row + 1][col + 1] = '';
    }

    textMatrix = textMatrix.map(row => row.filter(e => e !== ''));
    textMatrix.forEach(row => console.log(row.join('')));

    function isCenterOfX(row, col) {
        let symbol = textMatrix[row][col].toLowerCase();
        if (symbol === ' ') {
            return false;
        }

        let upperLeftSymbol = textMatrix[row - 1][col -1];
        upperLeftSymbol = upperLeftSymbol === undefined ? undefined : upperLeftSymbol.toLowerCase();
        let upperRightSymbol = textMatrix[row - 1][col + 1];
        upperRightSymbol = upperRightSymbol === undefined ? undefined : upperRightSymbol.toLowerCase();
        let lowerLeftSymbol = textMatrix[row + 1][col - 1];
        lowerLeftSymbol = lowerLeftSymbol === undefined ? undefined : lowerLeftSymbol.toLowerCase();
        let lowerRightSymbol = textMatrix[row + 1][col + 1];
        lowerRightSymbol = lowerRightSymbol === undefined ? undefined : lowerRightSymbol.toLowerCase();

        if (upperRightSymbol === symbol && upperLeftSymbol === symbol &&
            lowerLeftSymbol === symbol && lowerRightSymbol === symbol) {
            return true;
        }

        return false;
    }
}

xRemove([
    'abnbjs',
    'xoBab',
    'Abmbh',
    'aabab',
    'ababvvvv'
]);

// xRemove([
//     '8888888',
//     '08*8*80',
//     '808*888',
//     '0**8*8?'
// ]);

// xRemove([
//     '^u^',
//     'j^l^a',
//     '^w^WoWl',
//     'adw1w6',
//     '(WdWoWgPoop)'
// ]);

// xRemove([
//     'puoUdai',
//     'miU',
//     'ausupirina',
//     '8n8i8',
//     'm8o8a',
//     '8l8o860',
//     'M8i8',
//     '8e8!8?!'
// ]);