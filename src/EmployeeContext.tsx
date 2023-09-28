import React, { createContext, useContext } from "react";
import employeesData from "./data/users.json";
import timesheetsData from "./data/timesheets.json";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}
interface Timesheet {
  id: string;
  assessment: number;
  breakMinutes: number;
  minutes: number;
  startTime: string;
  endTime: string;
  userId: string;
}
interface EmployeeContextProps {
  employees: Employee[];
  timesheets: Timesheet[];
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
}

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmployeeContext.Provider
      value={{
        employees: employeesData,
        timesheets: timesheetsData,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
