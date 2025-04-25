import logo from './logo.svg';
import './App.css';
import ImageClickCapture from './components/ImageClickCapture'
import ImageMarkerOverlay from './components/MarkCoordinates';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Only clear specific key to avoid deleting unrelated data
    localStorage.removeItem('imageClickCoordinates');
  }, []);
  return (
    <>
    <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<ImageClickCapture />} />
        <Route path='markedItems' element={<ImageMarkerOverlay />} />
      </Routes>

    </>


  );
}

export default App;
