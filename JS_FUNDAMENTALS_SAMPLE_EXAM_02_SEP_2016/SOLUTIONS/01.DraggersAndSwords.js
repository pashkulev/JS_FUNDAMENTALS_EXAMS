function classifyBlades(lengths) {
    lengths = lengths.map(Number);
    let html = '<table border="1">\n' +
        '<thead>\n' +
        '<tr><th colspan="3">Blades</th></tr>\n' +
        '<tr><th>Length [cm]</th><th>Type</th><th>Application</th></tr>\n' +
        '</thead>\n' +
        '<tbody>\n';

    for (let length of lengths) {
        if (length <= 10) {
            continue;
        }

        let type = length > 40 ? "sword" : "dagger";
        length = Math.floor(length);
        let modulusLength = length % 5;
        let application = getApplication(modulusLength);

        html += `<tr><td>${length}</td><td>${type}</td><td>${application}</td></tr>\n`;
    }

    html += '</tbody>\n</table>';
    console.log(html);
    
    function getApplication(length) {
        switch (length) {
            case 0: return '*rap-poker';
            case 1: return 'blade';
            case 2: return 'quite a blade';
            case 3: return 'pants-scraper';
            case 4: return 'frog-butcher';
        }
    }
}

classifyBlades([
    '17.8',
    '19.4',
    '13',
    '55.8',
    '126.96541651',
    '3'
]);