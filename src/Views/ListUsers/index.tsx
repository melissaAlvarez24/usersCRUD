import { useCallback, useEffect, useState } from 'react';
import { makeRequest } from '../../common/adapters/Axios';
import { ListUsersC } from './components';
import { TDataReturn, TTitleMap, TUsers } from './types';

export const ListUsersV = () => {
  // State to store the list of users
  const [users, setUsers] = useState<TUsers[]>([]);
  const [titleMap] = useState<TTitleMap>({
    mr: 'Sr.',
    ms: 'Sra.',
    mrs: 'Sra.',
    miss: 'Srta.',
    dr: 'Dr.',
  })
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  // State to store the current page
  const [currentPage, setCurrentPage] = useState(1);
  // State to store the number of users per page
  const [perPage] = useState(10);
  // State to store the total number of pages
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch users in a paginated manner
  const fetchData = useCallback(async () => {
    try {
      const response = await makeRequest<TDataReturn>({
        partialUrl: '/user',
        method: 'get',
        params: {
          page: currentPage,
          limit: perPage
        },
        headers: { "app-id": process.env.REACT_APP_APP_ID || '' }
      });

      if (response.data) {
        // Calculate the total number of pages
        setTotalPages(Math.ceil(response.data.total / perPage));
        // Update the list of users
        setUsers(response.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  }, [currentPage, perPage]);

  // Function to handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleDeleteUser = (id: string) => {
    setShowModal(true);
    setUserIdToDelete(id);
  };

  // Function to delete a user
  const deleteUser = async (id: string) => {
    try {
      await makeRequest({
        partialUrl: `/user/${id}`,
        method: 'delete',
        headers: { "app-id": process.env.REACT_APP_APP_ID || '' }
      });

      setShowModal(false);
      // Update the list of users after deleting one
      fetchData();

    } catch (error) {
      console.log(error);
    }
  }

  // Load users when the component mounts or when the page changes
  useEffect(() => {
    fetchData();
  }, [currentPage, perPage, fetchData]);

  return (
    <ListUsersC
      data={{ users, currentPage, totalPages, titleMap, showModal,
        userIdToDelete }}
      setShowModal={setShowModal}
      handlePageChange={handlePageChange}
      handleDeleteUser={handleDeleteUser}
      deleteUser={deleteUser}
    />
  );
}
