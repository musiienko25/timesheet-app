// EmployeeContext.tsx
import React, { createContext, useState, useContext } from "react";
import employeesData from "./data/users.json";
import timesheetsData from "./data/timesheets.json";

// Интерфейсы для типизации данных
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  // Добавьте другие поля сотрудника по мере необходимости
}

interface Timesheet {
  id: string;
  assessment: number;
  breakMinutes: number;
  minutes: number;
  startTime: string;
  endTime: string;
  userId: string;
  // Добавьте другие поля табеля по мере необходимости
}

interface EmployeeContextProps {
  employees: Employee[];
  timesheets: Timesheet[];
  selectedMonth: string | null;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Реализуйте фильтрацию timesheets по месяцу по мере необходимости

  return (
    <EmployeeContext.Provider
      value={{
        employees: employeesData,
        timesheets: timesheetsData,
        selectedMonth,
        setSelectedMonth,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
