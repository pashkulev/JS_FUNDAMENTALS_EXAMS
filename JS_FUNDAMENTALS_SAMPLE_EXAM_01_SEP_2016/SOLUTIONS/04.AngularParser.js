function angularParser(input) {
    let appRegex = /^\$app='([^']+)'$/;
    let elementRegex = /^\$(controller|model|view)='([^']+)'&app='([^']+)'$/;

    let modules = new Map();
    let nonExistingModules = new Map();

    for (let row of input) {
        let appMatch = appRegex.exec(row);
        if (appMatch) {
            let appName = appMatch[1];
            if (!modules.has(appName)) {
                modules.set(appName, {controllers: [], models: [], views: []});
            }

            if (nonExistingModules.has(appName)) {
                modules.set(appName, nonExistingModules.get(appName));
                nonExistingModules.delete(appName);
            }
            continue;
        }

        let elementMatch = elementRegex.exec(row);
        if (elementMatch) {
            let elementType = elementMatch[1];
            let elementName = elementMatch[2];
            let appName = elementMatch[3];

            if (modules.has(appName)) {
                placeElement(modules, appName, elementType, elementName);
            } else {
                if (!nonExistingModules.has(appName)) {
                    nonExistingModules.set(appName, {controllers: [], models: [], views: []});
                }

                placeElement(nonExistingModules, appName, elementType, elementName);
            }
        }
    }

    let sortedModules = [...modules.entries()].sort(sortModules);
    let output = '{';
    for (let [module, value] of sortedModules) {
        value.controllers.sort(sortAlphabetically);
        value.models.sort(sortAlphabetically);
        value.views.sort(sortAlphabetically);

        output += `"${module}":${JSON.stringify(value)},`;
    }
    output = output.slice(0, output.length - 1) + '}';
    console.log(output);

    function sortAlphabetically(a, b) {
        return a.localeCompare(b);
    }

    function sortModules(a, b) {
        let controllersCountA = a[1].controllers.length;
        let controllersCountB = b[1].controllers.length;

        let result = controllersCountB - controllersCountA;
        if (result === 0) {
            let modelsCountA = a[1].models.length;
            let modelsCountB = b[1].models.length;
            result = modelsCountA - modelsCountB;
        }

        return result;
    }

    function placeElement(modules, appName, elementType, elementName) {
        switch (elementType) {
            case 'controller':
                if (!modules.get(appName).controllers.includes(elementName)) {
                    modules.get(appName).controllers.push(elementName);
                }
                break;
            case 'model':
                if (!modules.get(appName).models.includes(elementName)) {
                    modules.get(appName).models.push(elementName);
                }
                break;
            case 'view':
                if (!modules.get(appName).views.includes(elementName)) {
                    modules.get(appName).views.push(elementName);
                }
                break;
        }
    }
}

// angularParser([
//     "$app='MyApp'",
//     "$controller='My Controller'&app='MyApp'",
//     "$model='My Model'&app='MyApp'",
//     "$view='My View'&app='MyApp'"
// ]);

angularParser([
    "$controller='PHPController'&app='Language Parser'",
    "$controller='JavaController'&app='Language Parser'",
    "$controller='C#Controller'&app='Language Parser'",
    "$controller='C++Controller'&app='Language Parser'",
    "$app='Garbage Collector'",
    "$controller='GarbageController'&app='Garbage Collector'",
    "$controller='SpamController'&app='Garbage Collector'",
    "$app='Language Parser'"
]);