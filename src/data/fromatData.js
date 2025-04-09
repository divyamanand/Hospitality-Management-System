const formatTeamsData = (groups) => {
    let boysGroups = [];
    let girlsGroups = [];

    groups.forEach(group => {
        const groupData = { ...group, "Rooms": [], "Allotted": 0 };
        const { Gender, ...rest } = groupData;

        let boys = 0;
        let girls = 0;

        if (!Gender || typeof Gender !== 'string') return; // Skip group if Gender is undefined or not a string

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

    return { boysGroups, girlsGroups };
};
