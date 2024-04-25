import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useAttendanceData from '../hooks/useAttendanceData';
import AttendanceSummary from '../components/AttendanceSummary';

const localizer = momentLocalizer(moment);

const calculateAttendanceSummary = (attendance) => {
  let totalEmployees = 0;
  let presentEmployees = 0;
  let lateArrivals = 0;

  Object.values(attendance).forEach(employee => {
    totalEmployees++;
    if (employee.isPresent) {
      presentEmployees++;
      if (employee.isLate) {
        lateArrivals++;
      }
    }
  });

  const absentEmployees = totalEmployees - presentEmployees;
  const averageAttendance = totalEmployees === 0 ? 0 : (presentEmployees / totalEmployees) * 100;

  return {
    totalEmployees,
    presentEmployees,
    absentEmployees,
    lateArrivals,
    averageAttendance: averageAttendance.toFixed(2),
  };
};

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const attendance = useAttendanceData(selectedDate);
  const [attendanceSummary, setAttendanceSummary] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedAttendance = window.localStorage.getItem('attendance');
      if (storedAttendance) {
        setAttendanceSummary(calculateAttendanceSummary(JSON.parse(storedAttendance)));
      }
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-8">
      <h1 className="at-title text-3xl font-bold mb-4">Attendance Page</h1>
      {attendanceSummary && <AttendanceSummary {...attendanceSummary} />}
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={attendance}
          startAccessor="start"
          endAccessor="end"
          selectable
          defaultDate={new Date()}
          onSelectEvent={event => console.log(event)}
          onSelectSlot={handleDateChange}
        />
      </div>
    </div>
  );
};

export default AttendancePage;
