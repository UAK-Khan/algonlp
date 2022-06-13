import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes,} from "react-router-dom";
import AdminPageComp from "./pages/admin/AdminPageComp";
import UsersPageComp from "./pages/admin/users/UsersPageComp";
import {
  ABOUT,
  ADMIN_ABOUT,
  ADMIN_CONTACTS,
  ADMIN_FEEDBACKS,
  ADMIN_MESSAGES,
  ADMIN_METADATA,
  ADMIN_PACKAGES,
  ADMIN_PORTFOLIO,
  ADMIN_SERVICES,
  ADMIN_USERS,
  CHANGE_PASSWORD_ROUTE,
  CONTACT_ROUTE,
  FEEDBACK_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HOMEPAGE_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SERVICE_DETAIL_ROUTE,
  SERVICES_ROUTE
} from "./shared/routesConstants";
import ServicesPageComp from "./pages/admin/services/ServicesPageComp";
import PackagesPageComp from "./pages/admin/packages/PackagesPageComp";
import MetadataPageComp from "./pages/admin/metadata/MetadataPageComp";
import AboutPageComp from "./pages/admin/about/AboutPageComp";
import PortfolioPageComp from "./pages/admin/portfolio/PortfolioPageComp";
import FeedbacksPageComp from "./pages/admin/feedbacks/FeedbacksPageComp";
import MessagesPageComp from "./pages/admin/messages/MessagesPageComp";
import LoginPageComp from "./pages/auth/login/LoginPageComp";
import RegisterPageComp from "./pages/auth/register/RegisterPageComp";
import ForgotPasswordComp from "./pages/auth/forgotPassword/ForgotPasswordComp";
import ChangePasswordComp from "./pages/auth/changePassword/ChangePasswordComp";
import "./configs/baseLoaderConfigs";
import AuthGuard from "./shared/authGuard/AuthGuard";
import UnAuthGuard from "./shared/authGuard/UnAuthGuard";
import SuperAuthGuard from "./shared/authGuard/SuperAuthGuard";
import FrontLayoutComp from "./components/layout/frontLayout/FrontLayoutComp";
import AdminContactsPageComp from "./pages/admin/contact/ContactsPageComp";

import AboutPublicComp from "./pages/public/about/AboutPageComp";
import ContactPageComp from "./pages/public/contact/ContactPageComp";
import FeedbackPageComp from "./pages/public/feedback/FeedbackPageComp";
import ServicesDisplayPageComp from "./pages/public/services/ServicesPageComp";
import ServiceDetailPageComp from "./pages/public/serviceDetail/ServiceDetailPageComp";
import HomePageComp from "./pages/public/home/HomePageComp";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="admin" element={<SuperAuthGuard><AdminPageComp/></SuperAuthGuard>}>
          <Route path={ADMIN_USERS} element={<UsersPageComp/>}/>
          <Route path={ADMIN_SERVICES} element={<ServicesPageComp/>}/>
          <Route path={ADMIN_PACKAGES} element={<PackagesPageComp/>}/>
          <Route path={ADMIN_METADATA} element={<MetadataPageComp/>}/>
          <Route path={ADMIN_ABOUT} element={<AboutPageComp/>}/>
          <Route path={ADMIN_PORTFOLIO} element={<PortfolioPageComp/>}/>
          <Route path={ADMIN_FEEDBACKS} element={<FeedbacksPageComp/>}/>
          <Route path={ADMIN_MESSAGES} element={<MessagesPageComp/>}/>
          <Route path={ADMIN_CONTACTS} element={<AdminContactsPageComp/>}/>
        </Route>
        <Route path="/" element={<FrontLayoutComp/>}>
          {/* Auth */}
          <Route path={LOGIN_ROUTE} element={<UnAuthGuard><LoginPageComp/></UnAuthGuard>}/>
          <Route path={REGISTER_ROUTE} element={<UnAuthGuard><RegisterPageComp/></UnAuthGuard>}/>
          <Route path={FORGOT_PASSWORD_ROUTE} element={<UnAuthGuard><ForgotPasswordComp/></UnAuthGuard>}/>
          <Route path={CHANGE_PASSWORD_ROUTE} element={<AuthGuard><ChangePasswordComp/></AuthGuard>}/>
          {/* Public */}
          <Route path={CONTACT_ROUTE} element={<ContactPageComp/>}/>
          <Route path={FEEDBACK_ROUTE} element={<AuthGuard><FeedbackPageComp/></AuthGuard>}/>
          <Route path={SERVICES_ROUTE} element={<ServicesDisplayPageComp/>}/>
          <Route path={`${SERVICE_DETAIL_ROUTE}/:serviceId`} element={<ServiceDetailPageComp/>}/>
          <Route path={ABOUT} element={<AboutPublicComp/>}/>
          <Route path={HOMEPAGE_ROUTE} element={<HomePageComp/>}/>
        </Route>
        <Route
          path="*"
          element={<Navigate to={HOMEPAGE_ROUTE}/>}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
