// src/components/MonthYearFilter.jsx
import React from "react";

const MonthYearFilter = ({ filter, setFilter, applyFilter }) => {
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = [
    { value: "0", label: "Year" },
    { value: "1", label: "2023" },
    { value: "2", label: "2022" },
    { value: "3", label: "2021" },
    { value: "4", label: "2020" },
    { value: "5", label: "2019" },
    { value: "6", label: "2018" },
    { value: "7", label: "2017" },
    { value: "8", label: "2016" },
    { value: "9", label: "2015" },
    { value: "10", label: "2014" },
    { value: "11", label: "2013" },
    { value: "12", label: "2012" },
  ];

  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-bold mb-2">
        Filter by Month and Year:
      </label>
      <div className="flex flex-col space-y-2">
        {months.map((month) => (
          <div key={month.value} className="flex flex-row items-center">
            <input
              type="radio"
              id={`month-${month.value}`}
              value={month.value}
              checked={filter.month === month.value}
              onChange={(e) => setFilter({ ...filter, month: e.target.value })}
              className="mr-1"
            />
            <label htmlFor={`month-${month.value}`}>{month.label}</label>
          </div>
        ))}
        <select
          className="border border-gray-300 p-2 rounded-md text-black"
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
        >
          {years.map((year) => (
            <option key={year.value} value={year.value} className="text-black">
              {year.label}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          onClick={applyFilter}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default MonthYearFilter;
