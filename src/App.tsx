// App.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { EmployeeProvider } from "./EmployeeContext";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  return (
    <div className="App">
      <h1>Employee Timesheets</h1>
      <EmployeeProvider>
        {/* <MonthFilter /> */}
        <EmployeeTable />
      </EmployeeProvider>
    </div>
  );
}

export default App;
