import { useEffect, useState } from 'react';
import attendanceData from '../data/attendanceData';

const useAttendanceData = (employeeId) => {
  const [attendanceDataForEmployee, setAttendanceDataForEmployee] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const filteredData = employeeId ? attendanceData.filter(item => item.employeeId === employeeId) : attendanceData;
      setAttendanceDataForEmployee(filteredData.map(item => item.date));
    };

    fetchData();
  }, [employeeId]);

  return attendanceDataForEmployee;
};

export default useAttendanceData;
