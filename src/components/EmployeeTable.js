"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useEmployeeContext } from "../contexts/EmployeeContext";
import AddEmployeeModal from "./AddEmployeeModal";
import { BiTrash, BiEdit } from "react-icons/bi";

const EmployeeTable = () => {
  const { employees, deleteEmployee } = useEmployeeContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    deleteEmployee(index);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1 mb-4 outline-none"
      />
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <img src={employee.photo} alt="E" className="w-10 h-10" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/attendance?id=${employee.id}`}>
                  <p>{employee.name}</p>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-red-600 hover:text-red-800 mr-2" onClick={() => handleEdit(employee)}>
                  <BiEdit className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(index)}>
                  <BiTrash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddEmployeeModal onClose={() => setIsModalOpen(false)} employeeToEdit={employeeToEdit} />
      )}
    </div>
  );
};

export default EmployeeTable;
