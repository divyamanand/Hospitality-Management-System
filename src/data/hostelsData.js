const summariseDataForHostels = (hostels) => {
    let hostelsSummary = {};
    
    hostels.forEach(element => {
        if (!hostelsSummary[element["Hostel Name"]]) {
            hostelsSummary[element["Hostel Name"]] = { 
                "Rooms": {}, 
                "Gender": element.Gender 
            };
        }
        
        hostelsSummary[element["Hostel Name"]]["Rooms"][element["Room Number"]] = {
            Capacity: element.Capacity,
            Vacancy: element.Vacancy,
            Teams: element.Teams
        };
    });

    

    for (const hostel in hostelsSummary) {
        let totalCapacity = 0
        let totalVacancy = 0
        for (const room in hostelsSummary[hostel].Rooms) {
            totalVacancy += hostelsSummary[hostel].Rooms[room].Vacancy
            totalCapacity += hostelsSummary[hostel].Rooms[room].Capacity
        }
        hostelsSummary[hostel] = {...hostelsSummary[hostel], totalCapacity, totalVacancy}
    }
    
    return hostelsSummary
};


export {summariseDataForHostels}