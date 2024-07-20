import { allotRooms } from "./allotmentAlgo";
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

const convertRoomsData = (allotment) =>  {
    let totalBoys = 0;
    let totalBoysHostelCapacity = 0;
    let totalGirls = 0;
    let totalGirlsHostelCapacity = 0;

    // Calculate total boys and boys hostel capacity
    if (allotment.boysAllottment) {
        const boysTeams = allotment.boysAllottment.allTeams;
        const boysHostels = allotment.boysAllottment.allHostels;

        totalBoys = boysTeams.reduce((sum, team) => sum + Number(team.Boys), 0);
        totalBoysHostelCapacity = boysHostels.reduce((sum, hostel) => sum + hostel.Capacity, 0);
    }

    // Calculate total girls and girls hostel capacity
    if (allotment.girlsAllottment) {
        const girlsTeams = allotment.girlsAllottment.allTeams;
        const girlsHostels = allotment.girlsAllottment.allHostels;

        totalGirls = girlsTeams.reduce((sum, team) => sum + Number(team.Girls), 0);
        totalGirlsHostelCapacity = girlsHostels.reduce((sum, hostel) => sum + hostel.Capacity, 0);
    }

    return {
        totalBoys,
        totalBoysHostelCapacity,
        totalGirls,
        totalGirlsHostelCapacity
    };
};

const convertTeamsData = (allotment) => {

    function extractData(allotment) {
        const teams = allotment.allTeams;
        const hostels = allotment.allHostels;
    
        return teams.filter(team => typeof team.Allotted === 'number' && team.Allotted !== true)
                    .map(team => {
                        const totalBoysOfTeamInHostel = hostels.reduce((sum, hostel) => {
                            const teamInHostel = hostel.Teams.find(t => t["Group ID"] === team["Group ID"]);
                            return sum + (teamInHostel ? teamInHostel.Members : 0);
                        }, 0);
    
                        return {
                            groupID: team["Group ID"],
                            totalMembers: team["Total Members"],
                            boys: team.Boys || 0,
                            girls: team.Girls || 0, // Same calculation as for boys; adjust if needed
                            allotted: team.Allotted
                        };
                    });
    }
    
    const boysData = extractData(allotment.boysAllottment);
    const girlsData = extractData(allotment.girlsAllottment);

return {boysData, girlsData}
}

export {convertHostelData, 
    convertVisitorsData, 
    convertRoomsData,
    convertTeamsData}

