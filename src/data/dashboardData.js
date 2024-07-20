import { allotRooms } from "./allotmentAlgo"; // Import the allotRooms function for room allocation
import { mergeHostelData } from "./rooomsData"; // Import the mergeHostelData function to process hostel data

// Function to convert hostel data into a specific format
const convertHostelData = (allotment) => {
    const data = mergeHostelData(allotment); // Merge and retrieve the hostel data
    const result = []; // Initialize an empty array to store the results

    // Iterate through each hostel in the merged data
    for (const hostelName in data) {
        const hostel = data[hostelName]; // Retrieve hostel details by name
        const totalCapacity = hostel.totalCapacity; // Get total capacity of the hostel
        const totalVacancy = hostel.totalVacancy; // Get total vacancy of the hostel
        const totalOccupied = totalCapacity - totalVacancy; // Calculate total occupied rooms

        // Push formatted hostel data into the result array
        result.push({
            Hostels: hostelName, // Hostel name
            Occupied: totalOccupied, // Number of occupied rooms
            Vacant: totalVacancy // Number of vacant rooms
        });
    }

    return result; // Return the formatted result array
};

// Function to convert visitors data into a format suitable for charting
const convertVisitorsData = (allotments) => {
    // Calculate the total number of boys teams and people
    const boysTotalTeams = allotments.boysAllottment.allTeams.length;
    const boysTotalPeople = allotments.boysAllottment.allTeams.reduce((acc, team) => acc + (parseInt(team.Boys) || 0), 0);

    // Calculate the total number of girls teams and people
    const girlsTotalTeams = allotments.girlsAllottment.allTeams.length;
    const girlsTotalPeople = allotments.girlsAllottment.allTeams.reduce((acc, team) => acc + (parseInt(team.Girls) || 0), 0);

    // Format the chart data with teams and people counts
    const chartData = {
        teams: boysTotalTeams + girlsTotalTeams, // Total number of teams
        people: [
            { browser: "Boys", visitors: boysTotalPeople, fill: "var(--color-chrome)" }, // Data for boys
            { browser: "Girls", visitors: girlsTotalPeople, fill: "var(--color-safari)" } // Data for girls
        ]
    };

    return chartData; // Return the formatted chart data
};

// Function to convert room data into a format suitable for reporting
const convertRoomsData = (allotment) =>  {
    let totalBoys = 0; // Initialize total boys count
    let totalBoysHostelCapacity = 0; // Initialize total boys hostel capacity
    let totalGirls = 0; // Initialize total girls count
    let totalGirlsHostelCapacity = 0; // Initialize total girls hostel capacity

    // Calculate total boys and boys hostel capacity if data is available
    if (allotment.boysAllottment) {
        const boysTeams = allotment.boysAllottment.allTeams; // Retrieve boys teams
        const boysHostels = allotment.boysAllottment.allHostels; // Retrieve boys hostels

        // Sum up the total number of boys and the total boys hostel capacity
        totalBoys = boysTeams.reduce((sum, team) => sum + Number(team.Boys), 0);
        totalBoysHostelCapacity = boysHostels.reduce((sum, hostel) => sum + hostel.Capacity, 0);
    }

    // Calculate total girls and girls hostel capacity if data is available
    if (allotment.girlsAllottment) {
        const girlsTeams = allotment.girlsAllottment.allTeams; // Retrieve girls teams
        const girlsHostels = allotment.girlsAllottment.allHostels; // Retrieve girls hostels

        // Sum up the total number of girls and the total girls hostel capacity
        totalGirls = girlsTeams.reduce((sum, team) => sum + Number(team.Girls), 0);
        totalGirlsHostelCapacity = girlsHostels.reduce((sum, hostel) => sum + hostel.Capacity, 0);
    }

    // Return the aggregated room data
    return {
        totalBoys, // Total number of boys
        totalBoysHostelCapacity, // Total capacity of boys hostels
        totalGirls, // Total number of girls
        totalGirlsHostelCapacity // Total capacity of girls hostels
    };
};

// Function to convert team data into a format suitable for reporting
const convertTeamsData = (allotment) => {

    // Helper function to extract data from allotment
    function extractData(allotment) {
        const teams = allotment.allTeams; // Retrieve all teams
        const hostels = allotment.allHostels; // Retrieve all hostels

        // Map through teams to get data for teams that are partially allotted
        return teams.filter(team => typeof team.Allotted === 'number' && team.Allotted !== true)
                    .map(team => {
                        // Calculate the total number of boys in the hostel for each team
                        const totalBoysOfTeamInHostel = hostels.reduce((sum, hostel) => {
                            const teamInHostel = hostel.Teams.find(t => t["Group ID"] === team["Group ID"]);
                            return sum + (teamInHostel ? teamInHostel.Members : 0);
                        }, 0);

                        // Return formatted team data
                        return {
                            groupID: team["Group ID"], // Team group ID
                            totalMembers: team["Total Members"], // Total members in the team
                            boys: team.Boys || 0, // Number of boys
                            girls: team.Girls || 0, // Number of girls (same calculation as boys; adjust if needed)
                            allotted: team.Allotted // Allotted number of members
                        };
                    });
    }
    
    // Extract data for boys and girls separately
    const boysData = extractData(allotment.boysAllottment);
    const girlsData = extractData(allotment.girlsAllottment);

    // Return combined data for boys and girls
    return {boysData, girlsData};
}

export {convertHostelData, convertVisitorsData, convertRoomsData, convertTeamsData}; // Export all conversion functions
