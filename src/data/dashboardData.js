import { mergeHostelData } from "./rooomsData";

const convertHostelData = (allotment) => {
    const data = mergeHostelData(allotment)
    const result = [];

    for (const hostelName in data) {
        const hostel = data[hostelName];
        const totalCapacity = hostel.totalCapacity;
        const totalVacancy = hostel.totalVacancy;
        const totalOccupied = totalCapacity - totalVacancy;

        result.push({
            Hostels: hostelName,
            Occupied: totalOccupied,
            Vacant: totalVacancy
        });
    }

    return result;
};


const convertVisitorsData = (allotments) => {
    const boysTotalTeams = allotments.boysAllottment.allTeams.length;
    const boysTotalPeople = allotments.boysAllottment.allTeams.reduce((acc, team) => acc + (parseInt(team.Boys) || 0), 0);

    const girlsTotalTeams = allotments.girlsAllottment.allTeams.length;
    const girlsTotalPeople = allotments.girlsAllottment.allTeams.reduce((acc, team) => acc + (parseInt(team.Girls) || 0), 0);

const chartData = {
    teams: boysTotalTeams + girlsTotalTeams,
    people: [
        { browser: "Boys", visitors: boysTotalPeople, fill: "var(--color-chrome)" },
        { browser: "Girls", visitors: girlsTotalPeople, fill: "var(--color-safari)" }
    ]
}
    return chartData
}

export {convertHostelData, convertVisitorsData}

