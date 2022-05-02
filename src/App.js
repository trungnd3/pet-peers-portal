import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Login />} />
        <Route path='/pets' element={<Home />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    </Layout>
  );
}

export default App;
