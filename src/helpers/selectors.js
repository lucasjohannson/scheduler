
export function getInterview (state, interview) {
  if(!interview) return null; 
  const interviewer = state.interviewers[interview.interviewer];
  return {...interview, interviewer};
};





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


export function getInterviewersForDay(state, day) {
  const getDay = state.days.find((currentDay) => currentDay.name === day);
  if(!getDay){
    return [];
  }
  const getInterviewers = getDay.interviewers;
  if(!getInterviewers) {
    return [];
  }
  const returnValue = getInterviewers.map(i => state.interviewers[i]);
  return returnValue;
  
}