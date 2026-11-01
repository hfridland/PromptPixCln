
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { authApi } from '../services/authApi';

function Header() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state) => state.auth.token !== null
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            PromptPix
          </span>

          <button
            type="button"
            className="btn btn-outline-light"
            disabled={!isLoggedIn}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
