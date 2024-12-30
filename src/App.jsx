import { useState, useEffect } from 'react';
// import './App.scss'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/dashboard/Login'
import Homepage from './pages/Homepage';
import HeaderHome from './components/HeaderHome';
import FooterHome from './components/FooterHome';
// import '../node_modules/bootstrap/dist/js/bootstrap'
import Dashboard from './pages/dashboard/Dashboard';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import SingleBlogPage from './pages/SingleBlogPage';
import About from './pages/About';
import HeaderHomeScrolled from './components/ScrollHeaderHome';
import Categories from './pages/Categories';
import VendorLogin from './pages/VendorLogin';
import CoupleLogin from './pages/CoupleLogin';
import EditProfile from './pages/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLogin from './components/ProtectedLogin';
import SelectPreference from './pages/SelectPreference';
import ProtectedVendorLogin from './components/ProtectedVendorLogin';
import ProtectedVendorRoute from './components/ProtectedVendorRoute';
import SelectPackage from './pages/SelectPackage';
import EditPreference from './pages/EditPreference';
import CreateDeal from './pages/CreateDeal';
import Leads from './pages/Leads';
import DashboardProtectedLogin from "./components/dashboard/DashboardProtectedLogin.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";


function App() {


    return (
        <>
            <Routes>
                <Route path="/dashboard/login" element=
                    <>
                        <DashboardProtectedLogin>
                            <Login/>
                        </DashboardProtectedLogin>
                    </>
                />
                <Route path="/dashboard/*" element=
                    <Dashboard/>
                 />
                <Route path='/' element={
                    <>
                        <HeaderHome/>
                        <Homepage/>
                        <FooterHome/>
                    </>
                }/>
                <Route path='/contact-us' element={
                    <>
                        <HeaderHomeScrolled/>
                        <Contact/>
                        <FooterHome/>
                    </>
                }/>
                <Route path='/blog' element={
                    <>
                        <HeaderHomeScrolled/>
                        <Blogs/>
                        <FooterHome/>
                    </>
                }/>
                <Route path='/blog/:id' element={
                    <>
                        <HeaderHomeScrolled/>
                        <Blogs/>
                        <FooterHome/>
                    </>
                }/>
                <Route path='/blog/page/:id' element={
                    <>
                        <HeaderHome/>
                        <SingleBlogPage/>
                        <FooterHome/>
                    </>
                }/>
                <Route path='/about' element={
                    <>
                        <HeaderHomeScrolled/>
                        <About/>
                        <FooterHome/>
                    </>
                }/>
                <Route path='/categories/*' element={
                    <>
                        <HeaderHomeScrolled/>
                        <Categories/>
                        <FooterHome/>
                    </>
                }/>
                <Route path='/edit-profile' element={
                    <>
                        <ProtectedRoute>
                            <HeaderHomeScrolled/>
                            <EditProfile/>
                            <FooterHome/>
                        </ProtectedRoute>
                    </>
                }/>
                <Route path='/vendor-login' element={
                    <>
                        <ProtectedVendorLogin>
                            <VendorLogin/>
                        </ProtectedVendorLogin>
                    </>
                }/>
                <Route path='/select-preference' element={
                    <>
                        <ProtectedVendorRoute>
                            <HeaderHomeScrolled/>
                            <SelectPreference/>
                            <FooterHome/>
                        </ProtectedVendorRoute>
                    </>
                }/>
                <Route path='/edit-preference' element={
                    <>
                        <ProtectedVendorRoute>
                            <HeaderHomeScrolled/>
                            <EditPreference/>
                            <FooterHome/>
                        </ProtectedVendorRoute>
                    </>
                }/>
                <Route path='/select-package' element={
                    <>
                        <ProtectedVendorRoute>
                            <HeaderHomeScrolled/>
                            <SelectPackage/>
                            <FooterHome/>
                        </ProtectedVendorRoute>
                    </>
                }/>
                <Route path='/create-deal' element={
                    <>
                        <ProtectedVendorRoute>
                            <HeaderHomeScrolled/>
                            <CreateDeal/>
                            <FooterHome/>
                        </ProtectedVendorRoute>
                    </>
                }/>
                <Route path='/leads' element={
                    <>
                        <ProtectedVendorRoute>
                            <HeaderHomeScrolled/>
                            <Leads/>
                            <FooterHome/>
                        </ProtectedVendorRoute>
                    </>
                }/>
                <Route path='/privacy-policy' element={
                    <>
                        <HeaderHomeScrolled/>
                        <PrivacyPolicy/>
                    </>
                }/>
                <Route path='/terms-of-services' element={
                    <>
                        <HeaderHomeScrolled/>
                        <TermsOfService/>
                    </>
                }/>
                <Route path='/couple-login' element={
                    <>
                        <ProtectedLogin>
                            <CoupleLogin/>
                        </ProtectedLogin>
                    </>
                }/>
                <Route path='/create-event' element={
                    <>
                        <ProtectedRoute>
                            <HeaderHomeScrolled/>
                            <CreateEvent/>
                            <FooterHome/>
                        </ProtectedRoute>
                    </>
                }/>
            </Routes>
        </>
    )
}

export default App