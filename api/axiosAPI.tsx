import axios from 'axios'
import {
  SignupTypes,
  LoginTypes,
  UserInfoTypes,
  DirectMessageTypes,
  PostTypes,
  CommentTypes,
} from './axiosAPIInterfaces'

let token: string | null = ''
// this code because Next.js don't give access to window object in SSR mode.
if (typeof window !== 'undefined') {
  token = window.localStorage.getItem('EgAbroadToken')
  // here we can access window object
}

const getBaseUrl = () => {
  // return 'http://localhost:5000'
  return 'https://egyptians-abroad-backend.herokuapp.com'
}

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

export default {
  user: {
    signup(payload: SignupTypes) {
      return apiClient.post('/users/signup', payload)
    },
    login(payload: LoginTypes) {
      return apiClient.post('/users/login', payload)
    },
    getMyUserInfo() {
      return apiClient.get('/users/me')
    },
    getOtherUserInfo(userId: string) {
      return apiClient.get(`/users/${userId}`)
    },
    updateMyUserInfo(payload: UserInfoTypes) {
      return apiClient.patch('/users/me', payload)
    },
    uploadMyUserAvatar(payload: FormData) {
      return apiClient.post('/users/me/avatar', payload)
    },
    getUserAvatar(userId: string) {
      return `${getBaseUrl()}/users/${userId}/avatar`
    },
    logout() {
      return apiClient.post('/users/logout')
    },
    sendDirectMessage(payload: DirectMessageTypes) {
      return apiClient.post(`/users/message`, payload)
    },
  },
  post: {
    addNewPost(payload: PostTypes) {
      return apiClient.post('/posts/new', payload)
    },
    getMyUserPosts(limit: number, skip: number) {
      return apiClient.get(
        `/posts/me?limit=${limit}&skip=${skip}&sortBy=createdAt:desc`
      )
    },
    getAllPosts(limit: number, skip: number) {
      return apiClient.get(
        `/posts?limit=${limit}&skip=${skip}&sortBy=createdAt:desc`
      )
    },
    getOnePost(postId: string) {
      return apiClient.get(`/posts/${postId}`)
    },
  },
  comment: {
    addNewComment(postId: string, payload: CommentTypes) {
      return apiClient.post(`/comments/${postId}/new`, payload)
    },
    getPostComments(postId: string, limit: number, skip: number) {
      return apiClient.get(
        `/comments?postId=${postId}&limit=${limit}&skip=${skip}&sortBy=createdAt:asc`
      )
    },
  },
}
