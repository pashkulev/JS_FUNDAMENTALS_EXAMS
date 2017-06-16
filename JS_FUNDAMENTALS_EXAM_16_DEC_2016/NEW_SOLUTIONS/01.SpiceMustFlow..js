function calcCollectedSpice(input) {
    let currentYield = Number(input[0]);
    let workingDays = 0;
    let collectedSpice = 0;

    while (currentYield >= 100) {
        workingDays++;
        collectedSpice += currentYield - 26;
        currentYield -= 10;
    }

    collectedSpice = collectedSpice < 26 ? 0 : collectedSpice - 26;

    console.log(workingDays);
    console.log(collectedSpice);
}

calcCollectedSpice(['200']);