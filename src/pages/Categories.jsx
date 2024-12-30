import { Link, Route, Routes, useLocation } from 'react-router-dom';
import WeddingBuilding from '../components/WeddingBuilding';
import CouplesDashboard from '../components/CouplesDashboard';
import CategoryPreferences from './WeddingBuildingInners/CategoryPreferences';
import Deals from './Deals';
import Packages from './Packages';
import ProtectedRoute from '../components/ProtectedRoute';
import Chat from './Chat';
import VendorDashboard from './VendorDashboard';
import PreviousEvent from "../components/PreviousEvent.jsx";

export default function Categories() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const isPartiallyActive = (path) => {
    return location.pathname.includes(path) ? 'nav-link active' : 'nav-link';
  };

  const accessToken = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user'));

  const tabLinks = () => {
    if (!user) {
      // If no user is logged in, show the default layout including Dashboard and Build Your Wedding links
      return (
          <>
            <li className="nav-item">
              <Link className={isActive('/categories/couples/dashboard')} to="/categories/couples/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isPartiallyActive('/categories/build-wedding')} to="/categories/build-wedding">
                Build Your Wedding
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/categories/deals')} to="/categories/deals">
                Deals
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive('/categories/chat/*')} to='/categories/chat'>
                Chat
              </Link>
            </li>
          </>
      );
    }

    // If the user is logged in but is the admin, show nothing
    if (user.userName === "root.admin") {
      return null;
    }

    // If the user is logged in and is not the admin, show relevant links
    return (
        <>
          {user.isVendor ? (
              <li className="nav-item">
                <Link className={isActive('/categories/vendor/dashboard')} to="/categories/vendor/dashboard">
                  Dashboard
                </Link>
              </li>
          ) : (
              <>
                <li className="nav-item">
                  <Link className={isActive('/categories/couples/dashboard')} to="/categories/couples/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={isPartiallyActive('/categories/build-wedding')} to="/categories/build-wedding">
                    Build Your Wedding
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive('/categories/packages')} to="/categories/packages">
                    Packages
                  </Link>
                </li>
              </>
          )}
          <li className="nav-item">
            <Link className={isActive('/categories/deals')} to="/categories/deals">
              Deals
            </Link>
          </li>
          {accessToken && (
              <li className="nav-item">
                <Link className={isActive('/categories/chat/*')} to='/categories/chat'>
                  Chat
                </Link>
              </li>
          )}
        </>
    );
  };



  return (
    <div className="categoriesPage">
      <ul className="nav nav-tabs">
        {tabLinks()}
        {/*{user && user.isVendor && user.userName !== "root.admin" ? (*/}
        {/*    <li className="nav-item">*/}
        {/*      <Link className={isActive('/categories/vendor/dashboard')} to="/categories/vendor/dashboard">*/}
        {/*        dashboard*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*) : null}*/}

        {/*{user && !user.isVendor && user.userName !== "root.admin" ? (*/}
        {/*    <li className="nav-item">*/}
        {/*      <Link className={isActive('/categories/couples/dashboard')} to="/categories/couples/dashboard">*/}
        {/*        dashboard*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*) : null}*/}

        {/*{user && !user.isVendor && user.userName !== "root.admin" ? (*/}
        {/*    <li className="nav-item">*/}
        {/*      <Link className={isPartiallyActive('/categories/build-wedding')} to="/categories/build-wedding">*/}
        {/*        Build Your Wedding*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*) : null}*/}

        {/*<li className="nav-item">*/}
        {/*  <Link className={isActive('/categories/deals')} to="/categories/deals">*/}
        {/*    deals*/}
        {/*  </Link>*/}
        {/*</li>*/}

        {/*{user && !user.isVendor && user.userName !== "root.admin" ? (*/}
        {/*    <li className="nav-item">*/}
        {/*      <Link className={isActive('/categories/packages')} to="/categories/packages">*/}
        {/*        packages*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*) : null}*/}
        {/*{accessToken && user.userName !== "root.admin" ? (*/}
        {/*  <li className="nav-item">*/}
        {/*    <Link className={isActive('/categories/chat/*')} to='/categories/chat'>Chat</Link>*/}
        {/*  </li>*/}
        {/*):null}*/}
      </ul>
      <div className="tab-content">
        <Routes>
          {accessToken && user && user.isVendor ?
          <Route path='vendor/dashboard' element={<div className="tab-pane fade show active">
              <VendorDashboard/>
          </div>} />
          :
              <>
                  <Route path='couples/dashboard' element={<div className="tab-pane fade show active">
                    <ProtectedRoute>
                      <CouplesDashboard />
                    </ProtectedRoute>
                    </div>} />
                  <Route path='couples/dashboard/:id' element={<div className="tab-pane fade show active">
                  <ProtectedRoute>
                  <PreviousEvent />
                  </ProtectedRoute>
                  </div>} />
              </>
          }
          <Route path='build-wedding' element={<div className="tab-pane fade show active"><WeddingBuilding /></div>} />
          <Route path='deals' element={<div className="tab-pane fade show active">
            <ProtectedRoute>
              <Deals/>
            </ProtectedRoute>
            </div>} />
          <Route path='packages' element={<div className="tab-pane fade show active">
            <ProtectedRoute>
              <Packages/>
            </ProtectedRoute>
            </div>} />
          <Route path='build-wedding/category/:categoryPreferences' element={<div className="tab-pane fade show active"><CategoryPreferences/></div>} />
          <Route path='build-wedding/category/:categoryPreferences/:zipCode' element={<div className="tab-pane fade show active"><CategoryPreferences/></div>} />
          {accessToken && (
            <Route path='/chat' element={<div className="tab-pane fade show active"><Chat/></div>} />
          )}
          {accessToken && (
            <Route path="/chat/:chatId" element={<Chat />} />
          )}
        </Routes>
      </div>
    </div>
  );
}
