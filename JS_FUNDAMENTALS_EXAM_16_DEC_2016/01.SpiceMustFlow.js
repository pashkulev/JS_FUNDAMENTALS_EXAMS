function getTotalAmount(array) {
    let yield = Number(array[0]);
    let workingDays = 0;
    let spiceAmount = 0;
    const miningCrewConsumption = 26;

    while (yield >= 100) {
        spiceAmount += yield;
        spiceAmount -= miningCrewConsumption;
        workingDays++;
        yield -= 10;
    }

    spiceAmount -= miningCrewConsumption;
    spiceAmount = spiceAmount < 0 ? 0 : spiceAmount;

    console.log(workingDays);
    console.log(spiceAmount);
}

getTotalAmount(['200']);