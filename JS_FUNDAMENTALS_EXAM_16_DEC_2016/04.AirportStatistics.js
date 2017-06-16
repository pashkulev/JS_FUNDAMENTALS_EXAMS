function airportStatistics(input) {
    let landedAirplanes = new Set();
    let airPorts = new Map();

    for (let flightData of input) {
        let [planeID, town, passengersCount, action] = flightData.split(' ');

        if ((flightData.trim() === '') ||
            (action === "land" && landedAirplanes.has(planeID)) ||
            (action === "depart" && !landedAirplanes.has(planeID))) {
            continue;
        }

        if (!airPorts.has(town)) {
            airPorts.set(town, {arrivals: 0, departures: 0, planes: new Set()});
        }

        if (action === "land") {
            airPorts.get(town).arrivals += Number(passengersCount);
            landedAirplanes.add(planeID);
        } else {
            airPorts.get(town).departures += Number(passengersCount);
            landedAirplanes.delete(planeID);
        }

        airPorts.get(town).planes.add(planeID);
    }

    console.log("Planes left:");
    let sortedLeftPlanes = [...landedAirplanes.keys()].sort((a,b) => a.localeCompare(b));
    for (let plane of sortedLeftPlanes) {
        console.log('- ' + plane);
    }

    let sortedTowns = [...airPorts.entries()].sort(sortTowns);
    for (let [town, stats] of sortedTowns) {
        console.log(town);
        console.log('Arrivals: ' + stats.arrivals);
        console.log('Departures: ' + stats.departures);
        console.log('Planes:');
        let sortedPlanes = [...stats.planes].sort((a,b) => a.localeCompare(b));
        sortedPlanes.forEach(p => console.log('-- ' + p));
    }

    function sortTowns(a, b) {
        let arrivalsA = a[1].arrivals;
        let arrivalsB = b[1].arrivals;

        let result = arrivalsB - arrivalsA;
        if (result === 0) {
            result = a[0].localeCompare(b[0]);
        }

        return result;
    }
}

// airportStatistics(
//     [
//         "Boeing474 Madrid 300 land",
//         "",
//         "AirForceOne WashingtonDC 178 land",
//         "Airbus London 265 depart",
//         "ATR72 WashingtonDC 272 land",
//         "ATR72 Madrid 135 depart",
//         "ATR72 Madrid 135 land"
//     ]
// );

// airportStatistics([
//     "Airbus Paris 356 land",
//     "Airbus London 321 land",
//     "Airbus Paris 213 depart",
//     "Airbus Ljubljana 250 land"
// ]);

airportStatistics([
    'RTA72 London -10 land',
    'RTA#72 Brussels -110 depart',
    'RTA7!2 Warshaw 350 land',
    'RTA72 Riga -201 depart',
    'rta72 riga -13 land',
    'rta Riga -200 depart',
    ''
]);