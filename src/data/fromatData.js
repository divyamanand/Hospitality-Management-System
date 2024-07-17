const formatData = (teams) => {
    return teams.map(group => {
        let boys = 0;
        let girls = 0;
        const genderStr = group.Gender.toLowerCase();

        if (genderStr.includes("boy") || genderStr.includes("boys")) {
            boys = parseInt(genderStr.match(/(\d+)\s+boy|boys/)?.[1] || 0);
            if (isNaN(boys) && genderStr.includes("boy")) boys = parseInt(group["Total Members"]);
        }
        if (genderStr.includes("girl") || genderStr.includes("girls")) {
            girls = parseInt(genderStr.match(/(\d+)\s+girl|girls/)?.[1] || 0);
            if (isNaN(girls) && genderStr.includes("girl")) girls = parseInt(group["Total Members"]);
        }

        if (genderStr === "boys") {
            boys = parseInt(group["Total Members"]);
        }
        if (genderStr === "girls") {
            girls = parseInt(group["Total Members"]);
        }

        return {
            ...group,
            "Gender": {
                "Boy": boys,
                "Girl": girls
            }
        };
    });
};

export {formatData}