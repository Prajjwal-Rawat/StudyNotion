import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import "./App.css"
import NavBar from "./components/common/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUsPage from "./components/core/ContactPage/ContactUsPage";
import OpenRoutes from "./components/core/HomePage/Auth/OpenRoutes"
import PrivateRoutes from "./components/core/HomePage/Auth/PrivateRoutes";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error"
import EditProfileDetails from "./components/core/ProfileEdit/EditProfileDetails";
import EnrollCourses from "./components/core/Dashboard/EnrolledCourses/EnrollCourses";
import Cart from "./components/core/Dashboard/cart/Cart";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourses/AddCourse";
import MyCourses from "./components/core/Dashboard/InstructorCourses/MyCourses";
import EditCourse from "./components/core/Dashboard/InstructorCourses/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";

function App() {

  const {user} = useSelector((state) => state.Profile);

  
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element = {<Catalog/>}/>
        <Route path="/courses/:courseId" element = {<CourseDetails/>}/>

        <Route path="/signup" element={
          <OpenRoutes>
            <SignUp />
          </OpenRoutes>
        } />

        <Route path="/login" element={
          <OpenRoutes>
           <Login/>
          </OpenRoutes>
          } />

        <Route path="/forgot-password" element={
          <OpenRoutes>
          <ForgotPassword />
          </OpenRoutes>
          } />

        <Route path="/reset-password/:id" element={
          <OpenRoutes>
          <UpdatePassword />
          </OpenRoutes>
          } />

        <Route path="/verify-email" element={
          <OpenRoutes>
          <VerifyEmail />
          </OpenRoutes>
          } />
          
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="*" element={<Error/>} />


        <Route element={<PrivateRoutes> <Dashboard/> </PrivateRoutes>}>
           <Route path="/dashboard/my-profile" element={
            <PrivateRoutes>
             <MyProfile/>
            </PrivateRoutes>
            }/>

           <Route path="/dashboard/instructor" element={
            user?.AccountType === "Instructor" ? (
              <PrivateRoutes>
              <InstructorDashboard/>
             </PrivateRoutes>
            ): <Navigate to="*"/>
            }/>

           <Route path="/dashboard/settings" element={
            <PrivateRoutes>
             <EditProfileDetails/>
            </PrivateRoutes>
            }/>

            <Route path="/dashboard/enrolled-courses" element = {
              user?.AccountType === "Student" ? (
                <PrivateRoutes>
                <EnrollCourses/>
              </PrivateRoutes>
              ): <Navigate to="*"/>
            }/>

            <Route path="/dashboard/cart" element = {
              user?.AccountType === "Student" ? (
              <PrivateRoutes>
                <Cart/>
              </PrivateRoutes>
              ): <Navigate to="*"/>
            }/>


            <Route path="/dashboard/add-course" element = {
              user?.AccountType === "Instructor" ? (
              <PrivateRoutes>
                <AddCourse/>
              </PrivateRoutes>
              ): <Navigate to="*"/>
            }/>

            <Route path="/dashboard/my-courses" element = {
              user?.AccountType === "Instructor" ? (
              <PrivateRoutes>
                <MyCourses/>
              </PrivateRoutes>
              ): <Navigate to="*"/>
            }/>


            <Route path="/dashboard/edit-course/:courseId" element = {
              user?.AccountType === "Instructor" ? (
              <PrivateRoutes>
                <EditCourse/>
              </PrivateRoutes>
              ): <Navigate to="*"/>
            }/>
        </Route>


        <Route element = {<PrivateRoutes> <ViewCourse/> </PrivateRoutes>}>
        <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element = {
          user?.AccountType === "Student" ? (
            <PrivateRoutes>
            <VideoDetails/>
          </PrivateRoutes>
          ): <Navigate to="*"/>
        } />
        </Route>

      </Routes>
    </div>
  )
}

export default App
