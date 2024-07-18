const fullAllotment = (teams, hostels, gender) => {
    teams.forEach(team => {
        for (let hostel of hostels) {
        if (hostel.Vacancy >= team[gender] && !team.Allotted) {
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
    });
};

const partialAllotment = (teams, hostels, gender) => {
    teams.forEach(team => {
        for (let hostel of hostels) {
            console.log(hostel.Vacancy > 0 &&  typeof(team.Allotted) === "number" )
            if (hostel.Vacancy > 0 && (typeof(team.Allotted) === "number")) {
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
    });
};

const hasVacancy = (hostels) => {
    return hostels.some(hostel => hostel.Vacancy > 0);
};

const allotRooms = (teams, hostels, gender) => {
    const allHostels = hostels
    const allTeams = teams

    while (hasVacancy(allHostels) && allTeams.some(team => !team.Alloted)) {
        fullAllotment(allTeams, allHostels, gender);
        allHostels.sort((a, b) => b.Vacancy - a.Vacancy);
        partialAllotment(allTeams, allHostels, gender);
        allHostels.sort((a, b) => b.Vacancy - a.Vacancy);
    }
    
    return {allTeams, allHostels}
};

export {allotRooms}