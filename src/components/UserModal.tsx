import React, { useState } from "react";
import { Modal, CloseButton, Form } from "react-bootstrap";

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

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedMonth(selectedValue !== "all" ? selectedValue : null);
  };

  const filteredByMonthTimesheets = selectedMonth
    ? sortedTimesheets.filter((timesheet) =>
        timesheet.startTime.includes(selectedMonth)
      )
    : sortedTimesheets;

  const uniqueMonths = Array.from(
    new Set(
      sortedTimesheets.map((timesheet) => timesheet.startTime.substr(0, 7))
    )
  );

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setSelectedMonth(null);
      }}
      className="usermodal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Timesheets for {user?.firstName} {user?.lastName}
        </Modal.Title>
      </Modal.Header>
      <div className="usermodal__select">
        <Form.Select onChange={handleMonthChange}>
          <option value="all">All Months</option>
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Form.Select>
      </div>
      <Modal.Body>
        {user && (
          <div>
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
                {filteredByMonthTimesheets.map((timesheet: Timesheet) => (
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
        )}
      </Modal.Body>

      <Modal.Footer>
        <CloseButton
          onClick={() => {
            onHide();
            setSelectedMonth(null);
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
