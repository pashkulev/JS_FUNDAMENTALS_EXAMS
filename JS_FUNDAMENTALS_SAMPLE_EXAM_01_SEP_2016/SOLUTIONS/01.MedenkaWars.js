function medenkaWars(arr) {
    const medenkaDamage = 60;

    let naskorDamage = 0;
    let vitkorDamage = 0;

    let vitkorConsecutiveAttacks = 0;
    let naskorConsecutiveAttacks = 0;

    let lastAttack;
    let lastDamage;

    for (let inputLine of arr) {
        let attackTokens = inputLine.split(' ');
        let amountOfMedenkas = Number(attackTokens[0]);
        let attack = attackTokens[1];

        if (attack === 'white') {
            if (attack === lastAttack && lastDamage === amountOfMedenkas) {
                vitkorConsecutiveAttacks++;
            } else {
                vitkorConsecutiveAttacks = 1;
            }

            if (vitkorConsecutiveAttacks === 5) {
                naskorDamage += amountOfMedenkas * medenkaDamage * 4.5;
                vitkorConsecutiveAttacks = 0;
            } else {
                naskorDamage += amountOfMedenkas * medenkaDamage;
            }

            lastAttack = attack;
            lastDamage = amountOfMedenkas;
            naskorConsecutiveAttacks = 0;
        } else {
            if (attack === lastAttack && lastDamage === amountOfMedenkas) {
                naskorConsecutiveAttacks++;
            } else {
                naskorConsecutiveAttacks = 1;
            }

            if (naskorConsecutiveAttacks === 2) {
                vitkorDamage += amountOfMedenkas * medenkaDamage * 2.75;
                naskorConsecutiveAttacks = 0;
            } else {
                vitkorDamage += amountOfMedenkas * medenkaDamage;
            }

            lastAttack = attack;
            lastDamage = amountOfMedenkas;
            vitkorConsecutiveAttacks = 0;
        }
    }

    if (vitkorDamage < naskorDamage) {
        console.log("Winner - Vitkor");
        console.log("Damage - " + naskorDamage);
    } else {
        console.log("Winner - Naskor");
        console.log("Damage - " + vitkorDamage);
    }
}

medenkaWars([
    '2 dark medenkas',
    '1 white medenkas',
    '2 dark medenkas',
    '2 dark medenkas',
    '15 white medenkas',
    '2 dark medenkas',
    '2 dark medenkas'
]);