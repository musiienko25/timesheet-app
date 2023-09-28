// MonthFilter.tsx
import React from "react";
import { useEmployeeContext } from "../EmployeeContext";

function MonthFilter() {
  const { selectedMonth, setSelectedMonth } = useEmployeeContext();

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  // Реализуйте логику заполнения месяцев на основе timesheets

  return (
    <div>
      <label>Select Month:</label>
      <select onChange={handleMonthChange} value={selectedMonth || ""}>
        {/* Опции месяцев */}
      </select>
    </div>
  );
}

export default MonthFilter;
