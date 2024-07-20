const summariseTeamsData = (teams) => {
    // Initialize an empty array to store the summarized team data
    const teamsSummary = new Array();
    
    // Iterate over each team in the input teams array
    teams.forEach(team => {
        // For each team, iterate over the rooms they are allocated to
        team.Rooms.forEach(room => 
            // Push a new object into the teamsSummary array with relevant information
            teamsSummary.push({
                GroupID: team["Group ID"],         // The group ID of the team
                hostelName: room["Hostel Name"],   // The name of the hostel where the room is located
                roomNumber: room["Room Number"],   // The room number
                membersAllocated: room["Members"]  // Number of members allocated to this room
            })
        )
    })
    
    // Return the array of summarized team data
    return teamsSummary
}

export { summariseTeamsData }
