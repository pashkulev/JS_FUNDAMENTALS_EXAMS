function collectNotebookData(sheets) {
    let colorMap = new Map();
    for (let sheet of sheets) {
        let sheetTokens = sheet.split('|');
        let color = sheetTokens[0];
        if (!colorMap.has(color)) {
            colorMap.set(color, {wins: 0, losses: 0})
        }

        switch (sheetTokens[1]) {
            case 'name': colorMap.get(color)['name'] = sheetTokens[2]; break;
            case 'age': colorMap.get(color)['age'] = sheetTokens[2]; break;
            case 'win':
                colorMap.get(color).wins++;
                if (!colorMap.get(color).hasOwnProperty('opponents')) {
                    colorMap.get(color).opponents = [];
                }
                colorMap.get(color).opponents.push(sheetTokens[2]);
                break;
            case 'loss':
                colorMap.get(color).losses++;
                if (!colorMap.get(color).hasOwnProperty('opponents')) {
                    colorMap.get(color).opponents = [];
                }
                colorMap.get(color).opponents.push(sheetTokens[2]);
                break;
        }
    }

    let output = '{';
    for (let [color, value] of colorMap) {
        if (!value.hasOwnProperty('name') || !value.hasOwnProperty('age')) {
            continue;
        }

        value.rank = ((value.wins + 1) / (value.losses + 1)).toFixed(2);
        if (value.hasOwnProperty('opponents')) {
            value.opponents.sort((o1, o2) => o1.localeCompare(o2));
        } else {
            value.opponents = [];
        }

        delete value.wins;
        delete value.losses;

        output += `"${color}":{"age":"${value.age}","name":"${value.name}","opponents":${JSON.stringify(value.opponents)},"rank":"${value.rank}"},`;
    }

    output = output.slice(0, output.length - 1) + "}";
    console.log(output);
}

collectNotebookData([
    'purple|age|99',
    'red|age|44',
    'blue|win|pesho',
    'blue|win|mariya',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Yana',
    'purple|loss|Yana',
    'purple|loss|Manov',
    'purple|loss|Manov',
    'red|name|gosho',
    'blue|win|Vladko',
    'purple|loss|Yana',
    'purple|name|VladoKaramfilov',
    'blue|age|21',
    'blue|loss|Pesho'
]);