import { summariseDataForHostels } from "./hostelsData";

const roomsData = (allotment, hostelName) => {

    const boysHostels = summariseDataForHostels(allotment.boysAllottment.allHostels);
    const girlsHostels = summariseDataForHostels(allotment.girlsAllottment.allHostels);
    const hostelData = { ...boysHostels, ...girlsHostels }

    const hostelsList = Object.keys(hostelData)
    const hostel = hostelsList[0] || hostelName || ''
    let roomsList = new Array()

    if (hostel) {
    const roomsInHostel = hostelData[hostel].Rooms
    roomsList = Object.keys(roomsInHostel).map(roomNumber => ({
        roomNumber,
        ...roomsInHostel[roomNumber]
    }))
}

    return {hostelsList, roomsList}
}

export {roomsData}