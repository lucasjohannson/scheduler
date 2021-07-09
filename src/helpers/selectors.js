export function getAppointmentsForDay(state, day) {
  let returnArr = [];
  console.log("day", day);

    const workingDay = state.days.filter(itm => itm.name === day);
    console.log("🚀 ~ file: selectors.js ~ line 6 ~ getAppointmentsForDay ~ workingDay", workingDay)
    if(workingDay.length === 0){
      return returnArr;
    }
    const daysApp = workingDay[0]["appointments"];
    for(const i of daysApp){
      for(const j in state.appointments){
        if (i == j){
          returnArr.push(state.appointments[j])
        }
      }
    }
    return returnArr;

}