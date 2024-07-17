// const groups = [
//     { GroupID: "1", "Total Members": "11", Gender: "5 Boys & 6 Girls" },
//     { GroupID: "2", "Total Members": "7", Gender: "Girls" },
//     { GroupID: "3", "Total Members": "5", Gender: "1 Girl & 6 Boys" },
//     // Add other group objects here...
//   ];
//   const { boysGroups, girlsGroups } = convertGroups(groups);
//   console.log("Boys Groups:", boysGroups);
//   console.log("Girls Groups:", girlsGroups);


const formatTeamsData = (groups) => {
    let boysGroups = [];
    let girlsGroups = [];
  
    groups.forEach(group => {
      const { Gender, ...rest } = group;
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
  

      if (!boys && genderStr.includes("boys")) boys = parseInt(group['Total Members'], 10);
      if (!girls && genderStr.includes("girls")) girls = parseInt(group['Total Members'], 10);
  
      if (boys > 0) {
        boysGroups.push({
          ...rest,
          Gender: { Boy: boys }
        });
      }
  
      if (girls > 0) {
        girlsGroups.push({
          ...rest,
          Gender: { Girl: girls }
        });
      }
    });
  
    return { boysGroups, girlsGroups };
  };


const formatHostelsData = (hostels) => {
    const girlsHostels = [];
    const boysHostels = [];

    hostelData.forEach(room => {
        const { "Hostel Name": hostelName, ...rest } = room;
        
        if (room['Gender Accommodation'] === 'Girls') {
            girlsHostels.push({ hostelName, ...rest });
        } else if (room['Gender Accommodation'] === 'Boys') {
            boysHostels.push({ hostelName, ...rest });
        }
    });

    return { girlsHostels, boysHostels };
}


  export {formatTeamsData, formatHostelsData}