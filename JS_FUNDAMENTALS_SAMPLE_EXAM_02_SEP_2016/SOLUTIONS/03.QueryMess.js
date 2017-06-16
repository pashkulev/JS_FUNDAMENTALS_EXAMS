function queryMess(queryStings) {

    for (let queryString of queryStings) {
        let fieldMap = new Map();
        queryString = queryString.replace(/\+|%20/g, ' ').replace(/\s+/g, ' ').trim();
        let pairs = queryString.split(/&|\?/);

        for (let pair of pairs) {
            let pairTokens = pair.split('=').map(e => e.trim());
            if (pairTokens.length === 1) {
                continue;
            }

            let field = pairTokens[0];
            let value = pairTokens[1];

            if (!fieldMap.has(field)) {
                fieldMap.set(field, []);
            }

            fieldMap.get(field).push(value);
        }

        let output = '';
        for (let [field, value] of fieldMap.entries()) {
            output += `${field}=[${value.join(', ')}]`;
        }

        console.log(output);
    }
}

queryMess(['login=student&password=student']);

// queryMess([
//     'field=value1&field=value2&field=value3',
//     'http://example.com/over/there?name=ferret'
// ]);

// queryMess([
//     'foo=%20foo&value=+val&foo+=5+%20+203',
//     'foo=poo%20&value=valley&dog=wow+',
//     'url=https://softuni.bg/trainings/coursesinstances/details/1070',
//     'https://softuni.bg/trainings.asp?trainer=nakov&course=oop&course=php'
// ]);

