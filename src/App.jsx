import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";

// Hooks
import { AuthProvider } from "./hooks/AuthContext";

// Pages
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blogs from "./pages/Blogs/Blogs";
import GuideMain from "./pages/Guides/GuideMain";
import GuidePage from "./pages/Guides/GuidePage";
import RegistrationPage from "./pages/Registration/registrationPage";
import RegistrationForm from "./pages/Registration/RegistrationForm";
import EnablerRegForm from "./pages/Registration/EnablerRegForm";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyPassword from "./pages/ForgotPassword/VerifyPassword";
import ChangePassword from "./pages/ForgotPassword/ChangePassword";
import MessagePassword from "./pages/ForgotPassword/MessagePassword";
import TokenInvalid from "./pages/ForgotPassword/TokenInvalid";
import PasswordChanged from "./pages/ForgotPassword/PasswordChanged";
import TwoAuth from "./pages/Login/TwoAuth";
import AccountPage from "./pages/EnablerAccount/AccountPage";
import Events from "./pages/Events/Events";
import EventEdit from "./pages/Events/EventEditPage/EventEdit";
import Posts from "./pages/Posts/Posts";
import BlogPage from "./pages/Blogs/BlogPage/BlogPage";
import BlogEdit from "./pages/Blogs/BlogEdit/BlogEdit";
import UploadDocuments from "./pages/Registration/UploadDocuments/UploadDocuments";
import Testing from "./pages/Testing/testing";
import AccountContext from "./context/accountContext";
import useLoadProfile from "./hooks/useLoadProfile";
import PostEdit from "./pages/Posts/PostEditPage/PostEdit";
import FirstTimeLogin from "./pages/FirstTimeLogin/FirstTimeLogin";
import MentorPage from "./pages/Mentor/MentorPage";
import AddMentor from "./pages/Mentor/AddMentors/AddMentor";
import EnablersPage from "./pages/Enablers/EnablersPage";
import AddEnabler from "./pages/Enablers/AddEnabler/AddEnabler";
// import PostEdit from './pages/Posts/PostEditPage/PostEdit';

function App() {
  const { profileData, isLoading } = useLoadProfile();
  return (
    <AccountContext.Provider
      value={{
        profileData: profileData,
      }}
    >
      <AuthProvider>
        <Router>
          <div className="w-screen">
            {/* Change the default landing to login once done */}
            <Routes>
              {/* Change the default landing to login once done */}
              <Route path="/" element={<Login />} />
              <Route path="/two-auth" element={<TwoAuth />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/verifyPassword" element={<VerifyPassword />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route
                path="/change-password-sent"
                element={<MessagePassword />}
              />
              <Route path="/invalid-token" element={<TokenInvalid />} />
              <Route path="/password-changed" element={<PasswordChanged />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/mentor"
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path="" element={<MentorPage />} />
                <Route path="addMentor" element={<AddMentor />} />
              </Route>
              {/* <Route path="/mentor" element={<MentorPage />} /> */}

              <Route path="/enablers" element={<EnablersPage />} />

              <Route
                path="/enablers"
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path="" element={<EnablersPage />} />
                <Route path="addEnabler" element={<AddEnabler />} />
              </Route>

              <Route
                path="/events"
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path="" element={<Events />} />
                <Route path=":eventId" element={<EventEdit />} />
              </Route>
              <Route
                path="/blogs"
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path="" element={<Blogs />} />
                <Route path="create" element={<BlogPage />} />
                <Route path=":blogId" element={<BlogEdit />} />
              </Route>
              <Route
                path="/posts"
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path="" element={<Posts />} />
                <Route path=":post_id" element={<PostEdit />} />
              </Route>
              <Route
                path="/guides"
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path="" element={<GuideMain />} />
                <Route path=":program_id" element={<GuidePage />} />
              </Route>
              <Route path="/guides/:pageId" element={<GuidePage />} />
              <Route path="/account" element={<AccountPage />} />

              <Route path="/getting-started" element={<FirstTimeLogin />} />

              <Route path="/register" element={<RegistrationPage />}>
                <Route path="" element={<RegistrationForm />} />
                <Route path="enabler" element={<EnablerRegForm />} />
                <Route path="upload" element={<UploadDocuments />} />
              </Route>
              <Route path="/test" element={<Testing />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </AccountContext.Provider>
  );
}

export default App;
