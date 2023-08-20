const User = require("../models/User");


const getUser = async (req, res ) => {  
    try {   
        const user = await User.findById(req.params.userId);
        if(!user) return res.status(400).send({
            success: false,
            message: "User doesn't exist",
        })
        res.status(200).send({
            success: true,
            user
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


const updateUser = async (req, res ) => { 
    try { 
        if(req.params.id === req.user.userId ) {
            const user = await User.findByIdAndUpdate(
                req.params.id, 
                {   $set:  req.body  },   //update specific fields
                { new:  true   },
            ); 
    
            res.status(200).send({
                success: true,
                message: "User updated Successfully",
                user
            }) 
        }
        else{
            res.status(401).send({
                success: true,
                message: "You can only update your account", 
            }) 
        }
  
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      res.status(status).send({
        success: false,
        message,
    })
   }    
}


const deleteUser = async (req, res ) => { 
    try { 
        if(req.params.id === req.user.userId ) {
           await User.findByIdAndDelete(req.params.id); 
    
            res.status(200).send({
                success: true,
                message: "User deleted Successfully", 
            }) 
        }
        else{
            res.status(401).send({
                success: true,
                message: "You can only delete your account", 
            }) 
        }
  
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      res.status(status).send({
        success: false,
        message,
    })
   }    
}
 

const subscribe = async (req, res ) => {  
    try {  

        await User.findByIdAndUpdate(
            req.params.id,
            {  $inc : {  subscribers:  1  }},  
        )

        await User.findByIdAndUpdate(
            req.user.userId, 
            {   $push : { subscribedusers:  req.params.userId  } },  
        )
    
        res.status(200).send({
            success: true,
            message: "Subscribed Successfully", 
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


const unsubscribe = async (req, res ) => { 
    try {  

        await User.findByIdAndUpdate(
            req.params.id,
            {  $inc : {  subscribers:  -1  }},  
        )

        await User.findByIdAndUpdate(
            req.user.userId, 
            {   $pull : { subscribedusers:  req.params.userId  } },  
        )
    
        res.status(200).send({
            success: true,
            message: "Unsubscribed Successfully", 
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
 

module.exports = { getUser, updateUser, deleteUser, subscribe, unsubscribe };