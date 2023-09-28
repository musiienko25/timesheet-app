// EmployeeTable.tsx
import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useEmployeeContext } from "../EmployeeContext";

function EmployeeTable() {
  const { employees, timesheets } = useEmployeeContext();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const openUserModal = (user: any) => {
    setSelectedUser(user);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            {/* Добавьте другие заголовки по мере необходимости */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: any) => (
            <tr key={employee.id}>
              <td>
                {employee.firstName} {employee.lastName}
              </td>
              <td>{employee.position}</td>
              <td>
                <Button onClick={() => openUserModal(employee)}>
                  View Timesheets
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Модальное окно для отображения табелей пользователя */}
      <Modal show={!!selectedUser} onHide={closeUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Timesheets for {selectedUser?.firstName} {selectedUser?.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Вывод табелей выбранного пользователя */}
          {selectedUser && (
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
                {timesheets.map(
                  (timesheet: any) =>
                    timesheet.userId === selectedUser.id && (
                      <tr key={timesheet.id}>
                        <td>{timesheet.id}</td>
                        <td>{timesheet.assessment}</td>
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
          <Button variant="secondary" onClick={closeUserModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmployeeTable;
