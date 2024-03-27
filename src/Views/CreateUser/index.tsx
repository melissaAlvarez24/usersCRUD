import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Method, TFormUser, TFullUser, selectedOptions } from './types';
import { makeRequest } from '../../common/adapters/Axios';
import { CreateUserC } from './components';

export const CreateUserV = () => {
  // Get the user ID from the URL params
  const location = useLocation();
  let { id } = useParams();
  // Navigation hook to redirect to different pages
  const navigate = useNavigate();
  // Initial state for the form fields
  const initialFormState: TFormUser = {
    firstName: '',
    lastName: '',
    picture: '',
    email: '',
    dateOfBirth: new Date(),
    phone: '',
  };
  // State to store the form data
  const [form, setForm] = useState<TFormUser>(initialFormState)
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [stateDetail, setStateDetail] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const titles: selectedOptions[] = [
    { value: 'mr', label: 'Mr' },
    { value: 'ms', label: 'Ms' },
    { value: 'mrs', label: 'Mrs' },
    { value: 'miss', label: 'Miss' },
    { value: 'dr', label: 'Dr' },
  ];
  const genders: selectedOptions[] = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
    { value: 'other', label: 'other' },
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(e.target.value);
  };

  // Function to handle user actions (create/update)
  const eventUser = async ({method, url}: {method: Method, url: string}) => {
    try {
      const response = await makeRequest({
        partialUrl: url,
        method: method,
        data: {...form, 
          title: selectedTitle,
          gender: selectedGender
        },
        headers: {"app-id": process.env.REACT_APP_APP_ID || ''}
      });

      if(response.data) {
        return response.status
      }

    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async (id: string) => {
    try {
      const response = await makeRequest<TFullUser>({
        partialUrl: `/user/${id}`,
        method: 'get',
        headers: {"app-id": process.env.REACT_APP_APP_ID || ''}
      });

      if(response.data) {
        return response.data
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'dateOfBirth' ? new Date(value) : value;

    setForm(prevForm => ({
      ...prevForm,
      [name]: updatedValue
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!form.email || !form.firstName || !form.lastName) {
      return alert('Porfavor completar toda la información.');
    }

    if(id) {
      const response = await eventUser({
        method: 'put', 
        url: `/user/${id}`
      })

      if(response === 200){
        alert('Usuario actualizado de manera exitosa.')
        setForm(initialFormState)
        return navigate("/");
      }
    } else {
      const response = await eventUser({
        method: 'post', 
        url: `/user/create`
      })

      if(response === 200){
        alert('Usuario creado de manera exitosa.')
        setForm(initialFormState)
        return navigate("/");
      }
    }
  };

  // Fetch user data when the ID changes
  useEffect(() => {
    const fetchUser = async () => {
      if(id){
        const detail = new URLSearchParams(location.search).get('detail');
        if(detail) setStateDetail(true)
        const user = await getUser(id)
        setForm({
          id,
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          picture: user?.picture || '',
          email: user?.email || '',
          dateOfBirth:new Date(user?.dateOfBirth || '') ||  new Date(),
          phone: user?.phone || '',
        })
        setSelectedTitle(user?.title || '');
        setSelectedGender(user?.gender || '');
      }
    };
    fetchUser();
  }, [id])
  
  
  // Render the CreateUser component with necessary props
  return (
    <CreateUserC 
      handleChange={handleChange}
      data={{form, genders, selectedGender, selectedTitle, titles, stateDetail }}
      handleGenderChange={handleGenderChange}
      handleTitleChange={handleTitleChange}
      handleSubmit={handleSubmit}
    />
  )
}
