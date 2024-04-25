import React, { useState } from "react";
import { useEmployeeContext } from "../contexts/EmployeeContext";

const generateShortId = (() => {
  let counter = 1;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return () => {
    let id = "";
    for (let i = 0; i < 3; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };
})();

const AddEmployeeModal = ({ onClose, onSuccess, employeeToEdit }) => {
  const { addEmployee, editEmployee } = useEmployeeContext();
  const [name, setName] = useState(employeeToEdit ? employeeToEdit.name : "");
  const [email, setEmail] = useState(employeeToEdit ? employeeToEdit.email : "");
  const [phone, setPhone] = useState(employeeToEdit ? employeeToEdit.phone : "");
  const [photo, setPhoto] = useState(employeeToEdit ? employeeToEdit.photo : "");
  const [birthdate, setBirthdate] = useState(employeeToEdit ? employeeToEdit.birthdate : "");
  const [position, setPosition] = useState(employeeToEdit ? employeeToEdit.position : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateShortId();
    const employeeData = { id, name, position, phone, photo, birthdate };
    if (employeeToEdit) {
      editEmployee({ ...employeeToEdit, ...employeeData });
    } else {
      addEmployee(employeeData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{employeeToEdit ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Photo:</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Birthdate:</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
