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
<<<<<<< HEAD
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
=======
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Blogs from './pages/Blogs/Blogs'
import GuideMain from './pages/Guides/GuideMain'
import GuidePage from './pages/Guides/GuidePage'
import Register from './pages/Registration/RegisterNew/Register'
import Upload from './pages/Registration/UploadDocuments/UploadNew/UploadDocuments'

import RegistrationPage from './pages/Registration/registrationPage'

import RegistrationForm from './pages/Registration/RegistrationForm'

import EnablerRegForm from './pages/Registration/EnablerRegForm'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import VerifyPassword from './pages/ForgotPassword/VerifyPassword'
import ChangePassword from './pages/ForgotPassword/ChangePassword'
import MessagePassword from './pages/ForgotPassword/MessagePassword'
import TokenInvalid from './pages/ForgotPassword/TokenInvalid'
import PasswordChanged from './pages/ForgotPassword/PasswordChanged'
import TwoAuth from './pages/Login/TwoAuth'
import AccountPage from './pages/EnablerAccount/AccountPage'
import Events from './pages/Events/Events'
import EventEdit from './pages/Events/EventEditPage/EventEdit'
import Posts from './pages/Posts/Posts'
import BlogPage from './pages/Blogs/BlogPage/BlogPage'
import BlogEdit from './pages/Blogs/BlogEdit/BlogEdit'
import UploadDocuments from './pages/Registration/UploadDocuments/UploadDocuments'
import Testing from './pages/Testing/testing'
import AccountContext from './context/accountContext'
import useLoadProfile from './hooks/useLoadProfile'
import PostEdit from './pages/Posts/PostEditPage/PostEdit'
import FirstTimeLogin from './pages/FirstTimeLogin/FirstTimeLoginNew/FirstTimeLogin'
>>>>>>> a4cb395f206cc5ac4f8e45c0fcaee71c540c5953
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
              <Route path="/mentor" element={<MentorPage />} />
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

<<<<<<< HEAD
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
=======
                            <Route
                                path="/register"
                                element={<Register />}
                            >
                                <Route path="" element={<RegistrationForm />} />
                                <Route
                                    path="enabler"
                                    element={<EnablerRegForm />}
                                />
                                {/* <Route
                                    path="upload"
                                    element={<Upload />}
                                /> */}
                            </Route>
                            <Route path='/upload' element={<Upload />} />
                            <Route path="/test" element={<Testing />} />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </AccountContext.Provider>
    )
>>>>>>> a4cb395f206cc5ac4f8e45c0fcaee71c540c5953
}

export default App;
