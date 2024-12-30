import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import profile from '../../../assets/profile.png';
import './Header.scss';

export default function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <>
      <div className="dashboardHeader">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
              <i className="bi bi-list"></i>
              </button>
              {/*<form action="">*/}
              {/*  <div className="input-group">*/}
              {/*    <i className="bi bi-search"></i>*/}
              {/*    <input type="text" className="form-control" placeholder="Search"/>*/}
              {/*  </div>*/}
              {/*</form>*/}
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="profilebox col">
                  <img src={profile} alt="" />
                  <h6>Peter Web</h6>
                </div>
                <div className="notificationBox col">
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0831 7.77337C13.5331 5.61171 16.0381 3.33337 19.9997 3.33337C23.9614 3.33337 26.4664 5.61171 27.9164 7.77337C28.8741 9.22525 29.5707 10.8333 29.9747 12.525L32.5331 25.715C32.6734 26.4388 32.6519 27.1847 32.4702 27.8992C32.2885 28.6137 31.951 29.2792 31.4819 29.8479C31.0128 30.4167 30.4238 30.8747 29.7569 31.1892C29.0901 31.5036 28.362 31.6667 27.6247 31.6667H12.3747C11.6375 31.6667 10.9094 31.5036 10.2425 31.1892C9.57569 30.8747 8.98664 30.4167 8.51756 29.8479C8.04849 29.2792 7.711 28.6137 7.52928 27.8992C7.34755 27.1847 7.32608 26.4388 7.4664 25.715L10.0247 12.525C10.4286 10.8327 11.1252 9.22575 12.0831 7.77337Z" fill="#1F2122"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.1904 33.3334C14.6104 34.1334 15.2538 34.9717 16.2288 35.6117C17.2454 36.2784 18.5221 36.6667 20.0788 36.6667C21.6338 36.6667 22.9121 36.2784 23.9288 35.6117C24.9038 34.9717 25.5454 34.135 25.9671 33.3334H14.1904Z" fill="#1F2122"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M28.8217 3.82172C28.5093 4.13426 28.3337 4.55811 28.3337 5.00005C28.3337 5.44199 28.5093 5.86584 28.8217 6.17838C30.1984 7.55505 30.925 8.90505 31.7167 12.0717C31.8267 12.4977 32.1006 12.863 32.4788 13.0878C32.857 13.3126 33.3087 13.3788 33.7355 13.2719C34.1623 13.165 34.5295 12.8936 34.757 12.5171C34.9845 12.1405 35.0539 11.6892 34.95 11.2617C34.075 7.76172 33.1334 5.77838 31.1784 3.82172C30.8658 3.50927 30.442 3.33374 30 3.33374C29.5581 3.33374 29.1343 3.50927 28.8217 3.82172ZM11.1784 3.82172C11.4908 4.13426 11.6664 4.55811 11.6664 5.00005C11.6664 5.44199 11.4908 5.86584 11.1784 6.17838C9.80171 7.55505 9.07504 8.90505 8.28338 12.0717C8.17342 12.4977 7.89947 12.863 7.52129 13.0878C7.14311 13.3126 6.69137 13.3788 6.26459 13.2719C5.83781 13.165 5.47062 12.8936 5.2431 12.5171C5.01558 12.1405 4.94618 11.6892 5.05004 11.2617C5.92504 7.76172 6.86671 5.77838 8.82171 3.82172C9.13426 3.50927 9.5581 3.33374 10 3.33374C10.442 3.33374 10.8658 3.50927 11.1784 3.82172Z" fill="#1F2122"/>
                      </svg>
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Edit Profile</a></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
