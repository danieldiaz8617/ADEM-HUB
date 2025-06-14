export default {
  getTopAssociationAbbreviation: () => {
    const counts = {};
    Activities.data.forEach(row => {
      const id = row.AssociationsID;
      counts[id] = (counts[id] || 0) + 1;
    });

    let maxID = null;
    let maxCount = 0;

    for (const id in counts) {
      if (counts[id] > maxCount) {
        maxID = id;
        maxCount = counts[id];
      }
    }

    // Find matching association in Associations table
    const topAssociation = Association_Table.data.find(assoc => assoc.ID == maxID);

    return topAssociation ? topAssociation.Abbreviation : "Not found";
  }
}