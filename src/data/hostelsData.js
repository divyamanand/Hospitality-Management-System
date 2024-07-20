// Function to summarize hostel data
const summariseDataForHostels = (hostels) => {
    let hostelsSummary = {}; // Initialize an empty object to store summarized data for each hostel

    // Iterate through each hostel element in the provided list
    hostels.forEach(element => {
        // If the hostel is not already in the summary object, add it with initial properties
        if (!hostelsSummary[element["Hostel Name"]]) {
            hostelsSummary[element["Hostel Name"]] = { 
                "Rooms": {}, // Initialize an empty object to store rooms for this hostel
                "Gender": element.Gender // Store the gender associated with this hostel
            };
        }
        
        // Add room details to the hostel's Rooms object
        hostelsSummary[element["Hostel Name"]]["Rooms"][element["Room Number"]] = {
            Capacity: element.Capacity, // Store room capacity
            Vacancy: element.Vacancy,   // Store room vacancy
            Teams: element.Teams        // Store teams in the room
        };
    });

    // Iterate through each hostel in the summary object to calculate total capacity and vacancy
    for (const hostel in hostelsSummary) {
        let totalCapacity = 0; // Initialize total capacity for the hostel
        let totalVacancy = 0;  // Initialize total vacancy for the hostel
        
        // Iterate through each room in the hostel to aggregate total capacity and vacancy
        for (const room in hostelsSummary[hostel].Rooms) {
            totalVacancy += hostelsSummary[hostel].Rooms[room].Vacancy; // Sum up room vacancies
            totalCapacity += hostelsSummary[hostel].Rooms[room].Capacity; // Sum up room capacities
        }
        
        // Update the hostel summary with total capacity and vacancy
        hostelsSummary[hostel] = {...hostelsSummary[hostel], totalCapacity, totalVacancy};
    }
    
    // Return the summarized hostel data
    return hostelsSummary;
};

// Export the summariseDataForHostels function for use in other parts of the application
export {summariseDataForHostels};
