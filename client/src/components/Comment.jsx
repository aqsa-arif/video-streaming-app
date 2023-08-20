import { Avatar, Box, Typography, styled } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { format } from 'timeago.js'


const ChannelPic = styled(Avatar)` 
    width: 40px;
    height: 40px;    
    ${(props) => props.theme.breakpoints.down('sm')} {
        width: 30px;
        height: 30px;   
    }     
` 
const SingleComment = styled(Box)` 
    margin: 30px 0;
    display: flex;  
    gap: 15px; 
    ${(props) => props.theme.breakpoints.down('sm')} {
        gap: 10px;   
        margin: 15px 0;
     }  
`
const CommentInfo = styled(Box)`  
  > p {
    font-family: 'Fira Sans', sans-serif;
    font-size: 14px;
    line-height: 20px; 
    font-weight: 400;
    color:  ${(props) => props.theme.palette.secondary.main};  
    ${(props) => props.theme.breakpoints.down('sm')} {
       font-size: 12px;
     }      
  }
  > div {
    display: flex; 
    gap: 10px;
    > :nth-child(1) {
      font-size: 16px;
      line-height: 20px; 
      font-weight: 500;
      margin-bottom:   4px ; 
      font-family: 'Fira Sans', sans-serif; 
      color:  ${(props) => props.theme.palette.secondary.soft};  
      text-transform: capitalize;
      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 14px; 
        line-height: 16px;  
      }
    }
     > :nth-child(2) {
      font-family: 'Fira Sans', sans-serif;
      font-size: 13px;
      line-height: 20px; 
      font-weight: 400;
      color:  ${(props) => props.theme.palette.secondary.main};  
      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 12px; 
        line-height: 16px; 
      }
     }
  }
` 

const Comment = ({comment}) => {
    const [commentuser, setCommentuser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try { 
                const  {data} = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_SERVERURI}/api/users/get/${comment.userId}`,
                });  
                if(data.success){
                    setCommentuser(data.user);
                }
            }
            catch (error) {  
                    if (error.response) {
                    console.log(error.response.data.errors || error.response.data.message );   //Server Error
                    toast.error(error.response.data.errors || error.response.data.message);
                    } else {
                    console.log("Something went wrong:", error.message);
                    }
             }
        }
        getUser();
    },[]);

    return (
        <SingleComment>
            <ChannelPic src={commentuser.img} alt="Profile Image" ></ChannelPic>
            <CommentInfo>
                <Box>
                    <Typography>{commentuser.username}</Typography>
                    <Typography>{format(comment.createdAt)}</Typography>
                </Box>
                <Typography> {comment.message} </Typography>
            </CommentInfo>
        </SingleComment>
    )
}

export default Comment
