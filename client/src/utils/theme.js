
import { createTheme } from '@mui/material'; 

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FAFAFA',       
      soft: '#FFFFFF',
    },
    secondary: { 
        main:  '#333',
        soft: '#333',        
       seperate: '#f5f5f5',
      //  seperate: '#dfdfdf',
      }, 
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#111111',    
      soft:  '#181818',
    },
    secondary: {
      main: '#a9a9a9',  
      soft: '#fff',
      seperate: '#373737',
      // seperate: '#383838',
    }, 
  },
});

export {lightTheme, darkTheme} ;