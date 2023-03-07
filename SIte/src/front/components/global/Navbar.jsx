import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

import { LogOut, reset } from "../../../features/atuhSliceFront";

function Header() {

  const [openedDrawer, setOpenedDrawer] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/backend");
  };
  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            <ul className="navbar-nav me-auto mb-lg-0">
            {user  === null && (
              <li className="nav-item">
                <Link to="/" className="nav-link" replace onClick={changeNav}>
                  Explore
                </Link>
              </li>
            )}
            {user  !== null && (
              <>
              <li className="nav-item">
                <Link to="/" className="nav-link" replace onClick={changeNav}>
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/penawaran" className="nav-link" replace onClick={changeNav}>
                Riwayat penawaran
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/menang" className="nav-link" replace onClick={changeNav}>
                  Riwayat Menang Lelang
                </Link>
              </li>
              <li className="nav-item">
              <Link  className="nav-link" 
                  to={`/edit/${user.id}`}
                >
                 Edit
                </Link>
              </li>
              <li className="nav-item">
              <Link  className="nav-link" 
                  to={`/change/${user.id}`}
                >
                 Change Password
                </Link>
              </li>
              </>
                )}
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
                >  
                {user  === null && (
                    <div>
                  <li>
                    <Link to="/login" className="dropdown-item" onClick={changeNav}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="dropdown-item" onClick={changeNav}>
                      Sign Up
                    </Link>
                    </li>
                    </div>
              )}
                {user  !== null && (
                  <li>
                    <Link to="/" className="dropdown-item" onClick={logout}>
                      Logout
                    </Link>
                  </li>    
              )}
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
