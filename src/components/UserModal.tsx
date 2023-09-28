import { useEffect } from "react";
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
  };
  timesheets: Timesheet[];
  show: boolean;
  onHide: () => void;
}

function UserModal({ user, timesheets, show, onHide }: UserModalProps) {
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
                <th className="text-center">Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody className="usermodal__tbody">
              {timesheets.map(
                (timesheet: Timesheet) =>
                  timesheet.userId === user.id && (
                    <tr key={timesheet.id}>
                      <td>{timesheet.id}</td>
                      <td className="text-center">{timesheet.assessment}</td>
                      <td>{timesheet.breakMinutes}</td>
                      <td>{timesheet.minutes}</td>
                      <td>{timesheet.startTime}</td>
                      <td>{timesheet.endTime}</td>
                    </tr>
                  )
              )}
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
