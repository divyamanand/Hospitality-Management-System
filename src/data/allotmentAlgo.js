const fullAllotment = (teams, hostels, gender) => {
    for (let team of teams) {
        if (team.Allotted) continue;

        for (let hostel of hostels) {
            if (hostel.Vacancy >= team[gender]) {
                team.Rooms.push({
                    "Hostel Name": hostel["Hostel Name"],
                    'Room Number': hostel['Room Number'],
                    Members: team[gender],
                });
                team.Allotted = true;
                hostel.Vacancy -= team[gender];
                hostel.Teams.push({
                    'Group ID': team['Group ID'],
                    Members: team[gender],
                });
                break;
            }
        }
    }
};

const partialAllotment = (teams, hostels, gender) => {
    for (let team of teams) {
        if (team.Allotted && team.Allotted !== 0) continue;

        for (let hostel of hostels) {
            if (hostel.Vacancy > 0 && typeof team.Allotted === "number") {
                const membersToAllot = Math.min(hostel.Vacancy, team[gender] - team.Allotted);
                team.Rooms.push({
                    "Hostel Name": hostel["Hostel Name"],
                    'Room Number': hostel['Room Number'],
                    Members: membersToAllot,
                });
                team.Allotted += membersToAllot;
                hostel.Vacancy -= membersToAllot;
                hostel.Teams.push({
                    'Group ID': team['Group ID'],
                    Members: membersToAllot,
                });
                if (team.Allotted === team[gender]) {
                    team.Allotted = true;
                    break;
                }
            }
        }
    }
};

const allocateRemaining = (teams, hostels, gender) => {
    let remainingTeams = teams.filter(team => !team.Allotted || typeof team.Allotted === "number");
    let totalRemaining = remainingTeams.reduce((sum, team) => sum + team[gender] - (typeof(team.Allotted) === "number" ? team.Allotted : 0), 0);

    if (totalRemaining > 0) {
        let suitableHostel = hostels
            .filter(hostel => hostel.Vacancy >= totalRemaining)
            .sort((a, b) => a.Vacancy - b.Vacancy)[0];

        if (!suitableHostel) {
            suitableHostel = hostels
                .filter(hostel => hostel.Vacancy > 0)
                .sort((a, b) => a.Vacancy - b.Vacancy)[0];
        }

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

const hasVacancy = (hostels) => {
    return hostels.some(hostel => hostel.Vacancy > 0);
};

const allotRooms = (teams, hostels, gender) => {
    let allHostels = [...hostels];
    let allTeams = [...teams];
    let changed = true;

    while (hasVacancy(allHostels) && allTeams.some(team => !team.Allotted || typeof team.Allotted === "number") && changed) {
        changed = false;
        fullAllotment(allTeams, allHostels, gender);
        allHostels.sort((a, b) => b.Vacancy - a.Vacancy);
        partialAllotment(allTeams, allHostels, gender);
        allHostels.sort((a, b) => b.Vacancy - a.Vacancy);

        if (allTeams.some(team => team.Allotted !== true && typeof team.Allotted === "number")) {
            changed = true;
        }
    }
    allHostels.sort((a, b) => a.Vacancy - b.Vacancy);
    allocateRemaining(allTeams, allHostels, gender);

    return { allTeams, allHostels };
};

export { allotRooms };
