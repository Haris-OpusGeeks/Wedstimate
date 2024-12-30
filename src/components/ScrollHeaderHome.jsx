import { Link, useNavigate } from 'react-router-dom';
import '../App.scss';
import '../assets/theme.css';
import { useEffect, useState } from 'react';
import {base_url, convertUtcToLocalTime} from '../Redux/Utils/helper';
import {getListOfAllNotifications} from "../Redux/Reducers/notificationSlice.js";
import {useDispatch} from "react-redux";
import useNotificationSelector from "../Redux/Selectors/useNotificationSelector.js";
import defaultImg from '../assets/default.jpg'

export default function HeaderHomeScrolled() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {notifications, isLoading, isError, isSuccess, errorMessage} = useNotificationSelector();

  useEffect(() => {
    // Load user data from local storage and set state
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    setUser(userData);
  }, []);

  useEffect(()=>{
    if (user && localStorage.getItem('accessToken')) {
      dispatch(getListOfAllNotifications());
      console.log(notifications);
    }
  }, [user]);


  const renderNotifications = (notifications) => {
    if (notifications) {
      if (notifications.length === 0) {
        return <li className="dropdown-item">No notifications</li>;
      } else if (notifications.length >= 0) {
        return notifications.map((notification, index) => (
            <li key={index} className="dropdown-item">
              <Link to={`/categories/chat/${notification.typeId}`}>
                <div className="notification-item">
                  <img src={notification.imageUrl ? `${base_url}/${notification.imageUrl}` : defaultImg} alt="Notification" className="notification-image" />
                  <div className="notification-content">
                    <h6>{notification.title}</h6>
                    <p>{notification.description}</p>
                    <span>{convertUtcToLocalTime(notification.date).toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            </li>
        ));
      }
    } else {
      return <li className="dropdown-item">No notifications</li>;
    }

  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null); // Clear user state
    navigate('/');
    window.location.reload();
    // Perform any additional logout logic
  };

  const handleLoginBtn = () => {
    if (localStorage.getItem('accessToken')) {
      return (
          <div className='user'>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle notificationDropdown" type="button" aria-expanded="false" onClick={handleNotificationsDropdownToggleClick}>
                <i className="bi bi-bell"></i>
              </button>
              <ul className="dropdown-menu notificationDropdownMenu">
                {renderNotifications(notifications)}
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle userDropdown" type="button" aria-expanded="false"
                      onClick={handleUserDropdownToggleClick}>
                {user && user.firstName ? (
                    <div className="d-flex">
                      <img src={user.imageUrl != null ? `${base_url}/${user.imageUrl}` : defaultImg} alt=""/>
                      <h6>{user.firstName}</h6>
                    </div>
                ) : (
                    <p>User Not Found</p>
                )}
              </button>
              <ul className="dropdown-menu userDropdownMenu">
                <li><Link className="dropdown-item" to={'/edit-profile'} >Edit Profile</Link></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                </li>
              </ul>
            </div>
          </div>
      );
    } else {
      return (
          <>
            <li><span><Link to={'/couple-login'} className='headerButtons' >COUPLES</Link></span></li>
            <li><span><Link to={'/vendor-login'} className="headerButtons" >VENDORS</Link></span></li>
          </>
      );
    }
  };

  const handleClick = (event) => {
    const navbarCollapse = document.querySelector('.collapse');
    if (navbarCollapse && event.target.closest('.navbar-toggler')) {
      navbarCollapse.classList.toggle('show');
    }
  };

  const handleUserDropdownToggleClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the navbar toggle
    const dropdownMenu = document.querySelector('.userDropdownMenu');
    const dropdownBtn = document.querySelector('.userDropdown');
    if (dropdownBtn) {
      dropdownBtn.classList.toggle('show');
      dropdownMenu.classList.toggle('show');
    }
  };

  const handleNotificationsDropdownToggleClick = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the navbar toggle
    const dropdownMenu = document.querySelector('.notificationDropdownMenu');
    const dropdownBtn = document.querySelector('.notificationDropdown');
    if (dropdownBtn) {
      dropdownBtn.classList.toggle('show');
      dropdownMenu.classList.toggle('show');
    }
  };

  const categoriesButton = () => {
    // Check if user exists and userName is "root.admin"
    if (user && user.userName === "root.admin") {
      return null; // Do not render anything for the admin user
    }

    // Check if user exists, is a vendor, and is not admin
    if (user && user.isVendor) {
      return (
          <li>
        <span>
          <Link to={'/categories/vendor/dashboard'}>Dashboard</Link>
        </span>
          </li>
      );
    }

    // Default case for non-vendor users
    return (
        <li>
      <span>
        <Link to={'/categories/build-wedding'}>Categories</Link>
      </span>
        </li>
    );
  };


  return (
    <header className="sticky">
      <div id="logo">
        <Link to={'/'} title="Wedstimate">
          <h3>WEDSTIMATE.COM</h3>
        </Link>
      </div>
      <button className="navbar-toggler d-sm-block d-md-none" type="button" onClick={handleClick}>
        <span className="navbar-toggler-icon">
          <i className="bi bi-list" style={{ fontSize: '22px' }}></i>
        </span>
      </button>
      <nav className="main-menu collapse navbar-collapse" id="menu">
        <ul>
          {categoriesButton()}
          <li className='divider'></li>
          <li><span><Link to={'/blog'} >Blog</Link></span></li>
          <li className='divider'></li>
          <li><span><Link to={'/contact-us'} >Contact</Link></span></li>
          {handleLoginBtn()}
        </ul>
      </nav>
    </header>
  );
}
