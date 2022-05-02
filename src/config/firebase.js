const BASEURL = 'https://identitytoolkit.googleapis.com/v1';
const API_KEY = 'AIzaSyAhBVAF7ZDsF-JMDlSwjCbbkXb_DPaMwP0';
export const VERIFY_EMAIL_URL = `${BASEURL}/accounts:sendOobCode?key=${API_KEY}`;
export const SIGNIN_URL = `${BASEURL}/accounts:signInWithPassword?key=${API_KEY}`;
export const SIGNUP_URL = `${BASEURL}/accounts:signUp?key=${API_KEY}`;
