// EmployeeTable.tsx
import React from "react";
import { Table } from "react-bootstrap";
import { useEmployeeContext } from "../EmployeeContext";

function EmployeeTable() {
  const { employees, timesheets, selectedMonth } = useEmployeeContext();

  // Реализуйте логику фильтрации timesheets по выбранному месяцу

  return (
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
            {/* Отображение табелей сотрудника */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
