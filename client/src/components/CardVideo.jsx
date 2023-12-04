import React, { useEffect, useState } from 'react'
import { Avatar, Box,  styled } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';  
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {format} from 'timeago.js';


const VideoCard = styled(Card)` 
     width:  ${(props) => props.type == "sm" ? '380px' : '332px'}; 
     height: auto; 
     background:  transparent;
     box-shadow: none; 
     border: none;
     outline: none;
     &.adjustSize {
        width: 400px;  
        ${(props) => props.theme.breakpoints.down('md')} {
            width: 100%;  
        }
     }
     ${(props) => props.theme.breakpoints.down('sm')} {
        width: 100%;
    }
`
const CardAction = styled(CardActionArea)`  
     display: ${(props) => props.type == "sm" && 'flex'}; 
     align-items: flex-start;
`
const CardText = styled(CardContent)` 
    display: flex; 
    padding:   ${(props) => props.type === "sm" ? '7px 16px' : '16px 16px'};   
    gap: 12px;
    margin-top:    ${(props) => props.type === "lg" && '12px'};  
    width:   ${(props) => props.type == "sm" && '50%'};  
`
const ChannelPic = styled(Avatar)` 
    width: 36px;
    height: 36px;    
    display: ${(props) => props.type === "sm" && 'none'}; 
    ${(props) => props.theme.breakpoints.down('sm')} {
        width: 25px;
        height: 25px;  
    }
`
const Title = styled(Typography)`  
    font-size: 16px;
    line-height: 22px; 
    font-weight: 500;
    margin-bottom:   8px ; 
    font-family: 'Fira Sans', sans-serif;
    ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 14px;
        line-height: 18px;  
    }    
`
const SubTitle = styled(Typography)`   
    font-family: 'Fira Sans', sans-serif;
    line-height: 20px; 
    font-size: 16px;
    font-weight: 500;
    color:   ${(props) => props.theme.palette.secondary.main}; 
    text-transform: capitalize;
    ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 12px;
        line-height: 16px;  
    }   
`
const Views = styled(Typography)`  
   font-family: 'Fira Sans', sans-serif;
    font-size: 14px;
    line-height: 20px; 
    font-weight: 400;
    color:  ${(props) => props.theme.palette.secondary.main}; 
    
    ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 10px;
        line-height: 16px;  
    }   
`
const CardImg = styled(CardMedia)`   
   border-radius: 15px;
   height: 180px;
   width:   ${(props) => props.type == 'sm' && '50%'};  
   ${(props) => props.theme.breakpoints.down('sm')} {
     height:  135px;
   }
`
const VidLink = styled(NavLink)`   
   ${(props) => props.theme.breakpoints.down('sm')} {
     width: 100%
  }
`

const CardVideo = ({video, open, type }) => {
    const [channel, setChannel] = useState({}); 
    
    useEffect(() => { 
        const fetchChannel = async () => {
            try {
            const {data} = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURI}/api/users/get/${video.userId}`
            })
          
            if(data.success){
                setChannel(data.user); 
            }else{
                console.log(data.message);
            }
            } catch (error) {
                console.log("Something went wrong", error);
            }
        }             
        fetchChannel();
    },[video.userId]);

  return (
    <VidLink to={`/video/${video._id}`} >
        <VideoCard className={`${!open && type==="lg"  ? 'adjustSize' : ""} `} 
        type={type} >
        
            <CardAction type={type} >
                <CardImg
                    component="img" 
                    image={video.imgUrl}
                    src={video.videoUrl}
                    alt="video"
                    type={type}
                />
                <CardText  type={type} >

                    <ChannelPic src={channel.img} alt="Profile Image"
                        type={type} ></ChannelPic>

                    <Box>

                        <Title gutterBottom variant="h3" component="div">
                            {video.title}
                        </Title>
                        <SubTitle gutterBottom variant="h5" component="div">
                            {channel.username}
                        </SubTitle>
                        <Views variant="body2" >
                            {video.views} views &#8226; { format(video.createdAt) }
                        </Views>

                    </Box>
                </CardText>
            </CardAction>
            
    
        </VideoCard>
    </VidLink>
  )
}

export default CardVideo
