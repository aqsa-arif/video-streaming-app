import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, Button, Drawer, Grid, InputBase, Switch, useTheme } from '@mui/material';
import logo from '../assets/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import MiniDrawer from './MiniDrawer';
import { useNavigate } from 'react-router-dom';


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(27px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundImage: 'linear-gradient(45deg,#1E73BE, #00BFEF)',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      // opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    marginTop: 1,
    boxSizing: 'border-box',
    width: 27,
    height: 27,
  },
  '& .MuiSwitch-track': {
    borderRadius: 34,
    backgroundColor: '#E9E9EA',
    // backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Container = styled(Grid)`
    background-color: ${(props) => props.theme.palette.primary.soft};
    padding: 15px 20px;
    display: flex;
    width: 100%;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;

    ${(props) => props.theme.breakpoints.down('sm')} {
        padding: 10px 10px;   // Custom padding for small devices and above
    }
 
`;

const Header = styled(Box)`  
    display: flex; 
    align-Items: center; 
    justify-content: space-between; 
    width: 100%;
    gap: 10px;
`

const Logo = styled(Box)` 
     display: flex;
     gap: 5px;
     align-items: center;
`
const LogoImg = styled(Avatar)` 
    width:  25px; 
    height:  25px; 
    ${(props) => props.theme.breakpoints.down('sm')} {
      width:  20px; 
      height:  20px; 
    }
`
const LogoText = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.soft,
  fontWeight: 600,
  fontSize: 25, // Default font size for all screen sizes
  fontFamily: 'Fira Sans Condensed, sans-serif',
  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 20, 
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 22, 
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: 25, 
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: 28, 
  },
}));

const SearchBar = styled(Grid)(({ theme }) => ({
  padding: '12px 30px',
  margin: '0px 40px',
  borderRadius: '50px',
  transition: '.3s linear',
  lineHeight: '20px',
  border: '1px solid',
  borderColor: theme.palette.secondary.seperate,
  position: 'relative',
  width: '63%',    // Default width for all screen sizes
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
}));

const NavInputBase = styled(InputBase)(({ theme }) => ({
  width: '85%',
  color: '#a9a9a9',
  transition: '.3s linear',
}));

const NavButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 3,
  right: 4,
  height: 50,
  background: 'linear-gradient(to right, #1E73BE, #00BFEF)',
  cursor: 'pointer',
  color: '#fff',
  fontSize: 16,
  border: 'none',
  borderRadius: 50,
  padding: '0 15px', // Default padding for all screen sizes and screens below 'md'
  [theme.breakpoints.up('sm')]: {
    padding: '0 20px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 40px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 50px',
  },
}));

const SearchBtn = styled(Button)(({ theme }) => ({
  height: 35,
  background: 'linear-gradient(to right, #1E73BE, #00BFEF)',
  cursor: 'pointer',
  color: '#fff',
  fontSize: 16,
  border: 'none', 
  borderRadius: 50,
  padding: '0 15px', // Default padding for all screen sizes and screens below 'md'
  [theme.breakpoints.up('sm')]: {
    padding: '0 20px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 40px',
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 50px',
  },
}));

const Menu = styled(Grid)(({ theme }) => ({
  display: 'none',  // By default, hide the component
  [theme.breakpoints.down('md')]: {
    display: 'flex',  // Display the component at screen sizes equal to or below 'sm'
    background: props => props.theme.palette.primary.soft,
    height: '32px',
    width: '32px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    '&:hover': {
      background: 'linear-gradient(to right, #1E73BE, #00BFEF)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    height: '20px',
    width: '20px',
  },
}));

const NavBtns = styled(Box)`
   display: flex;
   align-items: center; 
   gap:  10px;   
`

const HambergerIcon = styled(MenuIcon)`
font-size: 30px;
color: #a9a9a9;  
cursor: pointer;
&:hover{
  color: #fff;
}
`
 
const MobSearchBar = styled(Box)(({ theme }) => ({
  padding: '12px 30px', 
  borderRadius: '50px',
  transition: '.3s linear',
  lineHeight: '20px',
  border: '1px solid',
  borderColor: theme.palette.secondary.seperate,
  position: 'relative',
  width: '80%',    // Default width for all screen sizes
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',  

  '& button': { 
    position: 'absolute',
    top: 3,
    right: 4,
    height: 50,
    background: 'linear-gradient(to right, #1E73BE, #00BFEF)',
    cursor: 'pointer',
    color: '#fff',
    fontSize: 16,
    border: 'none',
    borderRadius: 50,
    padding: '0 25px', // Default padding for all screen sizes and screens below 'md'
    [theme.breakpoints.up('sm')]: {
      padding: '0 38px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 50px',
    }, 
  },
  '& div': { 
  width: '85%',
  color: '#a9a9a9',
  transition: '.3s linear',
  },
})); 


const Navbar = ({ open, setOpen, handleThemeToggle }) => {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false); 

  const theme = useTheme();

  const handleDrawerToggle = () => {
    setOpen(!open);
    setVisible(true);
  };
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true); 
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Container >

      <MiniDrawer 
       open={open} setOpen={setOpen}
       visible={visible} setVisible={setVisible}
       handleThemeToggle={handleThemeToggle}
        />

      <Header>
        {
          !visible &&
          <>
            <Menu onClick={handleDrawerToggle}  > <HambergerIcon /> </Menu>
            <Logo >
              <LogoImg src={logo} alt="Logo"  ></LogoImg>
              <LogoText> VideoVibeTube </LogoText>
            </Logo>

            <SearchBar >
              <NavInputBase
                placeholder='Search'
                name='search'
                value={q}
                onChange={(e) => setQ(e.target.value)}
                inputProps={{
                  sx:
                    { color: `${(props) => props.theme.palette.primary.soft}`, fontSize: '15px', letterSpacing: '1px' }
                }}>
              </NavInputBase>
              <NavButton onClick={() => navigate(`/search?q=${q}`)} > <SearchIcon /> </NavButton>
            </SearchBar>

            <NavBtns>
              <SearchBtn onClick={handleOpenDrawer} > <SearchIcon /> </SearchBtn>
              {<IOSSwitch defaultChecked onChange={handleThemeToggle} />}
            </NavBtns>

          </>
        }

      </Header>

      <Drawer anchor="top" open={isDrawerOpen} onClose={handleCloseDrawer}
      PaperProps={{
        sx: {
           width: '100%',
           height: '30%' , 
           position: 'relative', 
           zIndex: 9999,
           backgroundColor:   theme.palette.primary.main, 
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
          }
      }}
      >
       
        <MobSearchBar >
              <NavInputBase
                placeholder='Search'
                name='search'
                value={q}
                onChange={(e) => setQ(e.target.value)}
                inputProps={{
                  sx:
                    { color: `${(props) => props.theme.palette.primary.soft}`, fontSize: '15px', letterSpacing: '1px' }
                }}>
              </NavInputBase>
              <NavButton onClick={() => navigate(`/search?q=${q}`)} > <SearchIcon /> </NavButton>
        </MobSearchBar>  
            
      </Drawer>

    </Container>
  )
}

export default Navbar





