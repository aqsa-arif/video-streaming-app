import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles'; 
import Grid from '@mui/material/Grid';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu'; 
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined"; 
import PersonIcon from '@mui/icons-material/Person'; 
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline'; 
import Divider from '@mui/material/Divider'; 
import ListItem from '@mui/material/ListItem'; 
import { Button, Avatar } from '@mui/material';
import Create from './Create';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice'; 
import {Switch} from '@mui/material';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 0,
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


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const Menu = styled(Grid)`
background:   ${(props) => props.theme.palette.primary.soft}; 
height: 40px;
width: 40px;  
display: flex; 
align-Items: center;
justify-content:  center; 
border-radius: 50%;
&:hover {
  background: linear-gradient(to right, #1E73BE, #00BFEF);
}
`
const HambergerIcon = styled(MenuIcon)`
font-size: 30px;
color: #a9a9a9;   
cursor: pointer;
&:hover{
  color: #fff;
}
` 
const MenuList = styled(List)(({ theme }) => ({
  margin: '30px 0',
  [theme.breakpoints.down('sm')]: {
    margin: '10px 0',
  }, 
  '& .smdev': {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    }, 
    '> span': {
      marginRight: '24px',
    }
  },
  '> a': {
    textDecoration: 'none',
  },
  '> li, > a > li': {
    color: theme.palette.secondary.main,
    fontSize: '18px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    }, 
    lineHeight: '26px',
    fontFamily: 'Fira Sans Condensed, sans-serif',
    fontWeight: '500',
    textTransform: 'capitalize',
    cursor: 'pointer',
    '&:hover': {
      background: 'linear-gradient(to right, #1E73BE, #00BFEF)',
      color: '#fff',
      '> button': {
        color: '#fff',
        border: '1px solid #fff',
      },
      '> .menuicon': {
        background: '#fff',
        color: '#1E73BE',
      },
    },
    '> .menuicon': {
      marginRight: '24px',
      fontSize: 'smaller',
      lineHeight: '30px',
      width: '33px',
      height: '33px',
      background: 'linear-gradient(to right, #1E73BE, #00BFEF)',
      color: '#fff',
      borderRadius: '50%',
      padding: '5px',
    },
    '> div': {
      marginRight: '24px',
      width: '30px',
      height: '30px',
    },
  },
  '> .minipadding, > a > .minipadding': {
    padding: '10px 13px',
  },
  '> .maxpadding, > a > .maxpadding': {
    padding: '10px 30px',
  },
}));

const DrawerMenu = styled(Drawer)` 
::-webkit-scrollbar {
  width: 2px;
::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid #fafafa;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);  
}
} 
`

const Hr = styled(Divider)`
    margin: 13px 30px;
    width: 77%;
    height: .5px;
    background: ${(props) => props.theme.palette.secondary.seperate};
    &.hrnone{
      display: none;
      opacity: 0;
      visibility: hidden;
      width: 0; 
    }
`
const Signin = styled(Button)`
   padding: 5px 15px;
   color: #00BFEF; 
   border: 1px solid #00BFEF; 
   font-family: 'Fira Sans Condensed', sans-serif;
`
const BoxComponent = styled(Grid)(({ theme, visible }) => ({
  display: 'flex', // By default, show the component
  [theme.breakpoints.down('md')]: {
    display:  visible ? 'flex' : 'none' ,
  },
}));


export default function MiniDrawer({ open, setOpen, visible, setVisible, handleThemeToggle }) {
  const theme = useTheme();
  const { userCurrent } = useSelector(state => state.user );
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setOpen(!open);
    setVisible(false);
  };

  // Dialogue 
  const [dialogopen, setDialogopen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogopen(true);
  };

  const handleClose = () => {
    setDialogopen(false);
  };

  const logoutUser = () => { 
     dispatch(logout()); 
  }; 
 

  return (
    <BoxComponent visible={visible} >
      <CssBaseline />

      <DrawerMenu PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.main, 
        }
      }}
        variant="permanent" open={open}  >
        <DrawerHeader sx={{ padding: '25px 10px' }}>
          <Menu onClick={handleDrawerToggle}  > <HambergerIcon /> </Menu>
        </DrawerHeader>

        <MenuList> 

          <NavLink to='/'>
            <ListItem className={`${!open ? 'minipadding' : 'maxpadding'} `} >
              <HomeIcon className='menuicon' />
              Home
            </ListItem>
          </NavLink >

          <ListItem className={`${!open ? 'minipadding' : 'maxpadding'} `}
            onClick={handleClickOpen}  >
            <VideoCallOutlinedIcon className='menuicon' />
            Create
          </ListItem >

          <Create dialogopen={dialogopen}
            handleClose={handleClose}
          />

          <NavLink to='/trending'>
            <ListItem className={`${!open ? 'minipadding' : 'maxpadding'} `}  >
              <ExploreOutlinedIcon className='menuicon' />
              Explore
            </ListItem >
          </NavLink>

          <NavLink to='/subscriptions'>
          <ListItem className={`${!open ? 'minipadding' : 'maxpadding'} `}>
            <SubscriptionsOutlinedIcon className='menuicon' />
            Subscriptions
          </ListItem >
          </NavLink>

          {
            userCurrent  &&  <ListItem className={`${!open ? 'minipadding' : 'maxpadding'} `}
            onClick={logoutUser} >
            <LogoutIcon className='menuicon' />
            Logout
          </ListItem >
          }      

          <Hr className={`${!open ? 'hrnone' : ""}`} />
          {
            userCurrent ?  
            <ListItem 
            className={`${!open ? 'minipadding' : 'maxpadding'} `} 
            style={{ fontWeight: '400', cursor: 'auto' }} >
            <Avatar src={userCurrent.img} alt="User" ></Avatar>
              { userCurrent.username }
          </ListItem>  
            :  <NavLink to='/login'>
            <ListItem className={`${!open ? 'minipadding' : 'maxpadding'} `}  >
              <PersonIcon className='menuicon' />
              <Signin>  SIGN IN</Signin>
            </ListItem>
          </NavLink>
          }   
          <Hr className={`${!open ? 'hrnone' : ""}`} /> 


          <ListItem className={`${!open ? 'minipadding' : 'maxpadding'} smdev`}>
           {<IOSSwitch defaultChecked onChange={handleThemeToggle} />}
              {
                theme.palette.mode == 'light' ? 'Dark Theme ': 'Light Mode'
              }
          </ListItem>

        </MenuList> 
      </DrawerMenu>

    </BoxComponent>
  );
}