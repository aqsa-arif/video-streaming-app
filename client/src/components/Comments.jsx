import { Avatar, Box, Button, Divider,  InputBase, styled } from '@mui/material'
import React, { useState, useEffect } from 'react' 
import Comment from './Comment'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';


const ChannelPic = styled(Avatar)` 
    width: 40px;
    height: 40px;   
    ${(props) => props.theme.breakpoints.down('sm')} {
      width: 30px;
      height: 30px;   
  }     
`
const Message = styled(Box)` 
    margin: 15px 0;
    display: flex; 
    align-items: center;
    gap: 20px;    
    >:nth-child(2) {
        width: 100%;
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
      gap: 10px;   
   }  
`
 
const Hr = styled(Divider)`
   width: 100%;
   height: 1px;
   background: ${(props) => props.theme.palette.secondary.seperate};
`
const PostBtn = styled(Button)`
   color:  ${(props) => props.theme.palette.secondary.soft}; 
   font-weight: 400; 
   padding: 8px 8px;
   box-sizing: border-box;
   background: ${(props) => props.theme.palette.secondary.seperate}; 
   border-radius: 20px;
   width: 100px; 
   font-size: 14px;
   font-family: 'Fira Sans', sans-serif;
   ${(props) => props.theme.breakpoints.down('sm')} {
      font-size: 12px;
      padding: 6px 4px;
   }
`


const Comments = () => {
   const [comments, setComments] = useState([]);
   const { videoCurrent } = useSelector((state) => state.video);
   const { userCurrent, token } = useSelector((state) => state.user); 

   const [message, setMessage] = useState('');
   const [posted, setPosted] = useState(false);
 
   useEffect(() => {
      const fetchComments = async () => {
         try {
            const { data } = await axios({
               method: 'get',
               url: `${process.env.REACT_APP_SERVERURI}/api/comments/get/${videoCurrent._id}`,
            });
            
            setComments(data.comments);
         }
         catch (error) {
            if (error.response) {
               console.log(error.response.data.errors || error.response.data.message);   //Server Error
               toast.error(error.response.data.errors || error.response.data.message);
            } else {
               console.log("Something went wrong:", error.message);
            }
         }
      };
      fetchComments();
   }, [posted]);

   const PostComment = async () => {
      if(message.length){
         try {
            const { data } = await axios({
               method: 'post',
               url: `${process.env.REACT_APP_SERVERURI}/api/comments/addcomment`,
               data: {
                  message,
                  videoId: videoCurrent._id,
               },
               headers: {
                  'auth-token': token
               }
            }); 
            if(data.success){
               setPosted(prev => !prev );
               setMessage('');
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
   };

   return (
      <Box>
         <Message>
            <ChannelPic src={userCurrent?.img} alt="Profile Image" ></ChannelPic>
            <InputBase placeholder="Add a comment..."
             value={message}
             onChange={(e) => setMessage(e.target.value) }
               inputProps={{
                  sx: {
                     color: `${(props) => props.theme.palette.secondary.main}`,
                     fontSize: '14px',
                     fontFamily: 'Fira Sans, sans-serif',
                     lineHeight: '20px',
                     fontWeight: '400',
                     [`@media (max-width: 960px)`]: {
                        fontSize: '12px',
                        lineHeight: '16px',
                      },
                  }
               }}
            ></InputBase>
            <PostBtn type='text' 
            onClick={PostComment}
            > Post </PostBtn>
         </Message>

         <Hr /> 

         <Box>
            {
               comments && comments.map((comment) => {
                  return  <Comment key={comment._id} comment={comment} />
               })
            }
         </Box> 

      </Box>
   )
}

export default Comments
