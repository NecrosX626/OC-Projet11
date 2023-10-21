import { Link } from "react-router-dom";
import mainLogo from "../assets/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, selectToken, logout } from "../features/userSlice";

function Nav() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const token = useSelector(selectToken)

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={mainLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {token ? (
        <div>
          <Link className="main-nav-item" to="/user">
            <i className="fa fa-user-circle"></i>
            {" " + profile?.userName}
          </Link>
          <Link
            className="main-nav-item"
            to="/"
            onClick={() => dispatch(logout())}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
