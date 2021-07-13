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

   function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: {...interview}
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const requestUrl = `http://localhost:8001/api/appointments/`+id;
      return (
        axios.put(requestUrl, {interview})
        .then(() => {
          setState({ ...state, appointments });
          axios.get("api/days").then((response) => {
            setState((prev) => ({
              ...prev,
              days: response.data,
            }));
          });
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
      const requestUrl = `http://localhost:8001/api/appointments/`+id;
      return (
        axios.delete(requestUrl)
        .then(() => {
          setState({ ...state, appointments });
          axios.get("api/days").then((response) => {
            setState((prev) => ({
              ...prev,
              days: response.data,
            }));
          });
        })
      )
    }

    useEffect(() => {
      Promise.all([
        axios.get("http://localhost:8001/api/days"),
        axios.get("http://localhost:8001/api/appointments"),
        axios.get("http://localhost:8001/api/interviewers")
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