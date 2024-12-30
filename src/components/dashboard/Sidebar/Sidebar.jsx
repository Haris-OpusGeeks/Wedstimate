import React from 'react'
import logo from '../../../assets/logo white.png';
import './Sidebar.scss';
import {Link, useLocation, useNavigate} from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const isPartiallyActive = (path) => {
    return location.pathname.includes(path) ? 'nav-link active' : 'nav-link';
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (window.innerWidth>1028){
    return (
      <>
        <div className="sidebar">
          <div className="logoDiv">
            <Link to={'/'}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="sidebarMenu">
            <div className="nav flex-column nav-pills me-3" >
                <Link to={'/dashboard'} className={isActive('/dashboard')} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.524 22C16.777 22 17.852 21.934 18.751 21.735C19.661 21.532 20.449 21.18 21.065 20.565C21.68 19.949 22.032 19.161 22.235 18.251C22.435 17.352 22.5 16.277 22.5 15.024V12C22.5 11.4696 22.2893 10.9609 21.9142 10.5858C21.5391 10.2107 21.0304 10 20.5 10H12.5C11.9696 10 11.4609 10.2107 11.0858 10.5858C10.7107 10.9609 10.5 11.4696 10.5 12V20C10.5 20.5304 10.7107 21.0391 11.0858 21.4142C11.4609 21.7893 11.9696 22 12.5 22H15.524ZM2.5 15.024C2.5 16.277 2.566 17.352 2.766 18.251C2.968 19.161 3.32 19.949 3.936 20.565C4.551 21.18 5.339 21.532 6.249 21.735C6.336 21.754 6.424 21.772 6.512 21.789C7.596 21.999 8.5 21.081 8.5 19.976V12C8.5 11.4696 8.28929 10.9609 7.91421 10.5858C7.53914 10.2107 7.03043 10 6.5 10H4.5C3.96957 10 3.46086 10.2107 3.08579 10.5858C2.71071 10.9609 2.5 11.4696 2.5 12V15.024ZM9.476 2C8.223 2 7.148 2.066 6.249 2.266C5.339 2.468 4.551 2.82 3.935 3.436C3.32 4.051 2.968 4.839 2.765 5.749C2.749 5.824 2.733 5.899 2.719 5.974C2.504 7.073 3.439 8 4.559 8H20.476C21.581 8 22.499 7.096 22.289 6.012C22.2719 5.92409 22.2535 5.83641 22.234 5.749C22.032 4.839 21.68 4.051 21.064 3.435C20.449 2.82 19.661 2.468 18.751 2.265C17.852 2.065 16.777 2 15.524 2H9.476Z" fill="white" fillOpacity="1"/>
                  </svg>
                  Dashboard</Link>
                <Link to={'/dashboard/vendors'} className={isPartiallyActive('/dashboard/vendors')} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.5 12.934V15.066C22.5 15.952 22.5 16.716 22.418 17.328C22.33 17.983 22.131 18.612 21.621 19.121C21.111 19.631 20.483 19.83 19.828 19.918C19.216 20 18.452 20 17.566 20H11.434C10.548 20 9.784 20 9.172 19.918C8.517 19.83 7.888 19.631 7.379 19.121C6.869 18.611 6.67 17.983 6.582 17.328C6.5 16.716 6.5 15.952 6.5 15.066V12.934C6.5 12.048 6.5 11.284 6.582 10.672C6.67 10.017 6.869 9.388 7.379 8.879C7.889 8.369 8.517 8.17 9.172 8.082C9.784 8 10.548 8 11.434 8H17.566C18.452 8 19.216 8 19.828 8.082C20.483 8.17 21.112 8.369 21.621 8.879C22.131 9.389 22.33 10.017 22.418 10.672C22.5 11.284 22.5 12.048 22.5 12.934ZM11.5 14C11.5 13.606 11.5776 13.2159 11.7284 12.8519C11.8791 12.488 12.1001 12.1573 12.3787 11.8787C12.6573 11.6001 12.988 11.3791 13.3519 11.2284C13.7159 11.0776 14.106 11 14.5 11C14.894 11 15.2841 11.0776 15.6481 11.2284C16.012 11.3791 16.3427 11.6001 16.6213 11.8787C16.8999 12.1573 17.1209 12.488 17.2716 12.8519C17.4224 13.2159 17.5 13.606 17.5 14C17.5 14.7956 17.1839 15.5587 16.6213 16.1213C16.0587 16.6839 15.2956 17 14.5 17C13.7044 17 12.9413 16.6839 12.3787 16.1213C11.8161 15.5587 11.5 14.7956 11.5 14Z" fill="white" fillOpacity="1"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.497 7.004C18.21 7 17.917 7 17.619 7H11.38C10.537 7 9.71699 7 9.03799 7.091C8.27199 7.194 7.39799 7.445 6.67099 8.171C5.94399 8.898 5.69299 9.773 5.59099 10.539C5.49999 11.218 5.49999 12.037 5.49999 12.881V15.119C5.49999 15.412 5.49999 15.702 5.50399 15.984C5.44127 15.9812 5.3786 15.9775 5.31599 15.973C4.94299 15.943 4.57099 15.88 4.20899 15.708C3.58803 15.4118 3.08775 14.9112 2.79199 14.29C2.61999 13.93 2.55599 13.557 2.52699 13.184C2.5027 12.7578 2.4937 12.3309 2.49999 11.904V8.934C2.49999 8.048 2.49999 7.284 2.58199 6.672C2.66999 6.017 2.86899 5.388 3.37899 4.879C3.88899 4.369 4.51699 4.17 5.17199 4.082C5.78399 4 6.54799 4 7.43399 4H15.039C15.461 4 15.824 4 16.148 4.07C16.7061 4.19354 17.2173 4.47396 17.6214 4.87824C18.0255 5.28252 18.3057 5.79384 18.429 6.352C18.474 6.552 18.49 6.768 18.497 7.004Z" fill="white" fillOpacity="1"/>
                  </svg>
                  Vendor</Link>
                <Link  to={'/dashboard/couples'} className={isPartiallyActive('/dashboard/couples')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 22H5.5C4.70435 22 3.94129 21.6839 3.37868 21.1213C2.81607 20.5587 2.5 19.7956 2.5 19V5C2.5 4.20435 2.81607 3.44129 3.37868 2.87868C3.94129 2.31607 4.70435 2 5.5 2H20.5C21.2956 2 22.0587 2.31607 22.6213 2.87868C23.1839 3.44129 23.5 4.20435 23.5 5V19C23.5 19.7956 23.1839 20.5587 22.6213 21.1213C22.0587 21.6839 21.2956 22 20.5 22H14.5ZM5.67 20C5.56 19.687 5.5 19.35 5.5 19V5C5.5 4.65 5.56 4.313 5.67 4H5.5C5.23478 4 4.98043 4.10536 4.79289 4.29289C4.60536 4.48043 4.5 4.73478 4.5 5V19C4.5 19.2652 4.60536 19.5196 4.79289 19.7071C4.98043 19.8946 5.23478 20 5.5 20H5.67ZM9.5 8.015C9.49974 7.88368 9.52534 7.75359 9.57535 7.63216C9.62537 7.51074 9.69881 7.40035 9.79148 7.30731C9.88415 7.21426 9.99424 7.14038 10.1155 7.08989C10.2367 7.03939 10.3667 7.01326 10.498 7.013L18.498 7C18.7632 6.99947 19.0178 7.10432 19.2057 7.29148C19.3936 7.47864 19.4995 7.73278 19.5 7.998C19.5005 8.26322 19.3957 8.51778 19.2085 8.70569C19.0214 8.8936 18.7672 8.99947 18.502 9L10.502 9.013C10.3707 9.01326 10.2406 8.98766 10.1192 8.93764C9.99774 8.88763 9.88735 8.81419 9.79431 8.72152C9.70126 8.62885 9.62738 8.51876 9.57689 8.39753C9.52639 8.27631 9.50026 8.14632 9.5 8.015ZM9.5 12.027C9.49973 11.762 9.6047 11.5076 9.79183 11.32C9.97896 11.1323 10.233 11.0265 10.498 11.026L18.498 11.013C18.7632 11.0125 19.0178 11.1173 19.2057 11.3045C19.3936 11.4916 19.4995 11.7458 19.5 12.011C19.5005 12.2762 19.3957 12.5308 19.2085 12.7187C19.0214 12.9066 18.7672 13.0125 18.502 13.013L10.502 13.026C10.3707 13.0263 10.2406 13.0007 10.1192 12.9506C9.99774 12.9006 9.88735 12.8272 9.79431 12.7345C9.70126 12.6418 9.62738 12.5318 9.57689 12.4105C9.52639 12.2893 9.50026 12.1583 9.5 12.027ZM9.5 16.027C9.49973 15.762 9.6047 15.5076 9.79183 15.32C9.97896 15.1323 10.233 15.0265 10.498 15.026L18.498 15.013C18.7632 15.0125 19.0178 15.1173 19.2057 15.3045C19.3936 15.4916 19.4995 15.7458 19.5 16.011C19.5005 16.2762 19.3957 16.5308 19.2085 16.7187C19.0214 16.9066 18.7672 17.0125 18.502 17.013L10.502 17.026C10.3707 17.0263 10.2406 17.0007 10.1192 16.9506C9.99774 16.9006 9.88735 16.8272 9.79431 16.7345C9.70126 16.6418 9.62738 16.5318 9.57689 16.4105C9.52639 16.2893 9.50026 16.1583 9.5 16.027Z" fill="white" fillOpacity="1"/>
                  </svg>
                  Couples</Link>
                {/*<Link className="nav-link" >*/}
                {/*  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">*/}
                {/*    <path fillRule="evenodd" clipRule="evenodd" d="M10.707 10.2929C10.6148 10.1974 10.5044 10.1212 10.3824 10.0688C10.2604 10.0164 10.1292 9.98879 9.9964 9.98764C9.86362 9.98648 9.73194 10.0118 9.60905 10.0621C9.48615 10.1123 9.3745 10.1866 9.28061 10.2805C9.18671 10.3744 9.11246 10.486 9.06218 10.6089C9.0119 10.7318 8.9866 10.8635 8.98775 10.9963C8.9889 11.1291 9.01649 11.2603 9.0689 11.3823C9.12131 11.5043 9.19749 11.6146 9.293 11.7069L11.086 13.4999L9.293 15.2929C9.19749 15.3851 9.12131 15.4955 9.0689 15.6175C9.01649 15.7395 8.9889 15.8707 8.98775 16.0035C8.9866 16.1363 9.0119 16.2679 9.06218 16.3908C9.11246 16.5137 9.18671 16.6254 9.28061 16.7193C9.3745 16.8132 9.48615 16.8874 9.60905 16.9377C9.73194 16.988 9.86362 17.0133 9.9964 17.0121C10.1292 17.011 10.2604 16.9834 10.3824 16.931C10.5044 16.8786 10.6148 16.8024 10.707 16.7069L12.5 14.9139L14.293 16.7069C14.4816 16.889 14.7342 16.9898 14.9964 16.9876C15.2586 16.9853 15.5094 16.8801 15.6948 16.6947C15.8802 16.5093 15.9854 16.2585 15.9877 15.9963C15.99 15.7341 15.8892 15.4815 15.707 15.2929L13.914 13.4999L15.707 11.7069C15.8892 11.5183 15.99 11.2657 15.9877 11.0035C15.9854 10.7413 15.8802 10.4905 15.6948 10.3051C15.5094 10.1197 15.2586 10.0145 14.9964 10.0122C14.7342 10.0099 14.4816 10.1107 14.293 10.2929L12.5 12.0859L10.707 10.2929ZM12.982 1.99989C13.661 1.99889 14.263 1.99789 14.82 2.22789C15.376 2.45789 15.801 2.88589 16.28 3.36589C17.23 4.31889 18.181 5.26989 19.134 6.21889C19.614 6.69889 20.041 7.12389 20.272 7.67989C20.502 8.23689 20.502 8.83989 20.5 9.51789C20.496 12.0339 20.5 14.5499 20.5 17.0659C20.5 17.9519 20.5 18.7159 20.418 19.3279C20.33 19.9829 20.131 20.6119 19.621 21.1209C19.111 21.6309 18.483 21.8299 17.828 21.9179C17.216 21.9999 16.452 21.9999 15.566 21.9999H9.434C8.548 21.9999 7.784 21.9999 7.172 21.9179C6.517 21.8299 5.888 21.6309 5.379 21.1209C4.869 20.6109 4.67 19.9829 4.582 19.3279C4.5 18.7159 4.5 17.9519 4.5 17.0659V6.93389C4.5 6.04789 4.5 5.28389 4.582 4.67189C4.67 4.01689 4.869 3.38789 5.379 2.87889C5.889 2.36889 6.517 2.16989 7.172 2.08189C7.784 1.99989 8.548 1.99989 9.434 1.99989C10.617 1.99989 11.799 2.00189 12.982 1.99989Z" fill="white" fillOpacity="1"/>*/}
                {/*  </svg>*/}
                {/*  Settings</Link>*/}
                <Link className={isPartiallyActive('/dashboard/blog')} to={'/dashboard/blog'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M11.5 19.5H17.2C16.61 20.97 15.18 22 13.5 22H6.5C4.29 22 2.5 20.21 2.5 18V10C2.5 7.96 4.03 6.28003 6 6.03003V14C6 17.03 8.47 19.5 11.5 19.5ZM20 6.25H22.12C22.06 6.16 21.99 6.08 21.91 6L18.5 2.59009C18.42 2.51009 18.34 2.43989 18.25 2.38989V4.5C18.25 5.46 19.04 6.25 20 6.25ZM20 7.75C18.21 7.75 16.75 6.29 16.75 4.5V2H11.5C9.29 2 7.5 3.79 7.5 6V14C7.5 16.21 9.29 18 11.5 18H18.5C20.71 18 22.5 16.21 22.5 14V7.75H20Z" fill="white" fillOpacity="1"/>
                  </svg>
                  Blogs</Link>
                <Link className={isPartiallyActive('/dashboard/packages')} to={'/dashboard/packages'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M7.75 10.2505C7.75 9.83649 8.086 9.50049 8.5 9.50049H16.5C16.914 9.50049 17.25 9.83649 17.25 10.2505C17.25 10.6645 16.914 11.0005 16.5 11.0005H8.5C8.086 11.0005 7.75 10.6645 7.75 10.2505ZM9.5 8.00049H15.5C15.914 8.00049 16.25 7.66449 16.25 7.25049C16.25 6.83649 15.914 6.50049 15.5 6.50049H9.5C9.086 6.50049 8.75 6.83649 8.75 7.25049C8.75 7.66449 9.086 8.00049 9.5 8.00049ZM22.5 13.7375V16.2505C22.5 18.7315 20.481 20.7505 18 20.7505H7C4.519 20.7505 2.5 18.7315 2.5 16.2505V13.7375C2.5 13.3055 2.56902 12.8794 2.70502 12.4714L4.64001 6.66846C5.32201 4.62346 7.228 3.24951 9.383 3.24951H15.617C17.772 3.24951 19.679 4.62346 20.36 6.66846L22.295 12.4714C22.431 12.8794 22.5 13.3065 22.5 13.7375ZM4.72101 12.7505H9.5C9.776 12.7505 10 12.9745 10 13.2505C10 14.6295 11.122 15.7505 12.5 15.7505C13.878 15.7505 15 14.6295 15 13.2505C15 12.9745 15.224 12.7505 15.5 12.7505H20.279L18.463 7.30249C18.054 6.07449 16.91 5.25049 15.617 5.25049H9.383C8.09 5.25049 6.94599 6.07449 6.53699 7.30249L4.72101 12.7505Z" fill="white" fillOpacity="1"/>
                  </svg>
                  Packages</Link>
              </div>
          </div>
          {/*<div className="logoutBtn">*/}
          {/*  <button className="btn btn-primary"  type="button" onClick={handleLogout}>*/}
          {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">*/}
          {/*      <path fillRule="evenodd" clipRule="evenodd" d="M17.293 14.2931C17.1108 14.4817 17.01 14.7343 17.0123 14.9965C17.0146 15.2587 17.1198 15.5095 17.3052 15.6949C17.4906 15.8803 17.7414 15.9855 18.0036 15.9878C18.2658 15.99 18.5184 15.8892 18.707 15.7071L21.62 12.7941L21.664 12.7481C21.77 12.6544 21.8549 12.5393 21.9131 12.4104C21.9712 12.2814 22.0013 12.1415 22.0013 12.0001C22.0013 11.8586 21.9712 11.7188 21.9131 11.5898C21.8549 11.4609 21.77 11.3457 21.664 11.2521C21.6498 11.2363 21.6351 11.221 21.62 11.2061L18.707 8.29308C18.6148 8.19757 18.5044 8.12139 18.3824 8.06898C18.2604 8.01657 18.1292 7.98898 17.9964 7.98783C17.8636 7.98668 17.7319 8.01198 17.609 8.06226C17.4862 8.11254 17.3745 8.18679 17.2806 8.28069C17.1867 8.37458 17.1125 8.48623 17.0622 8.60913C17.0119 8.73202 16.9866 8.8637 16.9877 8.99648C16.9889 9.12926 17.0165 9.26048 17.0689 9.38249C17.1213 9.50449 17.1975 9.61483 17.293 9.70708L18.586 11.0001H13C12.7348 11.0001 12.4804 11.1054 12.2929 11.293C12.1054 11.4805 12 11.7349 12 12.0001C12 12.2653 12.1054 12.5197 12.2929 12.7072C12.4804 12.8947 12.7348 13.0001 13 13.0001H18.586L17.293 14.2931Z" fill="white" fillOpacity="1"/>*/}
          {/*      <path fillRule="evenodd" clipRule="evenodd" d="M5 2C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H14.5C15.163 22 15.7989 21.7366 16.2678 21.2678C16.7366 20.7989 17 20.163 17 19.5V16.733C16.5406 16.4676 16.2054 16.0306 16.0679 15.5182C15.9305 15.0057 16.0021 14.4597 16.267 14H13C12.4696 14 11.9609 13.7893 11.5858 13.4142C11.2107 13.0391 11 12.5304 11 12C11 11.4696 11.2107 10.9609 11.5858 10.5858C11.9609 10.2107 12.4696 10 13 10H16.267C16.1356 9.77245 16.0503 9.52122 16.016 9.26069C15.9817 9.00015 15.9991 8.73541 16.0671 8.4816C16.1352 8.22779 16.2526 7.98988 16.4127 7.78147C16.5728 7.57307 16.7723 7.39824 17 7.267V4.5C17 3.83696 16.7366 3.20107 16.2678 2.73223C15.7989 2.26339 15.163 2 14.5 2H5Z" fill="white" fillOpacity="1"/>*/}
          {/*    </svg>*/}
          {/*    Logout</button>*/}
          {/*</div>*/}
        </div>
      </>
    )
  } if (window.innerWidth<=1028) {
    return(
      <>
        <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header">
            <Link to={'/'}>
              <img src={logo} alt="" />
            </Link>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="sidebarMenu">
              <div className="nav flex-column nav-pills me-3" >
                  <Link to={'/dashboard'} className={isActive('/dashboard')} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.524 22C16.777 22 17.852 21.934 18.751 21.735C19.661 21.532 20.449 21.18 21.065 20.565C21.68 19.949 22.032 19.161 22.235 18.251C22.435 17.352 22.5 16.277 22.5 15.024V12C22.5 11.4696 22.2893 10.9609 21.9142 10.5858C21.5391 10.2107 21.0304 10 20.5 10H12.5C11.9696 10 11.4609 10.2107 11.0858 10.5858C10.7107 10.9609 10.5 11.4696 10.5 12V20C10.5 20.5304 10.7107 21.0391 11.0858 21.4142C11.4609 21.7893 11.9696 22 12.5 22H15.524ZM2.5 15.024C2.5 16.277 2.566 17.352 2.766 18.251C2.968 19.161 3.32 19.949 3.936 20.565C4.551 21.18 5.339 21.532 6.249 21.735C6.336 21.754 6.424 21.772 6.512 21.789C7.596 21.999 8.5 21.081 8.5 19.976V12C8.5 11.4696 8.28929 10.9609 7.91421 10.5858C7.53914 10.2107 7.03043 10 6.5 10H4.5C3.96957 10 3.46086 10.2107 3.08579 10.5858C2.71071 10.9609 2.5 11.4696 2.5 12V15.024ZM9.476 2C8.223 2 7.148 2.066 6.249 2.266C5.339 2.468 4.551 2.82 3.935 3.436C3.32 4.051 2.968 4.839 2.765 5.749C2.749 5.824 2.733 5.899 2.719 5.974C2.504 7.073 3.439 8 4.559 8H20.476C21.581 8 22.499 7.096 22.289 6.012C22.2719 5.92409 22.2535 5.83641 22.234 5.749C22.032 4.839 21.68 4.051 21.064 3.435C20.449 2.82 19.661 2.468 18.751 2.265C17.852 2.065 16.777 2 15.524 2H9.476Z" fill="white" fillOpacity="1"/>
                    </svg>
                    Dashboard</Link>
                  <Link to={'/dashboard/vendors'} className={isActive('/dashboard/vendors')} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M22.5 12.934V15.066C22.5 15.952 22.5 16.716 22.418 17.328C22.33 17.983 22.131 18.612 21.621 19.121C21.111 19.631 20.483 19.83 19.828 19.918C19.216 20 18.452 20 17.566 20H11.434C10.548 20 9.784 20 9.172 19.918C8.517 19.83 7.888 19.631 7.379 19.121C6.869 18.611 6.67 17.983 6.582 17.328C6.5 16.716 6.5 15.952 6.5 15.066V12.934C6.5 12.048 6.5 11.284 6.582 10.672C6.67 10.017 6.869 9.388 7.379 8.879C7.889 8.369 8.517 8.17 9.172 8.082C9.784 8 10.548 8 11.434 8H17.566C18.452 8 19.216 8 19.828 8.082C20.483 8.17 21.112 8.369 21.621 8.879C22.131 9.389 22.33 10.017 22.418 10.672C22.5 11.284 22.5 12.048 22.5 12.934ZM11.5 14C11.5 13.606 11.5776 13.2159 11.7284 12.8519C11.8791 12.488 12.1001 12.1573 12.3787 11.8787C12.6573 11.6001 12.988 11.3791 13.3519 11.2284C13.7159 11.0776 14.106 11 14.5 11C14.894 11 15.2841 11.0776 15.6481 11.2284C16.012 11.3791 16.3427 11.6001 16.6213 11.8787C16.8999 12.1573 17.1209 12.488 17.2716 12.8519C17.4224 13.2159 17.5 13.606 17.5 14C17.5 14.7956 17.1839 15.5587 16.6213 16.1213C16.0587 16.6839 15.2956 17 14.5 17C13.7044 17 12.9413 16.6839 12.3787 16.1213C11.8161 15.5587 11.5 14.7956 11.5 14Z" fill="white" fillOpacity="1"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.497 7.004C18.21 7 17.917 7 17.619 7H11.38C10.537 7 9.71699 7 9.03799 7.091C8.27199 7.194 7.39799 7.445 6.67099 8.171C5.94399 8.898 5.69299 9.773 5.59099 10.539C5.49999 11.218 5.49999 12.037 5.49999 12.881V15.119C5.49999 15.412 5.49999 15.702 5.50399 15.984C5.44127 15.9812 5.3786 15.9775 5.31599 15.973C4.94299 15.943 4.57099 15.88 4.20899 15.708C3.58803 15.4118 3.08775 14.9112 2.79199 14.29C2.61999 13.93 2.55599 13.557 2.52699 13.184C2.5027 12.7578 2.4937 12.3309 2.49999 11.904V8.934C2.49999 8.048 2.49999 7.284 2.58199 6.672C2.66999 6.017 2.86899 5.388 3.37899 4.879C3.88899 4.369 4.51699 4.17 5.17199 4.082C5.78399 4 6.54799 4 7.43399 4H15.039C15.461 4 15.824 4 16.148 4.07C16.7061 4.19354 17.2173 4.47396 17.6214 4.87824C18.0255 5.28252 18.3057 5.79384 18.429 6.352C18.474 6.552 18.49 6.768 18.497 7.004Z" fill="white" fillOpacity="1"/>
                    </svg>
                    Vendor</Link>
                  <Link to={'/dashboard/couples'} className='nav-link'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.5 22H5.5C4.70435 22 3.94129 21.6839 3.37868 21.1213C2.81607 20.5587 2.5 19.7956 2.5 19V5C2.5 4.20435 2.81607 3.44129 3.37868 2.87868C3.94129 2.31607 4.70435 2 5.5 2H20.5C21.2956 2 22.0587 2.31607 22.6213 2.87868C23.1839 3.44129 23.5 4.20435 23.5 5V19C23.5 19.7956 23.1839 20.5587 22.6213 21.1213C22.0587 21.6839 21.2956 22 20.5 22H14.5ZM5.67 20C5.56 19.687 5.5 19.35 5.5 19V5C5.5 4.65 5.56 4.313 5.67 4H5.5C5.23478 4 4.98043 4.10536 4.79289 4.29289C4.60536 4.48043 4.5 4.73478 4.5 5V19C4.5 19.2652 4.60536 19.5196 4.79289 19.7071C4.98043 19.8946 5.23478 20 5.5 20H5.67ZM9.5 8.015C9.49974 7.88368 9.52534 7.75359 9.57535 7.63216C9.62537 7.51074 9.69881 7.40035 9.79148 7.30731C9.88415 7.21426 9.99424 7.14038 10.1155 7.08989C10.2367 7.03939 10.3667 7.01326 10.498 7.013L18.498 7C18.7632 6.99947 19.0178 7.10432 19.2057 7.29148C19.3936 7.47864 19.4995 7.73278 19.5 7.998C19.5005 8.26322 19.3957 8.51778 19.2085 8.70569C19.0214 8.8936 18.7672 8.99947 18.502 9L10.502 9.013C10.3707 9.01326 10.2406 8.98766 10.1192 8.93764C9.99774 8.88763 9.88735 8.81419 9.79431 8.72152C9.70126 8.62885 9.62738 8.51876 9.57689 8.39753C9.52639 8.27631 9.50026 8.14632 9.5 8.015ZM9.5 12.027C9.49973 11.762 9.6047 11.5076 9.79183 11.32C9.97896 11.1323 10.233 11.0265 10.498 11.026L18.498 11.013C18.7632 11.0125 19.0178 11.1173 19.2057 11.3045C19.3936 11.4916 19.4995 11.7458 19.5 12.011C19.5005 12.2762 19.3957 12.5308 19.2085 12.7187C19.0214 12.9066 18.7672 13.0125 18.502 13.013L10.502 13.026C10.3707 13.0263 10.2406 13.0007 10.1192 12.9506C9.99774 12.9006 9.88735 12.8272 9.79431 12.7345C9.70126 12.6418 9.62738 12.5318 9.57689 12.4105C9.52639 12.2893 9.50026 12.1583 9.5 12.027ZM9.5 16.027C9.49973 15.762 9.6047 15.5076 9.79183 15.32C9.97896 15.1323 10.233 15.0265 10.498 15.026L18.498 15.013C18.7632 15.0125 19.0178 15.1173 19.2057 15.3045C19.3936 15.4916 19.4995 15.7458 19.5 16.011C19.5005 16.2762 19.3957 16.5308 19.2085 16.7187C19.0214 16.9066 18.7672 17.0125 18.502 17.013L10.502 17.026C10.3707 17.0263 10.2406 17.0007 10.1192 16.9506C9.99774 16.9006 9.88735 16.8272 9.79431 16.7345C9.70126 16.6418 9.62738 16.5318 9.57689 16.4105C9.52639 16.2893 9.50026 16.1583 9.5 16.027Z" fill="white" fillOpacity="1"/>
                    </svg>
                    Couples</Link>
                  <Link className="nav-link" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.707 10.2929C10.6148 10.1974 10.5044 10.1212 10.3824 10.0688C10.2604 10.0164 10.1292 9.98879 9.9964 9.98764C9.86362 9.98648 9.73194 10.0118 9.60905 10.0621C9.48615 10.1123 9.3745 10.1866 9.28061 10.2805C9.18671 10.3744 9.11246 10.486 9.06218 10.6089C9.0119 10.7318 8.9866 10.8635 8.98775 10.9963C8.9889 11.1291 9.01649 11.2603 9.0689 11.3823C9.12131 11.5043 9.19749 11.6146 9.293 11.7069L11.086 13.4999L9.293 15.2929C9.19749 15.3851 9.12131 15.4955 9.0689 15.6175C9.01649 15.7395 8.9889 15.8707 8.98775 16.0035C8.9866 16.1363 9.0119 16.2679 9.06218 16.3908C9.11246 16.5137 9.18671 16.6254 9.28061 16.7193C9.3745 16.8132 9.48615 16.8874 9.60905 16.9377C9.73194 16.988 9.86362 17.0133 9.9964 17.0121C10.1292 17.011 10.2604 16.9834 10.3824 16.931C10.5044 16.8786 10.6148 16.8024 10.707 16.7069L12.5 14.9139L14.293 16.7069C14.4816 16.889 14.7342 16.9898 14.9964 16.9876C15.2586 16.9853 15.5094 16.8801 15.6948 16.6947C15.8802 16.5093 15.9854 16.2585 15.9877 15.9963C15.99 15.7341 15.8892 15.4815 15.707 15.2929L13.914 13.4999L15.707 11.7069C15.8892 11.5183 15.99 11.2657 15.9877 11.0035C15.9854 10.7413 15.8802 10.4905 15.6948 10.3051C15.5094 10.1197 15.2586 10.0145 14.9964 10.0122C14.7342 10.0099 14.4816 10.1107 14.293 10.2929L12.5 12.0859L10.707 10.2929ZM12.982 1.99989C13.661 1.99889 14.263 1.99789 14.82 2.22789C15.376 2.45789 15.801 2.88589 16.28 3.36589C17.23 4.31889 18.181 5.26989 19.134 6.21889C19.614 6.69889 20.041 7.12389 20.272 7.67989C20.502 8.23689 20.502 8.83989 20.5 9.51789C20.496 12.0339 20.5 14.5499 20.5 17.0659C20.5 17.9519 20.5 18.7159 20.418 19.3279C20.33 19.9829 20.131 20.6119 19.621 21.1209C19.111 21.6309 18.483 21.8299 17.828 21.9179C17.216 21.9999 16.452 21.9999 15.566 21.9999H9.434C8.548 21.9999 7.784 21.9999 7.172 21.9179C6.517 21.8299 5.888 21.6309 5.379 21.1209C4.869 20.6109 4.67 19.9829 4.582 19.3279C4.5 18.7159 4.5 17.9519 4.5 17.0659V6.93389C4.5 6.04789 4.5 5.28389 4.582 4.67189C4.67 4.01689 4.869 3.38789 5.379 2.87889C5.889 2.36889 6.517 2.16989 7.172 2.08189C7.784 1.99989 8.548 1.99989 9.434 1.99989C10.617 1.99989 11.799 2.00189 12.982 1.99989Z" fill="white" fillOpacity="1"/>
                    </svg>
                    Settings</Link>
                  <Link className={isPartiallyActive('/dashboard/blog')} to={'/dashboard/blog'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path d="M11.5 19.5H17.2C16.61 20.97 15.18 22 13.5 22H6.5C4.29 22 2.5 20.21 2.5 18V10C2.5 7.96 4.03 6.28003 6 6.03003V14C6 17.03 8.47 19.5 11.5 19.5ZM20 6.25H22.12C22.06 6.16 21.99 6.08 21.91 6L18.5 2.59009C18.42 2.51009 18.34 2.43989 18.25 2.38989V4.5C18.25 5.46 19.04 6.25 20 6.25ZM20 7.75C18.21 7.75 16.75 6.29 16.75 4.5V2H11.5C9.29 2 7.5 3.79 7.5 6V14C7.5 16.21 9.29 18 11.5 18H18.5C20.71 18 22.5 16.21 22.5 14V7.75H20Z" fill="white" fillOpacity="1"/>
                    </svg>
                    Blogs</Link>
                  <Link className={isPartiallyActive('/dashboard/packages')} to={'/dashboard/packages'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path d="M7.75 10.2505C7.75 9.83649 8.086 9.50049 8.5 9.50049H16.5C16.914 9.50049 17.25 9.83649 17.25 10.2505C17.25 10.6645 16.914 11.0005 16.5 11.0005H8.5C8.086 11.0005 7.75 10.6645 7.75 10.2505ZM9.5 8.00049H15.5C15.914 8.00049 16.25 7.66449 16.25 7.25049C16.25 6.83649 15.914 6.50049 15.5 6.50049H9.5C9.086 6.50049 8.75 6.83649 8.75 7.25049C8.75 7.66449 9.086 8.00049 9.5 8.00049ZM22.5 13.7375V16.2505C22.5 18.7315 20.481 20.7505 18 20.7505H7C4.519 20.7505 2.5 18.7315 2.5 16.2505V13.7375C2.5 13.3055 2.56902 12.8794 2.70502 12.4714L4.64001 6.66846C5.32201 4.62346 7.228 3.24951 9.383 3.24951H15.617C17.772 3.24951 19.679 4.62346 20.36 6.66846L22.295 12.4714C22.431 12.8794 22.5 13.3065 22.5 13.7375ZM4.72101 12.7505H9.5C9.776 12.7505 10 12.9745 10 13.2505C10 14.6295 11.122 15.7505 12.5 15.7505C13.878 15.7505 15 14.6295 15 13.2505C15 12.9745 15.224 12.7505 15.5 12.7505H20.279L18.463 7.30249C18.054 6.07449 16.91 5.25049 15.617 5.25049H9.383C8.09 5.25049 6.94599 6.07449 6.53699 7.30249L4.72101 12.7505Z" fill="white" fillOpacity="1"/>
                    </svg>
                    Packages</Link>
                </div>
            </div>
            {/*<div className="logoutBtn">*/}
            {/*  <button className="btn btn-primary"  type="button" onClick={handleLogout}>*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">*/}
            {/*      <path fillRule="evenodd" clipRule="evenodd" d="M17.293 14.2931C17.1108 14.4817 17.01 14.7343 17.0123 14.9965C17.0146 15.2587 17.1198 15.5095 17.3052 15.6949C17.4906 15.8803 17.7414 15.9855 18.0036 15.9878C18.2658 15.99 18.5184 15.8892 18.707 15.7071L21.62 12.7941L21.664 12.7481C21.77 12.6544 21.8549 12.5393 21.9131 12.4104C21.9712 12.2814 22.0013 12.1415 22.0013 12.0001C22.0013 11.8586 21.9712 11.7188 21.9131 11.5898C21.8549 11.4609 21.77 11.3457 21.664 11.2521C21.6498 11.2363 21.6351 11.221 21.62 11.2061L18.707 8.29308C18.6148 8.19757 18.5044 8.12139 18.3824 8.06898C18.2604 8.01657 18.1292 7.98898 17.9964 7.98783C17.8636 7.98668 17.7319 8.01198 17.609 8.06226C17.4862 8.11254 17.3745 8.18679 17.2806 8.28069C17.1867 8.37458 17.1125 8.48623 17.0622 8.60913C17.0119 8.73202 16.9866 8.8637 16.9877 8.99648C16.9889 9.12926 17.0165 9.26048 17.0689 9.38249C17.1213 9.50449 17.1975 9.61483 17.293 9.70708L18.586 11.0001H13C12.7348 11.0001 12.4804 11.1054 12.2929 11.293C12.1054 11.4805 12 11.7349 12 12.0001C12 12.2653 12.1054 12.5197 12.2929 12.7072C12.4804 12.8947 12.7348 13.0001 13 13.0001H18.586L17.293 14.2931Z" fill="white" fillOpacity="1"/>*/}
            {/*      <path fillRule="evenodd" clipRule="evenodd" d="M5 2C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H14.5C15.163 22 15.7989 21.7366 16.2678 21.2678C16.7366 20.7989 17 20.163 17 19.5V16.733C16.5406 16.4676 16.2054 16.0306 16.0679 15.5182C15.9305 15.0057 16.0021 14.4597 16.267 14H13C12.4696 14 11.9609 13.7893 11.5858 13.4142C11.2107 13.0391 11 12.5304 11 12C11 11.4696 11.2107 10.9609 11.5858 10.5858C11.9609 10.2107 12.4696 10 13 10H16.267C16.1356 9.77245 16.0503 9.52122 16.016 9.26069C15.9817 9.00015 15.9991 8.73541 16.0671 8.4816C16.1352 8.22779 16.2526 7.98988 16.4127 7.78147C16.5728 7.57307 16.7723 7.39824 17 7.267V4.5C17 3.83696 16.7366 3.20107 16.2678 2.73223C15.7989 2.26339 15.163 2 14.5 2H5Z" fill="white" fillOpacity="1"/>*/}
            {/*    </svg>*/}
            {/*    Logout</button>*/}
            {/*</div>*/}
          </div>
        </div>
      </>
    );
  }
}