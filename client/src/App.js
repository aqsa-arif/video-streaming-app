import Navbar from './components/Navbar'; 
import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@mui/material';
import { darkTheme, lightTheme } from './utils/theme'; 
import {
  BrowserRouter as Router,
  Route,
  Routes, 
} from "react-router-dom";
import Home from './pages/Home';
import Video from './pages/Video';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Search from './components/Search';
import Subscription from './pages/Subscriptions'; 



function App() {  

  const [open, setOpen] = useState(true); 
  const [themeMode, setThemeMode] = useState('dark');

  const theme = useTheme(); 

  const handleThemeToggle = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
  };

  useEffect(() => {
    const handleResize = () => {
      if (theme.breakpoints.down('md')) {
        setOpen(false);
      }
    };
  
    window.addEventListener('resize', handleResize); 
  }, [theme.breakpoints]);

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>

      <Router>
        
          <Navbar
            open={open}
            setOpen={setOpen} 
            handleThemeToggle={handleThemeToggle} 
          /> 
          
        <Routes>
          <Route path='/' element={<Home open={open} type="random" />} />
          <Route path='/subscriptions' element={<Subscription open={open}   />}  />
          <Route path='/trending' element={<Home open={open} type="trending" />} />
          <Route path='/video/:videoId' element={<Video open={open} />} />
          <Route path='/search' element={<Search open={open} />} />
          <Route path='/login' element={<Login setOpen={setOpen} />} />
        </Routes>

        <Toaster />

      </Router>

    </ThemeProvider>
  );
}

export default App;
