import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };
  // function to update the spots remaining based on the action Create/delete
  const updateSpots = (state, action) => {
    for(let i = 0; i < state.days.length; i++){
      if (state.days[i].name === state.day){
        if (action === "create"){
          state.days[i].spots -= 1;
        } else if (action === "delete"){
          state.days[i].spots += 1;
        }
        return state;
      }
    }  
  };
  // BookInterview function to be used with edit and create based on mode
   function bookInterview(id, interview, mode) {
      const appointment = {
        ...state.appointments[id],
        interview: {...interview}
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const requestUrl = `/api/appointments/`+id;
      return (
        axios.put(requestUrl, {interview})
        .then(() => {
          //if the mode we passed was create then update the spots remaining
          if (mode === "CREATE") {
            updateSpots(state, "create");
          }
          //set the state with the updated appointments
          setState({ ...state, appointments });
        })
        );
    }
    function cancelInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const requestUrl = `/api/appointments/`+id;
      return (
        axios.delete(requestUrl)
        .then(() => {
          updateSpots(state, "delete");
          setState({ ...state, appointments });
        })
      )
    }

    useEffect(() => {
      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ]).then((all) => {  
        setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
    }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}