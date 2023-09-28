import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useEmployeeContext } from "../EmployeeContext";
import UserModal from "./UserModal";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
}

function EmployeeTable() {
  const { employees, timesheets } = useEmployeeContext();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const openUserModal = (user: User) => {
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

      <UserModal
        user={selectedUser}
        timesheets={timesheets}
        show={!!selectedUser}
        onHide={closeUserModal}
      />
    </div>
  );
}

export default EmployeeTable;
