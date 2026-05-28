import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <button onClick={() => navigate('/login')}>Back to Login</button>
    </div>
  )
}

export default NotFoundPage