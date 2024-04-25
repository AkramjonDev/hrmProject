"use client"
import React, { useState } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import AddEmployeeModal from '../components/AddEmployeeModal';
import { EmployeeProvider } from '../contexts/EmployeeContext.js';
import SideNavbar from '@/components/SideNavbar';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <EmployeeProvider>
        <div className='pl-60'>
          <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-5' onClick={toggleModal}>ishchi qo'shish</button>
          <EmployeeTable />
          {isModalOpen && <AddEmployeeModal onClose={toggleModal} />}
        </div>
      <SideNavbar />  
      </EmployeeProvider>
    </>
  );
};

export default Home;