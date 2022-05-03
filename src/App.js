import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AddPet from './pages/AddPet';
import MyPets from './pages/MyPets';

import { fetchPets } from './app/action-creators/pet';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Login />} />
        <Route path='/pets' element={<Home />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/add-pet' element={<AddPet />} />
        <Route path='/my-pets' element={<MyPets />} />
      </Routes>
    </Layout>
  );
}

export default App;
