export default {
  getAssociationRowIndex: () => {
    return Association_Info.data.findIndex(
      row => row.Abbreviation.trim().toLowerCase() === AbbreviationTicket.text.trim().toLowerCase()
    );
  }
}