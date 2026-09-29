import axios from "axios";
import { fetchCookie } from "./utils";


const user = fetchCookie('user');
const token = user ? JSON.parse(user).token : ''
const orgIdObj = fetchCookie('orgId');
const orgId = orgIdObj ? JSON.parse(orgIdObj).id : '';

console.log('User',user,'orgId',orgIdObj,'teamId',fetchCookie('teamId'))

const instance = axios.create({
    baseURL: 'https://bczvmujdzj.us-east-1.awsapprunner.com'
})

instance.defaults.headers.common['Authorization'] = 'Bearer '+ token;
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['orgId'] = orgId;

export default instance;