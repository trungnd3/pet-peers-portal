import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
