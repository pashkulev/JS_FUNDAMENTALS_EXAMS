function buildWall(arr) {
    let sectionsHeights = arr.map(Number);
    let concreteUsage = [];
    let isFinished = false;

    while (!isFinished) {
        isFinished = true;
        let usedConcreteToday = 0;
        for (let i = 0; i < sectionsHeights.length; i++) {
            if (sectionsHeights[i] < 30) {
                sectionsHeights[i]++;
                usedConcreteToday += 195;
                isFinished = false;
            }
        }

        if (!isFinished) {
            concreteUsage.push(usedConcreteToday);
        }
    }

    let finalCost = concreteUsage.reduce((a,b) => a + b) * 1900;
    console.log(concreteUsage.join(", "));
    console.log(finalCost + ' pesos');
}

buildWall(['21', '25', '28']);