import React, { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedEmployees = localStorage.getItem('employees');
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      }
    }
  }, []);


  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const deleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const editEmployee = (id, updatedEmployee) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, ...updatedEmployee };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, deleteEmployee, editEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
