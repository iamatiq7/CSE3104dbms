import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    window.user = undefined;
    window.isLoggedin = false;
    navigate('/', { replace: true });
  };

  return (
    <button className="btn" type="button" onClick={() => logout()}>
      Logout
    </button>
  );
}

export default LogoutButton;
