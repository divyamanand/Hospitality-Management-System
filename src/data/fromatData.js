
const formatTeamsData = (groups) => {
    let boysGroups = [];
    let girlsGroups = [];

    groups.forEach(group => {
        const groups = {...group, "Rooms": [], "Allotted": 0}
        const {Gender, ...rest} = groups
        let boys = 0;
        let girls = 0;

        const genderStr = Gender.toLowerCase();

        if (genderStr.includes("boys") || genderStr.includes("boy")) {
            const boysMatch = genderStr.match(/(\d+)\s?boys?|\b(\d+)\s?boy\b/);
            boys = boysMatch ? parseInt(boysMatch[1] || boysMatch[2], 10) : 0;
        }

        if (genderStr.includes("girls") || genderStr.includes("girl")) {
            const girlsMatch = genderStr.match(/(\d+)\s?girls?|\b(\d+)\s?girl\b/);
            girls = girlsMatch ? parseInt(girlsMatch[1] || girlsMatch[2], 10) : 0;
        }

        if (!boys && genderStr.includes("boys")) boys = parseInt(group["Total Members"], 10);
        if (!girls && genderStr.includes("girls")) girls = parseInt(group["Total Members"], 10);

        if (boys > 0) {
            boysGroups.push({
                ...rest,
                Boys: boys,
            });
        }

        if (girls > 0) {
            girlsGroups.push({
                ...rest,
                Girls: girls,
            });
        }
    });

    boysGroups.sort((a, b) => b.Boys - a.Boys);
    girlsGroups.sort((a, b) => b.Girls - a.Girls);

    return { boysGroups , girlsGroups };
};


const formatHostelsData = (hostels, sorted = false) => {
const girlsHostels = [];
const boysHostels = [];

hostels.forEach(room => {
    const rooms = { ...room, "Vacancy": parseInt(room.Capacity), Capacity: parseInt(room.Capacity), Teams: [] };
    const {Gender, Vacancy, ...rest} = rooms

    if (Gender === "Girls") {
        girlsHostels.push(rooms);
    } else if (Gender === "Boys") {
        boysHostels.push(rooms);
    }
});

girlsHostels.sort((a, b) => parseInt(a.Vacancy) - parseInt(b.Vacancy));
boysHostels.sort((a, b) => parseInt(a.Vacancy) - parseInt(b.Vacancy));

return {girlsHostels: girlsHostels, boysHostels: boysHostels };
}

export {formatTeamsData, formatHostelsData}