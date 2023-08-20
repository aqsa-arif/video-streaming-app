const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

const signupUser = async (req, res) => {
  const {username, email, password} = req.body;

    try { 
  
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).send({ 
            success: false,
            errors: validationErrors.array()[0].msg 
          });
      }
  
      const existUser = await User.findOne({ username });
      if (existUser) {
        // bad request 
        return res.status(400).send({
          success: false,
          message: 'Username already exists',
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const user = new User({
         username, email , password: hash
      });
      await user.save();
  
      res.status(200).send({
        success: true,
        message: 'User signed up successfully',
      });
  
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      res.status(status).send({
        success: false,
        message,
      });
    }
};


const googleAuth = async (req, res) => { 
    try {  
      const savedUser = await User.findOne({ email: req.body.email });

      if (savedUser) { 
        const token = jwt.sign({userId: savedUser._id}, process.env.JWT_SECRETKEY); 
        res.setHeader("auth-token", token).status(200).send({
          success: true,
          message: 'Login successfully',
          savedUser, 
        }); 
      }
      else{ 
          const existUser = await User.findOne({ username: req.body.username });
          if (existUser) { 
            return res.status(400).send({
              success: false,
              message: 'Username already exists',
            });
          }
          const newUser = new User({ 
            ...req.body,
            fromgoogle: true
          });
          const savedUser = await newUser.save(); 

          const token = jwt.sign({userId: savedUser._id}, process.env.JWT_SECRETKEY); 
          res.setHeader("auth-token", token).status(200).send({ 
            success: true,
            message: 'Login successfully',
            savedUser
          });
      }

    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      res.status(status).send({
        success: false,
        message,
      });
    }
};


const loginUser = async (req, res) => {
  try {
    const { username,  password } = req.body;

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).send({ 
          success: false,
          errors: validationErrors.array()[0].msg 
        });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Username or Password is incorrect',
      });
    }

    const comparePass = await bcrypt.compare(password, user.password );
    if(!comparePass)  return  res.status(401).send({
      success: false,
      message:  'Username or Password is incorrect',
    });

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRETKEY); 

    res.setHeader("auth-token", token).status(200).send({
      success: true,
      message: 'Login successfully',
      user,  
    });

  } catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
      success: false,
      message,
    });
  }
}


module.exports = { signupUser, loginUser, googleAuth };