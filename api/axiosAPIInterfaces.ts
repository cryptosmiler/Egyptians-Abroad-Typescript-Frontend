export interface SignupTypes {
	name: string
	email: string
	password: string
} 

export interface LoginTypes {
  email: string
  password: string
} 

export interface UserInfoTypes {
  name: string
  bio: string
  country: string
  city: string
  phone: string
  interested_in: string[]
  topics_of_interest: string[]
} 

export interface DirectMessageTypes {
  senderName: string
  senderEmail: string
  recipientName: string
  recipientEmail: string
  message: string
} 

export interface PostTypes {
  title: string
  body: string
} 

export interface CommentTypes {
  body: string
} 