import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { Box, Typography, styled } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const RecommendationMain = styled(Box)`  
   background: ${(props) => props.theme.palette.primary.soft}; 
   padding: 15px 15px;
   border-radius: 10px;
   width: 38%;
   ${(props) => props.theme.breakpoints.down('lg')} {
     width: 50%;
     margin-top: 10px;
    }
    ${(props) => props.theme.breakpoints.down('md')} {
        width: 70%;
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
        width: 100%;
    }
`
const Title = styled(Typography)`  
    font-size: 16px;
    line-height: 22px; 
    font-weight: 500;
    margin-bottom:   8px ; 
    font-family: 'Fira Sans', sans-serif;
    text-align: center;
`

const Recommendation = ({ open, tags, videoCurrent }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const {data} = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_SERVERURI}/api/videos/getByTag?tags=${tags}`,
                }); 
                if(data.success){
                    const recommend = data.videos?.filter((video) => video._id !== videoCurrent._id);
                    setVideos(recommend);  
                }
            }
            catch (error) {
                if (error.response) {
                    console.log(error.response.data.errors || error.response.data.message);   //Server Error
                    toast.error(error.response.data.errors || error.response.data.message);
                } else {
                    console.log("Something went wrong:", error.message);
                }
            }
        }
        fetchRecommendations();
    }, []);

    return (
        <RecommendationMain >
            {
                videos.length  ?  <Cards open={open} type='sm' videos={videos} />
                :  <Title>  Related Videos not Available</Title>
            }
        </RecommendationMain>
    )
}

export default Recommendation
