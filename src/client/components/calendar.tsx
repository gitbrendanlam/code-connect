import React, { useEffect, useState } from "react";

export default function Calendar() {
  const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayParts: string[] = ['AM', 'PM'];
  const timesOfDay: React.JSX.Element[] = [];

  dayParts.forEach(part => {
    for ( let i = 1; i < 12; i++ ) {
      timesOfDay.push(<div>{i.toString().concat(' ', part)}</div>);
    }
  })

  return (
    <div>
      <div>
        {
          daysOfWeek.map(day => <div>{day[0]}</div>)
        }
      </div>
      <div>
        {
          timesOfDay
        }
      </div>
    </div>
  )
}