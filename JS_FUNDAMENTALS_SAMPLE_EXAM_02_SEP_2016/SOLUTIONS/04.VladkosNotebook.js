function collectNotebookData(sheets) {
    let colorMap = new Map();
    for (let sheet of sheets) {
        let sheetTokens = sheet.split('|');
        let color = sheetTokens[0];
        if (!colorMap.has(color)) {
            colorMap.set(color, {wins: 0, losses: 0, age: '', name: "", opponents: []})
        }

        switch (sheetTokens[1]) {
            case 'name': colorMap.get(color)['name'] = sheetTokens[2]; break;
            case 'age': colorMap.get(color)['age'] = sheetTokens[2]; break;
            case 'win':
                colorMap.get(color).wins++;
                colorMap.get(color).opponents.push(sheetTokens[2]);
                break;
            case 'loss':
                colorMap.get(color).losses++;
                colorMap.get(color).opponents.push(sheetTokens[2]);
                break;
        }
    }

    let output = '{';
    for (let [color, value] of colorMap) {
        if (value.name === '' || value.age === '') {
            continue;
        }

        value.rank = ((value.wins + 1) / (value.losses + 1)).toFixed(2);
        value.opponents.sort((o1, o2) => o1.localeCompare(o2));

        delete value.wins;
        delete value.losses;

        output += `"${color}":${JSON.stringify(value)},`;
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