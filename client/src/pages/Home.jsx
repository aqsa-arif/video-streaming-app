import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/material' 
import Cards from '../components/Cards';
import axios from 'axios'; 


const MainContainer = styled(Box)`
    background-color:  ${(props) => props.theme.palette.primary.main}; 
    padding: 30px 15px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;  
    overflow: hidden;
`  
 
const Home = ({open, type}) => {
    const [videos, setVideos] =  useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
            const {data} = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURI}/api/videos/${type}`
            })
         
            if(data.success){
                setVideos(data.videos);
            }else{
                console.log(data.message);
            }
            } catch (error) {
                console.log("Something went wrong", error);
            }
        }             
        fetchVideos();
    },[type]);

    return (
        <MainContainer> 
            
              <Cards open={open} type="lg" videos={videos} /> 

        </MainContainer>
    )
}

export default Home
