import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../api';
import { useNavigate } from 'react-router-dom';
import styles from './GoogleLogin.module.css';

function GoogleLogin() {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { token, user } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error while requesting google code:", error);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })

  return (
    <div className={styles.centre}>
      <h1 >Google Login</h1>
      <button onClick={googleLogin} >Login with Google</button>
    </div>
  )
}

export default GoogleLogin