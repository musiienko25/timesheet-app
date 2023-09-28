import React from "react";
import { Modal, CloseButton } from "react-bootstrap";

interface Timesheet {
  id: string;
  assessment: number;
  breakMinutes: number;
  minutes: number;
  startTime: string;
  endTime: string;
  userId: string;
}

interface UserModalProps {
  user: {
    firstName: string;
    lastName: string;
    id: string;
  } | null;
  timesheets: Timesheet[];
  show: boolean;
  onHide: () => void;
}

function UserModal({ user, timesheets, show, onHide }: UserModalProps) {
  const compareStartTime = (a: Timesheet, b: Timesheet) => {
    const startTimeA = new Date(a.startTime).getTime();
    const startTimeB = new Date(b.startTime).getTime();
    return startTimeA - startTimeB;
  };

  const filteredTimesheets = user
    ? timesheets.filter((timesheet) => timesheet.userId === user.id)
    : [];

  const sortedTimesheets = filteredTimesheets.sort(compareStartTime);

  return (
    <Modal show={show} onHide={onHide} className="employeetable__modal">
      <Modal.Header closeButton>
        <Modal.Title>
          Timesheets for {user?.firstName} {user?.lastName}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {user && (
          <table>
            <thead className="usermodal__thead">
              <tr>
                <th>ID</th>
                <th>Assessment</th>
                <th className="test">Break Minutes</th>
                <th>Minutes</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody className="usermodal__tbody">
              {sortedTimesheets.map((timesheet: Timesheet) => (
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
        )}
      </Modal.Body>

      <Modal.Footer>
        <CloseButton onClick={onHide} />
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
