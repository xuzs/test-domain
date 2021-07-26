import UserService from '@/domain/user/services/userService';

import reportWebVitals from './reportWebVitals';

import './index.css';

import Application from './Application';

new Application().init();

console.log(UserService);

new UserService();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
