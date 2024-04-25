import React from 'react';
import AddEmployeeModal from './AddEmployeeModal';
import { useRouter } from 'next/router';

const ParentComponent = () => {
  const router = useRouter();

  const handleCloseModal = () => {

  };

  const handleSuccess = () => {
    router.push('/some-route');
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <AddEmployeeModal onClose={handleCloseModal} onSuccess={handleSuccess} />
    </div>
  );
};

export default ParentComponent;