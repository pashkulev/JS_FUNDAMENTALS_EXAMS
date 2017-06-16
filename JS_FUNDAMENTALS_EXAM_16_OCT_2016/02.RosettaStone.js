function decodeMessage(input) {
    let n = Number(input[0]);

    let templateMatrix = [];
    parseMatrix(templateMatrix, input, 1, n + 1);

    let encodedMessage = [];
    parseMatrix(encodedMessage, input, n + 1, input.length);

    decodeMatrix(templateMatrix, encodedMessage);
    console.log(translateMessage(encodedMessage));

    function decodeMatrix(templateMatrix, messageMatrix) {
        for (let rowIndex = 0; rowIndex < messageMatrix.length; rowIndex += templateMatrix.length) {

            for (let colIndex = 0; colIndex < messageMatrix.length; colIndex += templateMatrix[0].length) {
                let templateMatrixRow = 0;

                for (let i = rowIndex; i < rowIndex + templateMatrix.length && i < messageMatrix.length; i++) {
                    let templateMatrixCol = 0;
                    for (let j = colIndex; j < colIndex + templateMatrix[templateMatrixRow].length && j < messageMatrix[i].length; j++) {
                        messageMatrix[i][j] += templateMatrix[templateMatrixRow][templateMatrixCol];
                        templateMatrixCol++
                    }

                    templateMatrixRow++;
                }
            }
        }
    }

    function translateMessage(matrix) {
        let alphabet = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        let message = "";
        for (let row of matrix) {
            for (let col of row) {
                let charValue = col % 27;
                message += alphabet[charValue];
            }
        }

        return message;
    }

    function parseMatrix(matrix, inputArray, startIndex, endIndex) {
        for (let i = startIndex; i < endIndex; i++) {
            matrix.push(strToNumArray(inputArray[i]));
        }
    }

    function strToNumArray(strRow) {
        return strRow.split(" ").map(Number);
    }
}

// decodeMessage(['1',
//     '1 3 13',
//     '12 22 14 13 25 0 4 24 23',
//     '18 24 2 25 22 0 0 11 18',
//     '8 25 6 26 8 23 13 4 14',
//     '14 3 14 10 6 1 6 16 14',
//     '11 12 2 10 24 2 13 24 0',
//     '24 24 10 14 15 25 18 24 12',
//     '4 24 0 8 4 22 19 22 14',
//     '0 11 18 26 1 19 18 13 15',
//     '8 15 14 26 24 14 26 24 14']
// );

decodeMessage(['3', '45 76', '12 10', '21 7', '13', '4']);