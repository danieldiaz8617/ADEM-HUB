export default {
  getTotalParticipants: () => {
    return Activities.data.reduce((sum, row) => {
      return sum + Number(row.Participants || 0);
    }, 0);
  }
}