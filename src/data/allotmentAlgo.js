// Function to fully allocate rooms to teams based on available hostels and gender
const fullAllotment = (teams, hostels, gender) => {
    // Iterate through each team
    for (let team of teams) {
        // Skip teams that are already allotted
        if (team.Allotted) continue;

        // Iterate through each hostel
        for (let hostel of hostels) {
            // Check if the hostel has enough vacancy for the team's gender
            if (hostel.Vacancy >= team[gender]) {
                // Assign the team to the hostel
                team.Rooms.push({
                    "Hostel Name": hostel["Hostel Name"],
                    'Room Number': hostel['Room Number'],
                    Members: team[gender],
                });
                // Mark the team as allotted
                team.Allotted = true;
                // Decrease the hostel's vacancy
                hostel.Vacancy -= team[gender];
                // Add the team to the hostel's list of teams
                hostel.Teams.push({
                    'Group ID': team['Group ID'],
                    Members: team[gender],
                });
                // Move to the next team
                break;
            }
        }
    }
};

// Function to partially allocate rooms to teams when full allocation isn't possible
const partialAllotment = (teams, hostels, gender) => {
    // Iterate through each team
    for (let team of teams) {
        // Skip teams that are already fully allotted
        if (team.Allotted && team.Allotted !== 0) continue;

        // Iterate through each hostel
        for (let hostel of hostels) {
            // Check if the hostel has some vacancy and the team is partially allotted
            if (hostel.Vacancy > 0 && typeof team.Allotted === "number") {
                // Calculate the number of members to allot
                const membersToAllot = Math.min(hostel.Vacancy, team[gender] - team.Allotted);
                // Assign the calculated number of members to the hostel
                team.Rooms.push({
                    "Hostel Name": hostel["Hostel Name"],
                    'Room Number': hostel['Room Number'],
                    Members: membersToAllot,
                });
                // Update the number of allotted members
                team.Allotted += membersToAllot;
                // Decrease the hostel's vacancy
                hostel.Vacancy -= membersToAllot;
                // Add the team to the hostel's list of teams
                hostel.Teams.push({
                    'Group ID': team['Group ID'],
                    Members: membersToAllot,
                });
                // Mark the team as fully allotted if all members are allocated
                if (team.Allotted === team[gender]) {
                    team.Allotted = true;
                    break;
                }
            }
        }
    }
};

// Function to allocate remaining rooms to teams when there are unallocated members
const allocateRemaining = (teams, hostels, gender) => {
    // Filter teams that are not fully allotted
    let remainingTeams = teams.filter(team => !team.Allotted || typeof team.Allotted === "number");
    // Calculate the total number of remaining members across all teams
    let totalRemaining = remainingTeams.reduce((sum, team) => sum + team[gender] - (typeof(team.Allotted) === "number" ? team.Allotted : 0), 0);

    // If there are remaining members to allocate
    if (totalRemaining > 0) {
        // Find a suitable hostel that can accommodate the remaining members
        let suitableHostel = hostels
            .filter(hostel => hostel.Vacancy >= totalRemaining) // Hostels with enough vacancy
            .sort((a, b) => a.Vacancy - b.Vacancy)[0]; // Sort by least vacancy first

        // If no suitable hostel, find the one with some vacancy
        if (!suitableHostel) {
            suitableHostel = hostels
                .filter(hostel => hostel.Vacancy > 0) // Hostels with some vacancy
                .sort((a, b) => a.Vacancy - b.Vacancy)[0]; // Sort by least vacancy first
        }

        // Allocate remaining members to the suitable hostel
        if (suitableHostel) {
            remainingTeams.forEach(team => {
                if (typeof team.Allotted === "number") {
                    const remainingMembers = team[gender] - team.Allotted;
                    if (remainingMembers > 0) {
                        team.Rooms.push({
                            "Hostel Name": suitableHostel["Hostel Name"],
                            'Room Number': suitableHostel['Room Number'],
                            Members: remainingMembers,
                        });
                        team.Allotted = true;
                        suitableHostel.Vacancy -= remainingMembers;
                        suitableHostel.Teams.push({
                            'Group ID': team['Group ID'],
                            Members: remainingMembers,
                        });
                    }
                }
            });
        }
    }
};

// Function to check if there is any hostel with vacancy
const hasVacancy = (hostels) => {
    return hostels.some(hostel => hostel.Vacancy > 0);
};

// Main function to allocate rooms to teams
const allotRooms = (teams, hostels, gender) => {
    let allHostels = [...hostels]; // Create a copy of hostels array
    let allTeams = [...teams]; // Create a copy of teams array
    let changed = true; // Flag to check if allocation changed

    // Loop while there are vacant hostels and teams that need allotment
    while (hasVacancy(allHostels) && allTeams.some(team => !team.Allotted || typeof team.Allotted === "number") && changed) {
        changed = false; // Reset flag
        fullAllotment(allTeams, allHostels, gender); // Perform full allotment
        allHostels.sort((a, b) => b.Vacancy - a.Vacancy); // Sort hostels by most vacancy
        partialAllotment(allTeams, allHostels, gender); // Perform partial allotment
        allHostels.sort((a, b) => b.Vacancy - a.Vacancy); // Sort hostels by most vacancy again

        // Check if any team is still partially allotted
        if (allTeams.some(team => team.Allotted !== true && typeof team.Allotted === "number")) {
            changed = true; // Set flag to true if changes occurred
        }
    }
    allHostels.sort((a, b) => a.Vacancy - b.Vacancy); // Final sort by least vacancy
    allocateRemaining(allTeams, allHostels, gender); // Allocate remaining members

    return { allTeams, allHostels }; // Return the updated teams and hostels
};

export { allotRooms }; // Export the function for use in other modules
