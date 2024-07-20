import { summariseDataForHostels } from "./hostelsData"; // Import the function to summarize hostel data

// Function to merge hostel data for boys and girls into a single object
const mergeHostelData = (allotment) => {
    // Get summarized data for boys' hostels
    const boysHostels = summariseDataForHostels(allotment.boysAllottment.allHostels);
    
    // Get summarized data for girls' hostels
    const girlsHostels = summariseDataForHostels(allotment.girlsAllottment.allHostels);
    
    // Merge boys' and girls' hostels data into a single object and return
    return { ...boysHostels, ...girlsHostels };
};

// Function to get a sorted list of hostel names
const getHostelsList = (allotment) => {
    // Merge the hostel data to get a complete list of hostels
    const hostelData = mergeHostelData(allotment);
    
    // Extract and sort the hostel names from the merged data
    const list = Object.keys(hostelData);
    list.sort(); // Sort hostel names alphabetically
    
    return list; // Return the sorted list of hostel names
};

// Function to get a list of rooms for a specific hostel
const getRoomsList = (allotment, hostelName) => {
    // Merge the hostel data to get a complete list of hostels
    const hostelData = mergeHostelData(allotment);

    // Check if the specified hostel name exists in the merged data
    if (!hostelName || !hostelData[hostelName]) {
        return []; // Return an empty array if the hostel does not exist
    }

    // Get the rooms for the specified hostel and convert them into an array of objects
    const roomsInHostel = hostelData[hostelName].Rooms;
    return Object.keys(roomsInHostel).map(roomNumber => ({
        roomNumber, // Room number
        ...roomsInHostel[roomNumber] // Spread the room details
    }));
};

// Export the functions for use in other parts of the application
export { mergeHostelData, getHostelsList, getRoomsList };
