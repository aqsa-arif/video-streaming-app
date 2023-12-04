import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog'; 
import DialogContent from '@mui/material/DialogContent'; 
import { FormControlLabel, InputBase, styled } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'; 
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-hot-toast';
import app from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


const ThumbnailSelection = styled(FormControlLabel)`
    display: flex; 
    justify-content: center;
    align-items: center;   
    background:  ${(props) => props.theme.palette.primary.main}; 
    width: 200px;
    height: 40px;
    box-sizing: border-box;
    color: #fff;
    border-radius: 2px;
    margin: 20px 0;
    cursor: pointer;  
    > div {
        display: none;
    }
    & .custom-button {
        font-weight: 400; 
        border: none;
        outline: none; 
        font-size: 16px;
        line-height: 26px;   
        font-family: 'Fira Sans Condensed', sans-serif;  
        color:   ${(props) => props.theme.palette.secondary.soft}; 
        -webkit-transition: all 0.3s ease 0s;
        -o-transition: all 0.3s ease 0s;
        transition: all 0.3s ease 0s;  
        ${(props) => props.theme.breakpoints.down('sm')} {
          font-size: 14px;
          line-height: 18px;  
       }
    } 
`

const VideoSelection = styled(FormControlLabel)`
    display: flex; 
    justify-content: center;
    align-items: center; 
    background:  ${(props) => props.theme.palette.primary.main}; 
    width: 100%;
    height: auto;
    padding: 10px 15px;
    box-sizing: border-box;
    color: #fff;
    border-radius: 2px;
    margin: 20px 0;
    cursor: pointer;  
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;  
    > div {
        display: none;
    } 
    & .video-button {
        font-weight: 400; 
        border: none;
        outline: none; 
        font-size: 16px;
        line-height: 26px;         
        font-family: 'Fira Sans Condensed', sans-serif;  
        color:  ${(props) => props.theme.palette.secondary.soft}; 
        ${(props) => props.theme.breakpoints.down('sm')} {
          font-size: 14px;
          line-height: 18px;  
       }
    }
`
const UploadBtn = styled(Button)`
      color:  #fff;
      background: linear-gradient(to right, #1E73BE, #00BFEF); 
      font-weight: 400;
      font-size: 18px;
      font-family: 'Fira Sans Condensed', sans-serif;
      width: 100px;
      border-radius: 20px;
      text-transform: capitalize; 
      margin-left: auto; 
      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 16px;
        width: 85px;
        padding-top: 5px ;
    }
`

const Text = styled(TextField)`
    margin: 10px 0;  
    > div {
      border-radius: 20px; 
    }
`
 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Create = ({ dialogopen, handleClose }) => {

  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPercent, setImgPercent] = useState(0);
  const [videoPercent, setVideoPercent] = useState(0);

  const navigate = useNavigate();
  const { token } = useSelector(state => state.user );

  const handleChooseFile = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };
  const handleChoosethumbnail = () => {
    const fileInput = document.getElementById('thumbnail');
    fileInput.click();
  };

  const handleInputs = (e) => {
    setInputs({ ...inputs , [e.target.name] : e.target.value })
  }

  const uploadFile = (file, urlType ) => {
    console.log(file, 'starting .....', urlType);
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage , filename );
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(file, 'starting .....', urlType);
    
    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === 'imgUrl' ? setImgPercent(Math.round(progress)) : setVideoPercent(Math.round(progress)); 
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        console.log(progress);
        break;
      default: 
        break;
    }
  }, 
  (error) => {
    toast.error('Something went wrong, Please try again');
    console.log('Unknown error occurred', error);
  },
  () => { 
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       setInputs({ ...inputs, [urlType]: downloadURL }) 
    });
  }
  )
}


const handleUpload = async () => {   
  console.log(inputs);
  try {
      const {data} = await axios({
          method: 'post',
          url: `${process.env.REACT_APP_SERVERURI}/api/videos/add`,
          data: { 
            ...inputs,
            tags
          },
          headers: {
            'auth-token': token
          }
      }) 
      
      if(data.success){  
          const videoId = data.video._id; 
          navigate(`/video/${videoId}`);
      }else{ 
        toast.error(data.message);
        console.log(data.message);
      }

    }
    catch (error) { 
      if (error.response) { 
        console.log(error.response.data.errors || error.response.data.message );   //Server Error
        toast.error(error.response.data.errors || error.response.data.message ||
        "Something went wrong");
      } else if (error.request) {
        console.log("Request Error:", error.request);
      } else {
        console.log("Something went wrong:", error.message);
      }
    }
}

  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  },[img]);

  useEffect(() => {
    video && uploadFile(video, 'videoUrl' ); 
  },[video]);

  return (
    <Dialog fullScreen open={dialogopen} onClose={handleClose} sx={{ zIndex: "9999" }}
      TransitionComponent={Transition} > 

      <AppBar sx={{ position: 'relative', }}>
        <Toolbar sx={{ position: 'relative' }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton> 

          <UploadBtn onClick={() => {
            handleUpload();    
            handleClose(); 
          }} >
             Upload
          </UploadBtn>

        </Toolbar>
      </AppBar>
 

      <DialogContent>

        <Text
          id="name"
          label="Title"
          type="text"
          fullWidth 
          autoComplete='off'
          name='title'
          onChange={handleInputs}

          inputProps={{ sx:  {
            color: '#fff' , 
            fontFamily: 'Fira Sans, sans-serif',
            fontSize: '16px',
            lineHeight: '20px', 
            fontWeight: '400',
            color:  `${(props) => props.theme.palette.secondary.main}` , 
            textTransform: 'capitalize',
            [props => props.theme.breakpoints.down('md')]: {
              fontSize: '14px', 
              lineHeight: '18px',  
            },
          }
        }}

          InputLabelProps={{
            sx: {
              color: '#fff' , 
              fontFamily: 'Fira Sans, sans-serif',
              fontSize: '16px',
              lineHeight: '20px', 
              fontWeight: '400',
              color:  `${(props) => props.theme.palette.secondary.main}` , 
              textTransform: 'capitalize',  
              [props => props.theme.breakpoints.down('md')]: {
                fontSize: '14px', 
                lineHeight: '18px',  
              },
            }
          }}
        />
        <Text
          label="Description"
          multiline
          rows={4} 
          fullWidth
          autoComplete='off'
          name='desc'
          onChange={handleInputs}

          inputProps={{ sx:  {
            color: '#fff' , 
            fontFamily: 'Fira Sans, sans-serif',
            fontSize: '16px',
            lineHeight: '20px', 
            fontWeight: '400',
            color:  `${(props) => props.theme.palette.secondary.main}` ,  
            [props => props.theme.breakpoints.down('md')]: {
              fontSize: '14px', 
              lineHeight: '18px',  
            },
          }
        }}
          InputLabelProps={{
            sx: {
              color: '#fff' , 
              fontFamily: 'Fira Sans, sans-serif',
              fontSize: '16px',
              lineHeight: '20px', 
              fontWeight: '400',
              color:  `${(props) => props.theme.palette.secondary.main}` , 
              [props => props.theme.breakpoints.down('md')]: {
                fontSize: '14px', 
                lineHeight: '18px',  
              },
            }
          }}
        />

        <ThumbnailSelection  
          label={ 
            imgPercent === 100   ? 'Uploaded Successfully' :
            imgPercent > 0 ? `Uploading \u003A ${imgPercent}%`  :
              <Button startIcon={<SaveAltIcon />} className="custom-button"
              onClick={handleChooseFile} >
                 Video Thumbnail 
             </Button> 
          }
          control={<InputBase type='file' id="fileInput" 
          accept='image/*'
          onChange={(e) => setImg( e.target.files[0] ) }
           ></InputBase>}
        >

        </ThumbnailSelection>

        <Text
          id="name"
          label="Seperate the Tags with commas"
          multiline
          rows={2} 
          type="text"
          fullWidth
          autoComplete='off'
          onChange={(e) =>  setTags(e.target.value.split(',')) }

          inputProps={{ sx:  {
            color: '#fff' , 
            fontFamily: 'Fira Sans, sans-serif',
            fontSize: '16px',
            lineHeight: '20px', 
            fontWeight: '400',
            color:  `${(props) => props.theme.palette.secondary.main}` ,  
            [`@media (max-width: 960px)`]: {
              fontSize: '14px',
              lineHeight: '18px',
            },
          }
          }}
          InputLabelProps={{
            sx: {
              color: '#fff' , 
              fontFamily: 'Fira Sans, sans-serif',
              fontSize: '16px',
              lineHeight: '20px', 
              fontWeight: '400',
              color:  `${(props) => props.theme.palette.secondary.main}` ,   
              [`@media (max-width: 960px)`]: {
                fontSize: '14px',
                lineHeight: '18px',
              },
            }
          }} 
        />

        <VideoSelection
          label={
            videoPercent === 100   ? 'Uploaded Successfully' :
            videoPercent > 0 ? `Uploading \u003A ${videoPercent}%`  :
            <Button  startIcon={<SaveAltIcon />}
              className="video-button"
              onClick={handleChoosethumbnail} >
                Choose Video
            </Button>
          }
          control={<InputBase type='file' id='thumbnail' 
          onChange={(e) => setVideo( e.target.files[0] ) }
          accept='video/*' ></InputBase>}
        >
        </VideoSelection>

      </DialogContent>
 
    </Dialog>
  )
}

export default Create
