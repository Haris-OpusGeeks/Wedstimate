import '../../dashboardCss.scss';
import Sidebar from '../../components/dashboard/Sidebar/Sidebar'
import Header from '../../components/dashboard/Header/Header'
import Home from './Home/Home'
import { Route, Routes } from 'react-router-dom';
import Vendors from './Vendors/Vendors';
import VendorEdit from './vendorEdit/VendorEdit';
import VendorLeads from './vendorLeads/VendorLeads';
import BlogDashboard from './blog/BlogDashboard';
import BlogEdit from './blog/BlogEdit';
import BlogNew from './blog/BlogNew';
import ViewPackages from "./Packages/ViewPackages.jsx";
import CreatePackages from "./Packages/CreatePackages.jsx";
import Couples from "./couples/Couples.jsx";
import DashboardProtectedRoute from "../../components/dashboard/DashboardProtectedRoute.jsx";
import EditPackages from "./Packages/EditPackages.jsx";
import VendorReviews from "./vendorEdit/Reviews/VendorReviews.jsx";
import CreateCouples from "./couples/CreateCouples/CreateCouples.jsx";
import NewVendor from "./Vendors/newVendor/NewVendor.jsx";
import SendEmail from "./Email/SendEmail.jsx";
import AddReview from "./vendorEdit/Reviews/AddReview/AddReview.jsx";

export default function Dashboard() {
  return (
    <>  
        <Routes>
            <Route path='' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <Home/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='couples' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <Couples/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='create-couples' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <CreateCouples/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='vendors' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <Vendors/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='vendors/edit/:id' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <VendorEdit/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='vendors/edit/reviews/:id' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <VendorReviews/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='vendors/edit/reviews/add/:id' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <AddReview/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='vendors/:id/leads' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <VendorLeads/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='vendors/new' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <NewVendor/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='blog' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <BlogDashboard/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='blog/edit/*' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <BlogEdit/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='blog/new' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <BlogNew/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='packages' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <ViewPackages/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='packages/new' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <CreatePackages/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='packages/edit/*' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <EditPackages/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
            <Route path='send-email' element={
                <DashboardProtectedRoute>
                    <div className="dashboard">
                        <div className="row">
                            <div className="col-lg-2">
                                <Sidebar/>
                            </div>
                            <div className="col-lg-10 col-sm-12">
                                <Header />
                                <SendEmail/>
                            </div>
                        </div>
                    </div>
                </DashboardProtectedRoute>
            }/>
        </Routes>
    </>
  )
}
