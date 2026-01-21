import express from 'express'
import { getUserProfile, loginUser, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

//PROTECT route as token will be required
userRouter.post('/profile', protect, getUserProfile)

export default userRouter
