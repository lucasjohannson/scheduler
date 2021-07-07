import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  

  const items = props.days.map(day => {
    return <DayListItem 
    id = {day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />
  })

  return (
    <ul>
      {items}
    </ul>
  );
}
