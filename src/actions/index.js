import axios from 'axios';

export const USER_LOGIN = 'user_login';

const LOGIN_URL = 'http://localhost:3005/user/login' 


export function userLogin(){
    return {
        type: USER_LOGIN,
        payload: {login: true}
      };
}