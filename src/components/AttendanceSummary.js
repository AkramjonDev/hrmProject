import React from 'react';

const AttendanceSummary = ({ totalEmployees, presentEmployees, absentEmployees, lateArrivals, averageAttendance }) => {
  return (
    <div className="attendance-summary border rounded-md p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Attendance Summary</h2>
      <div className="flex justify-between mb-2">
        <p>Total Employees:</p>
        <p>{totalEmployees}</p>
      </div>
      <div className="flex justify-between mb-2">
        <p>Present Employees:</p>
        <p>{presentEmployees}</p>
      </div>
      <div className="flex justify-between mb-2">
        <p>Absent Employees:</p>
        <p>{absentEmployees}</p>
      </div>
      <div className="flex justify-between mb-2">
        <p>Late Arrivals:</p>
        <p>{lateArrivals}</p>
      </div>
      <div className="flex justify-between">
        <p>Average Attendance Rate:</p>
        <p>{averageAttendance}%</p>
      </div>
    </div>
  );
};

export default AttendanceSummary;
