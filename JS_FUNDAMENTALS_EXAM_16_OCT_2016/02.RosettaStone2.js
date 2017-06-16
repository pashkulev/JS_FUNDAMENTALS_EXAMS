function decodeMessage(input) {
    let n = Number(input.shift());
    let templateMatrix = parseMatrix(input, n);
    let encodedMessage = parseMatrix(input, input.length);

    let result = '';
    for (let row = 0; row < encodedMessage.length; row++) {
        for (let col = 0; col < encodedMessage[row].length; col++) {
            let currentValue = encodedMessage[row][col];
            let modifier = templateMatrix[row % templateMatrix.length][col % templateMatrix[0].length];
            result += String.fromCharCode(((currentValue + modifier) % 27) + 64);
        }
    }

    console.log(result.replace(/@/g, ' '));

    function parseMatrix(input, length) {
        let matrix = [];
        for (let i = 0; i < length; i++) {
            matrix.push(input.shift().split(' ').map(Number));
        }

        return matrix;
    }
}

decodeMessage([ '2',
    '59 36',
    '82 52',
    '4 18 25 19 8',
    '4 2 8 2 18',
    '23 14 22 0 22',
    '2 17 13 19 20',
    '0 9 0 22 22' ]
);