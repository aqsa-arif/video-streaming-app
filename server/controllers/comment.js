const Comment = require('../models/Comment');

const getComments = async (req, res ) => { 
    try { 

        const comments = await Comment.find({ videoId: req.params.id });
        if(!comments) return res.status(400).send({
            success: false,
            message: "Comments not found for video",
        })
        res.status(200).send({
            success: true,
            comments
        })
  
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      res.status(status).send({
        success: false,
        message,
    })
   }    
}


const addcomment = async (req, res ) => {  
    try { 

        const comment = new Comment({ userId: req.user.userId , ...req.body });
        await comment.save();

        res.status(200).send({
            success: true,
            message: "Comment added successfully",
            comment
        })
  
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      res.status(status).send({
        success: false,
        message,
    })
   }    
}

const  deleteComment = async (req, res ) => { 
    try { 
    const comment = await Comment.findById(req.params.id);
    if(!comment) return  res.status(404).send({
        success: true,
        message: "Comment doesn't exist", 
    });

    if(comment.userId === req.user.userId || comment.videoId === req.user.userId ) {

        await Comment.findByIdAndDelete(req.params.id); 
        res.status(200).send({
            success: true,
            message:  "Comment deleted successfully"
        })
    }
    else{
        res.status(401).send({
            success: false,
            message: "You can only delete your comments",
        })
    }    
  } 
  catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        success: false,
        message,
    })
  }
}

module.exports = {addcomment, getComments, deleteComment };