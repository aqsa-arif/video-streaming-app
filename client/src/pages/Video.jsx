import { Avatar, Box, Button, CardMedia, Divider, Grid, Typography, styled, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import user from '../assets/user.jpg';
import Comments from '../components/Comments'; 
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { dislikes, downloadVideo, likes, singleVideoFetchFailure, singleVideoFetchStart, singleVideoFetchSuccess } from '../redux/videoSlice';
import { format } from 'timeago.js';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';
import { useLocation } from 'react-router-dom';
import { storage } from '../utils/firebase';

const CardsContainer = styled(Grid)` 
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center; 
    flex-wrap: wrap; 
    gap: 20px;
    &.sidemaxgap{
        margin-left: 237px;
        ${(props) => props.theme.breakpoints.down('md')} {
            margin-left: 0px;
        }
    }
    &.sidemingap{
        margin-left: 60px;
        ${(props) => props.theme.breakpoints.down('md')} {
            margin-left: 0px;
        }
    }
`
const MainContainer = styled(Box)`
    background-color:  ${(props) => props.theme.palette.primary.main}; 
    padding: 30px 15px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center; 
`
const VideoSec = styled(Grid)`  
    width: 60%;
    ${(props) => props.theme.breakpoints.down('lg')} {
        width: 70%;
    }
    ${(props) => props.theme.breakpoints.down('md')} {
        width: 80%;
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
        width: 100%;
        > video {
            ${(props) => props.theme.breakpoints.down('sm')} {
                height:  145px;
              }
        }
    } 
`
const Description = styled(Box)`  
   margin: 12px 0;
`
const Content = styled(Box)`  
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    ${(props) => props.theme.breakpoints.down('sm')} {
        flex-direction: column; 
        align-items: flex-end;
        gap: 10px;
    }
`
const ChannelPic = styled(Avatar)` 
    width: 40px;
    height: 40px;    
    ${(props) => props.theme.breakpoints.down('sm')} {
        width: 30px;
        height: 30px;   
    }    
`
const Title = styled(Typography)`  
    font-size: 20px;
    line-height: 28px; 
    font-weight: 600;
    margin-bottom:   8px ; 
    font-family: 'Fira Sans', sans-serif;
    color:  ${(props) => props.theme.palette.secondary.soft};  
    ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 16px;
        line-height: 18px;  
        margin-bottom:   5px ; 
    } 
`
const Views = styled(Typography)`  
    font-family: 'Fira Sans', sans-serif;
    font-size: 15px;
    line-height: 20px; 
    font-weight: 400;
    color:  ${(props) => props.theme.palette.secondary.main};  
    ${(props) => props.theme.breakpoints.down('sm')} {
        margin-right: auto;
        font-size: 12px;
        line-height: 16px; 
    }    
`
const Social = styled(Box)`  
   display: flex;
   align-items: center;
   gap: 15px;
   ${(props) => props.theme.breakpoints.down('sm')} {
    gap: 10px;
  } 
`
const SocialButton = styled(Typography)`  
   display: flex;
   align-items: center; 
   gap: 5px;
   font-weight: 400;
   font-family: 'Fira Sans', sans-serif;
   color:  ${(props) => props.theme.palette.secondary.soft}; 
   cursor: pointer;
   font-size: 16px;  
   > svg {
        font-Size: 20px;  
        ${(props) => props.theme.breakpoints.down('sm')} {
            font-size: 16px;  
        }    
   }
   ${(props) => props.theme.breakpoints.down('sm')} {
     font-size: 14px;  
   }    
`

const Hr = styled(Divider)`
   width: 100%;
   height: .5px;
   background: ${(props) => props.theme.palette.secondary.seperate};
`
const Subscription = styled(Box)`
   width: 100%; 
   margin: 12px 0;
   display: flex;  
   gap: 15px;
   > button {
     background: linear-gradient(to right, #1E73BE, #00BFEF);
     font-family: 'Fira Sans Condensed', sans-serif;  
     height: 26px;
     width: 64px;
     margin-left: auto;
     padding: 25px 80px;
     font-weight: 400;
     font-size: 16px;
     line-height: 26px; 
     color: #fff;
     border-radius: 50px;
     cursor: pointer;  
     -webkit-transition: all 0.3s ease 0s;
     -o-transition: all 0.3s ease 0s;
     transition: all 0.3s ease 0s; 
     ${(props) => props.theme.breakpoints.down('sm')} {
        padding: 19px 40px;
       font-size: 12px;
        line-height: 18px;    
     }   
   } 
`
const Channel = styled(Box)`
   display: flex; 
   flex-direction: column; 
   justify-content: center;
`
const ChannelInfo = styled(Box)` 
   > :nth-child(1) {
    font-size: 18px;
    line-height: 22px; 
    font-weight: 500;
    margin-bottom:   4px ; 
    font-family: 'Fira Sans', sans-serif; 
    color:  ${(props) => props.theme.palette.secondary.soft};  
    text-transform: capitalize;
    ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 14px;
        line-height: 18px; 
     }    
   }
   > :nth-child(2) {
    font-family: 'Fira Sans', sans-serif;
    font-size: 14px;
    line-height: 20px; 
    font-weight: 400;
    color:  ${(props) => props.theme.palette.secondary.main}; 
    margin-bottom: 20px;
    ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 12px;
        line-height: 16px; 
     } 
   }
`

const Video = ({ open }) => { 
    const location = useLocation();
    const videoId = location.pathname.split('/')[2]; 
    const { download  } = useSelector(state => state.video );

    const [channel, setChannel] = useState({}); 
    const dispatch = useDispatch();
    const { videoCurrent } = useSelector((state) => state.video);
    const { userCurrent, token } = useSelector((state) => state.user); 


    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(singleVideoFetchStart());
                const videoRes = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_SERVERURI}/api/videos/get/${videoId}`,
                });
                dispatch(singleVideoFetchSuccess(videoRes.data)); 

                const { data } = await axios.get(`${process.env.REACT_APP_SERVERURI}/api/users/get/${videoRes.data.userId}`);
                setChannel(data.user);
            }
            catch (error) {
                dispatch(singleVideoFetchFailure());
                if (error.response) {
                    console.log(error.response.data.errors || error.response.data.message);   //Server Error
                    toast.error(error.response.data.errors || error.response.data.message);
                } else {
                    console.log("Something went wrong:", error.message);
                }
            }
        };
        fetchData();
    }, [videoId]);

    const handleLike = async () => {
        try {
            const {data} = await axios({
                method: 'put',
                url: `${process.env.REACT_APP_SERVERURI}/api/videos/likes/${videoCurrent?._id}`,
                headers: {
                    'auth-token': token
                }
            });
            console.log(data);
            if(data.success){
                dispatch(likes(userCurrent?._id));
            }else{
                toast.error(data.message);
            }
           

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.errors || error.response.data.message);   //Server Error
                toast.error(error.response.data.errors || error.response.data.message);
            } else {
                console.log("Something went wrong:", error.message);
            }
        }

    }

    const handleDislike = async () => {
        try {
            await axios({
                method: 'put',
                url: `${process.env.REACT_APP_SERVERURI}/api/videos/dislikes/${videoCurrent._id}`,
                headers: {
                    'auth-token': token
                }
            });
            dispatch(dislikes(userCurrent._id));

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.errors || error.response.data.message);   //Server Error
                toast.error(error.response.data.errors || error.response.data.message);
            } else {
                console.log("Something went wrong:", error.message);
            }
        }
    }

    const handleSubscribe = async () => {
        try {
            if (userCurrent?.subscribedusers?.includes(channel._id)) {
                await axios({
                    method: 'put',
                    url: `${process.env.REACT_APP_SERVERURI}/api/users/unsubscribe/${channel._id}`,
                    headers: {
                        'auth-token': token,
                    },
                });
                // Update subscribers count
                channel.subscribers -= 1;
            } else {
                await axios({
                    method: 'put',
                    url: `${process.env.REACT_APP_SERVERURI}/api/users/subscribe/${channel._id}`,
                    headers: {
                        'auth-token': token,
                    },
                });
                // Update subscribers count
                channel.subscribers += 1;
            }
            dispatch(subscription(channel._id));

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.errors || error.response.data.message);   //Server Error
                toast.error(error.response.data.errors || error.response.data.message);
            } else {
                console.log("Something went wrong:", error.message);
            }
        }
    } 
    
    const downloadfile = (e, imagePath) => { 
            // prevents the default behavior of an event, in this case, preventing the default behavior of a click event on an anchor tag. It ensures that the event does not trigger the default action, which would be following the link.
            e.preventDefault();
            try {
                fetch(imagePath)
                .then(resp => resp.blob())  //  converts the response object (resp) into a Blob object, which represents the binary data of the file.
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);  // generates a unique URL that represents the file data stored in the Blob object. This URL is not the actual file URI, but rather a temporary URL that points to the binary data of the file.
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
        
                    const nameSplit = imagePath.split("/");  // creates array of strings or path segments
                    const duplicateName = nameSplit.pop();   //  removes the last path segment from the array (nameSplit.pop()), It extracts the filename from the path.
        
                    a.download =  duplicateName;  // sets the download attribute of the <a> element to the extracted filename. When the user clicks on the anchor link to download the file, the browser will use the value of the download attribute as the default filename for the downloaded file.
                    document.body.appendChild(a);
                    a.click();  // programmatically triggers a click event on the <a> element, simulating a user click. It initiates the file download
                    window.URL.revokeObjectURL(url);    //  releases the temporary URL created with createObjectURL, freeing up memory resources.
        
                    dispatch(downloadVideo(videoCurrent.videoUrl));
                    localStorage.setItem(imagePath, 'downloaded'); // key, value
                })
                .catch((error) => console.log('Error while downloading the image ', error))
        
            } 
            catch (error) {
                console.log('Error while downloading the image ', error);
            } 
    }

    return (
        <MainContainer>
            <CardsContainer className={`${open ? 'sidemaxgap' : 'sidemingap'} `} >

                <VideoSec   >
                    <CardMedia
                        component='video'
                        src={videoCurrent.videoUrl}
                        controls
                        poster={videoCurrent.imgUrl}   //Add thumbnail
                    />

                    <Description>
                        <Title>{videoCurrent.title} </Title>

                        <Content>
                            <Views>{videoCurrent.views} views &#8226;  {format(videoCurrent.createdAt)} </Views>

                            <Social>
                                <SocialButton onClick={handleLike}>
                                    {
                                        videoCurrent?.likes.length ?
                                            <>
                                                {
                                                    videoCurrent?.likes?.includes(userCurrent?._id)
                                                        ? <ThumbUp /> : <ThumbUpOutlinedIcon />
                                                }
                                                {videoCurrent.likes.length}
                                            </>
                                            :
                                            <> <ThumbUpOutlinedIcon /> Like </>
                                    }
                                </SocialButton>

                                <SocialButton onClick={handleDislike}>
                                    {
                                        videoCurrent?.dislikes.length ?
                                            <>
                                                {
                                                    videoCurrent?.dislikes?.includes(userCurrent?._id)
                                                        ? <ThumbDown /> : <ThumbDownOutlinedIcon />
                                                }
                                            </>
                                            :
                                            <> <ThumbDownOutlinedIcon /> Dislike </>
                                    }
                                </SocialButton> 
                                <SocialButton onClick={(e) => downloadfile(e, videoCurrent.videoUrl) }>
                                    <SaveAltIcon  />  
                                    {
                                        download === videoCurrent.videoUrl ? 'Saved' : 'Save' 
                                    }
                                </SocialButton>
                            </Social>

                        </Content>

                    </Description>

                    <Hr />

                    <Subscription >
                        <ChannelPic src={channel.img} alt="Profile Image" ></ChannelPic>
                        <Channel>
                            <ChannelInfo>
                                <Typography> {channel.username} </Typography>
                                <Typography> {channel.subscribers} subscribers</Typography>
                            </ChannelInfo>


                            <Views>
                                {videoCurrent.desc}
                            </Views>

                        </Channel>

                        <Button variant="contained" onClick={handleSubscribe}>
                            {
                                userCurrent?.subscribedusers?.includes(channel._id) ?
                                    "Subscribed" : "Subscribe"
                            }
                        </Button>
                    </Subscription>

                    <Hr />

                    <Comments />

                </VideoSec>

                <Recommendation 
                open={open} 
                tags={videoCurrent.tags}
                videoCurrent={videoCurrent} />

            </CardsContainer>
        </MainContainer>
    )
}

export default Video
