import React, { useEffect, useState } from 'react'
import { Avatar, Box, Container, styled } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import main from '../assets/main.jpg';
import user from '../assets/user.jpg';
import Cards from '../components/Cards';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const MainContainer = styled(Box)`
    background-color:  ${(props) => props.theme.palette.primary.main}; 
    padding: 30px 15px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center; 
`  
 
const Subscription = ({open, type}) => {
    const [videos, setVideos] =  useState([]);
    const {token} = useSelector(state => state.user );
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
            const {data} = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURI}/api/videos/subscriptions`,
                headers: {
                    'auth-token': token
                }

            })
         
            if(data.success){
                setVideos(data.videos);  
            }else{ 
                toast.error(data.message);
                navigate('/');
            }
            } catch (error) {
                console.log("Something went wrong", error);
            }
        }             
        fetchVideos();
    },[]);

    return (
        <MainContainer> 
            
              <Cards open={open} type="lg" videos={videos} /> 

        </MainContainer>
    )
}

export default Subscription;
