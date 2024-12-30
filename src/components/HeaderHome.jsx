import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../App.scss';
import '../assets/theme.css';
import {base_url, convertUtcToLocalTime} from '../Redux/Utils/helper';
import { useDispatch } from 'react-redux';
import {getListOfAllNotifications} from "../Redux/Reducers/notificationSlice.js";
import useNotificationSelector from "../Redux/Selectors/useNotificationSelector.js";
import defaultImg from '../assets/default.jpg'

export default function HeaderHome() {
  const dispatch = useDispatch();
  const userstorage = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const {notifications, isLoading, isError, isSuccess, errorMessage} = useNotificationSelector();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };  
  const [user, setUser] = useState(null);

  useEffect(()=>{
    if (user) {
      dispatch(getListOfAllNotifications());
    }
  }, [user]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    // console.log(user);
  }, []);

  const renderNotifications = (notifications) => {
    if (notifications) {
      if (notifications.length === 0) {
        return <li className="dropdown-item">No notifications</li>;
      } else {
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


  const handleLoginBtn = () => {
    if (localStorage.getItem('accessToken')){
      return(
          <div className='user'>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle notificationDropdown" type="button"
                      aria-expanded="false" onClick={handleNotificationsDropdownToggleClick}>
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
                      <img src={user.imageUrl!=null ? `${base_url}/${user.imageUrl}` : defaultImg} alt=""/>
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
            <li><span><Link to={'/couple-login'} className='headerButtons' >COUPLES</Link></span>
            </li>
            <li><span><Link to={'/vendor-login'} className="headerButtons" >VENDORS</Link></span>
            </li>
          </>
      );
    }
  }
  const handleNavbarToggleClick = () => {
    const navbarCollapse = document.querySelector('.collapse');
    if (navbarCollapse) {
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
  // Attach the event listener on component mount and detach it on unmount
  // useEffect(() => {
  //   document.addEventListener('click', handleNavbarToggleClick);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     document.removeEventListener('click', handleNavbarToggleClick);
  //   };
  // }, []);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <>
        <header className={`header ${isSticky ? 'sticky' : ''}`}>
          <div id="logo">
            <Link to={'/'} title="Sparker - Directory and listings template">
              <h3>WEDSTIMATE.COM</h3>
            </Link>
          </div>
          <button className="navbar-toggler d-sm-block d-md-none" type="button" onClick={handleNavbarToggleClick}>
            <span className="navbar-toggler-icon"><i className="bi bi-list" style={{fontSize: '22px'}}></i></span>
          </button>
          <nav id="menu" className="main-menu collapse navbar-collapse">
              <ul>
                {/* {!userstorage.isVendor ?
                  <li><span><Link to={'/categories/build-wedding'} >Categories</Link></span>
                  </li>
                :
                  <li><span><Link to={'/categories/vendor/dashboard'} >Dashboard</Link></span>
                  </li>
                } */}
                  {categoriesButton()}
                  <li className='divider'></li>
                  <li><span><Link to={'/blog'} >Blog</Link></span>
                  </li>
                  <li className='divider'></li>
                  <li><span><Link to={'/contact-us'} >Contact</Link></span>
                  </li>
                  {/* <li><span><Link to={'/couple-login'} className='headerButtons' href="#" >COUPLES</Link></span>
                  </li>
                  <li><span><Link to={'/vendor-login'} className="headerButtons" href="#" >VENDORS</Link></span>
                  </li> */}
                  {handleLoginBtn()}
              </ul>
          </nav>
        </header>
    </>
  )
}
