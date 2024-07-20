import { summariseDataForHostels } from "./hostelsData";

const mergeHostelData = (allotment) => {
    const boysHostels = summariseDataForHostels(allotment.boysAllottment.allHostels);
    const girlsHostels = summariseDataForHostels(allotment.girlsAllottment.allHostels);
    return { ...boysHostels, ...girlsHostels };
};

const getHostelsList = (allotment) => {
    const hostelData = mergeHostelData(allotment);
    const list =  Object.keys(hostelData);
    list.sort()
    return list
};

const getRoomsList = (allotment, hostelName) => {
    const hostelData = mergeHostelData(allotment);

    if (!hostelName || !hostelData[hostelName]) {
        return [];
    }

    const roomsInHostel = hostelData[hostelName].Rooms;
    return Object.keys(roomsInHostel).map(roomNumber => ({
        roomNumber,
        ...roomsInHostel[roomNumber]
    }));
};

export { getHostelsList, getRoomsList };
