import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box,  Typography,  styled } from '@mui/material';
import Cards from './Cards'; 


const MainContainer = styled(Box)`
    background-color:  ${(props) => props.theme.palette.primary.main}; 
    padding: 30px 15px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center; 
`
const Title = styled(Typography)`  
    font-size: 16px;
    line-height: 22px; 
    font-weight: 500;
    margin-bottom:   8px ; 
    font-family: 'Fira Sans', sans-serif;
    text-align: center;
    margin: auto;
`
 
const Search = ({ open }) => {
    const [videos, setVideos] = useState();
    const query = useLocation().search;    // ?q=${q}  

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_SERVERURI}/api/videos/search${query}`
                })

                if (data.success) {
                    setVideos(data.videos);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log("Something went wrong", error);
            }
        }
        fetchVideos();
    }, []);


    return (
        <MainContainer> 
            {
                videos?.length ?  <Cards open={open} type="lg" videos={videos} /> 
                :  <Title>  No Video found for this Search </Title>
            }
            

        </MainContainer>
    )
}

export default Search
