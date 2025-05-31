import { useRoutes, BrowserRouter, useLocation } from "react-router-dom";
import { HomeAdminPage } from "../Admin/Home/HomeAdminPage"; 
import { MyAccount } from "../MyAccount/MyAccount";
import { CreateCourses } from "../Admin/Courses/CreateCourses";
import { AssignCourses } from "../Admin/Courses/AssignCourses";
import { EditDeleteCourses } from "../Admin/Courses/EditDeleteCourses";
import { Navbar } from "../../Components/Navbar/Navbar";
import { WelcomePage } from "../Public/WelcomePage";
import { NavbarWelcome } from "../../Components/Navbar/NavbarWelcome";
import { LoginPage } from "../Public/LoginPage";
import { RegisterPage } from "../Public/RegisterPage";
import { AuthProvider } from "../../Context/AuthContext";
import ProtectedRoute from "../../Components/Auth/ProtectedRoute";
import { HomeStudentPage } from "../Student/HomeStudentPage";
import { HomeTeacherPage } from "../Teacher/HomeTeacherPage";
import CreateUsersPage from "../Admin/Users/CreateUsersPage";
import EditEliminatePage from "../Admin/Users/EditEliminatePage";
import { ListCursosAsigPage } from "../Teacher/ListCursosAsigPage";
import { InscribirCursosPage } from "../Student/InscribirCursoPage";
import { MisCursosInscritosPage } from "../Student/MisCursosInscritosPage";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <WelcomePage /> },
    { path: '/student', element: <HomeStudentPage /> },
    { path: '/teacher', element: <HomeTeacherPage /> },
    { path: '/list-asig-courses', element: <ListCursosAsigPage/> },
    { path: '/ins-courses', element: <InscribirCursosPage/> },
    { path: '/mis-courses-ins', element: <MisCursosInscritosPage/> },

    {
      path: '/admin', element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <HomeAdminPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/create-user', element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <CreateUsersPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/edit-users', element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <EditEliminatePage />
        </ProtectedRoute>
      )
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/create-courses', element: <ProtectedRoute allowedRoles={['ADMIN']}><CreateCourses /></ProtectedRoute> },
    { path: '/assign-courses', element: <ProtectedRoute allowedRoles={['ADMIN']}><AssignCourses /></ProtectedRoute> },
    { path: '/edit-delete-courses', element: <ProtectedRoute allowedRoles={['ADMIN']}><EditDeleteCourses /></ProtectedRoute> }

  ])
  return routes;
}

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  
  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <>
      {isPublicRoute ? <NavbarWelcome /> : <Navbar />}
      <AppRoutes />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
