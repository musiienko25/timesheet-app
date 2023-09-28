// TimesheetDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useEmployeeContext } from "../EmployeeContext";

function TimesheetDetail() {
  const { userId } = useParams<{ userId: string }>();
  const { timesheets } = useEmployeeContext();

  // Фильтрация табелей по userId
  const userTimesheets = timesheets.filter(
    (timesheet: any) => timesheet.userId === userId
  );

  return (
    <div>
      <h2>Timesheets for User ID: {userId}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Assessment</th>
            <th>Break Minutes</th>
            <th>Minutes</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {userTimesheets.map((timesheet) => (
            <tr key={timesheet.id}>
              <td>{timesheet.id}</td>
              <td>{timesheet.assessment}</td>
              <td>{timesheet.breakMinutes}</td>
              <td>{timesheet.minutes}</td>
              <td>{timesheet.startTime}</td>
              <td>{timesheet.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimesheetDetail;
