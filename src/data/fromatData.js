// Function to format and sort team data based on gender
const formatTeamsData = (groups) => {
    let boysGroups = []; // Initialize an array to store formatted boys groups
    let girlsGroups = []; // Initialize an array to store formatted girls groups

    // Iterate through each group in the provided list
    groups.forEach(group => {
        // Create a new object with the current group data, adding "Rooms" and "Allotted" properties
        const groups = {...group, "Rooms": [], "Allotted": 0}
        const {Gender, ...rest} = groups; // Destructure Gender from the group and keep the rest
        let boys = 0; // Initialize count of boys
        let girls = 0; // Initialize count of girls

        const genderStr = Gender.toLowerCase(); // Convert Gender to lowercase for case-insensitive comparison

        // If gender string includes "boys" or "boy", extract the number of boys
        if (genderStr.includes("boys") || genderStr.includes("boy")) {
            const boysMatch = genderStr.match(/(\d+)\s?boys?|\b(\d+)\s?boy\b/); // Regex to match number of boys
            boys = boysMatch ? parseInt(boysMatch[1] || boysMatch[2], 10) : 0; // Parse the number of boys from match results
        }

        // If gender string includes "girls" or "girl", extract the number of girls
        if (genderStr.includes("girls") || genderStr.includes("girl")) {
            const girlsMatch = genderStr.match(/(\d+)\s?girls?|\b(\d+)\s?girl\b/); // Regex to match number of girls
            girls = girlsMatch ? parseInt(girlsMatch[1] || girlsMatch[2], 10) : 0; // Parse the number of girls from match results
        }

        // If boys count is zero but gender string includes "boys", assume total members are boys
        if (!boys && genderStr.includes("boys")) boys = parseInt(group["Total Members"], 10);
        // If girls count is zero but gender string includes "girls", assume total members are girls
        if (!girls && genderStr.includes("girls")) girls = parseInt(group["Total Members"], 10);

        // If there are boys, push formatted data into boysGroups array
        if (boys > 0) {
            boysGroups.push({
                ...rest, // Include other properties from rest
                Boys: boys, // Add Boys property
            });
        }

        // If there are girls, push formatted data into girlsGroups array
        if (girls > 0) {
            girlsGroups.push({
                ...rest, // Include other properties from rest
                Girls: girls, // Add Girls property
            });
        }
    });

    // Sort boysGroups array by the number of Boys in descending order
    boysGroups.sort((a, b) => b.Boys - a.Boys);
    // Sort girlsGroups array by the number of Girls in descending order
    girlsGroups.sort((a, b) => b.Girls - a.Girls);

    return { boysGroups, girlsGroups }; // Return formatted and sorted groups
};

// Function to format and sort hostel data based on gender
const formatHostelsData = (hostels, sorted = false) => {
    const girlsHostels = []; // Initialize an array to store formatted girls hostels
    const boysHostels = []; // Initialize an array to store formatted boys hostels

    // Iterate through each hostel in the provided list
    hostels.forEach(room => {
        // Create a new object with the current hostel data, adding "Vacancy" and "Capacity" properties
        const rooms = { ...room, "Vacancy": parseInt(room.Capacity), Capacity: parseInt(room.Capacity), Teams: [] };
        const {Gender, Vacancy, ...rest} = rooms; // Destructure Gender and Vacancy from the room and keep the rest

        // If Gender is "Girls", push formatted data into girlsHostels array
        if (Gender === "Girls") {
            girlsHostels.push(rooms);
        // If Gender is "Boys", push formatted data into boysHostels array
        } else if (Gender === "Boys") {
            boysHostels.push(rooms);
        }
    });

    // Sort girlsHostels array by Vacancy in ascending order
    girlsHostels.sort((a, b) => parseInt(a.Vacancy) - parseInt(b.Vacancy));
    // Sort boysHostels array by Vacancy in ascending order
    boysHostels.sort((a, b) => parseInt(a.Vacancy) - parseInt(b.Vacancy));

    return {girlsHostels: girlsHostels, boysHostels: boysHostels }; // Return formatted and sorted hostels
}

// Export the functions for use in other parts of the application
export {formatTeamsData, formatHostelsData};
