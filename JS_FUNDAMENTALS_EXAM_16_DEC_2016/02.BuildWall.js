function buildWall(array) {
    const wallHeight = 30;
    const concretePerDay = 195;
    const concretePrice = 1900;

    let sections = array.map(Number);
    let dailyConcreteValues = [];

    while (true) {
        let dailyConcrete = 0;
        let isFinished = true;

        for (let i = 0; i < sections.length; i++) {
            if (sections[i] < wallHeight) {
                sections[i] +=  1;
                dailyConcrete += concretePerDay;
                isFinished = false;
            }
        }

        if (isFinished) {
            break;
        }

        dailyConcreteValues.push(dailyConcrete);
    }

    let finalCost = dailyConcreteValues.reduce((a, b) => a + b) * concretePrice;

    console.log(dailyConcreteValues.join(', '));
    console.log(finalCost + " pesos");
}

buildWall([17, 22, 17, 19, 17]);