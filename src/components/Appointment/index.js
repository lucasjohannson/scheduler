import React from "react";
import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const BACK = "BACK";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const status = "STATUS";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if(!interviewer){
      return;
    }
    // console.log("saved");
    // console.log("name: ", name);
    // console.log("interviewer: ", interviewer);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true));
    
  }
  function confirmation() {
    transition(CONFIRM);
  }
  function edit() {
    transition(EDIT);
  }
  function cancel() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_SAVE, true));
  }
  console.log("Interview", props.interview);
  return(
    <section className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmation}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          />
      )}
       {
        mode === SAVING && (
          <Status
          message="Saving data"
          />
        )
      }
      {
        mode === DELETE && (
          <Status
          message="deleteing data"
          />
        )
      }
      {
        mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete your appointment?"
            onCancel={back}
            onConfirm={cancel}
          />
        )
      }
      {
        mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )
      }
            {mode === ERROR_DELETE && (
        <Error
          message={"Error encountered when deleting. Please try again"}
          onClose={back}
        ></Error>
      )}

      {mode === ERROR_SAVE && (
        <Error
          message={"Error encountered when saving. Please try again"}
          onClose={back}
        ></Error>
      )}
      
    </section>
  );

}
