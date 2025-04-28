import { useRoutes, BrowserRouter } from "react-router-dom";
import { Home } from "../Home/Home";
import { MyAccount } from "../MyAccount/MyAccount";
import { CreateCourses } from "../CreateCourses/CreateCourses";
import { AssignCourses } from "../AssignCourses/AssignCourses";
import { EditDeleteCourses } from "../EditDeleteCourses/EditDeleteCourses";
import { Navbar } from "../../Components/Navbar/Navbar";


const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/my-account', element: <MyAccount />},
    {path: '/create-courses', element: <CreateCourses />},
    {path: '/assign-courses', element: <AssignCourses />},
    {path: '/edit-delete-courses', element: <EditDeleteCourses/>}

  ])
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Navbar/>
    </BrowserRouter>
  )
}

export default App;
