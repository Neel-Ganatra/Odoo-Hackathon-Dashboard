import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap /dist/css/bootstrap.min.css";
import Academics from "./components/Academics";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

import AddCategory from "./components/category/AddCategory";
import AddGroup from "./components/group/AddGroup";
import Branch from "./components/Branch";
import Category from "./components/category/Category";
import Faculty from "./components/Faculty";
import Group from "./components/group/Group";
import Project from "./components/Project";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Dashboard>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path={ROUTES.ACADEMIC} element={<Academics />} />
            <Route path={ROUTES.BRANCH} element={<Branch />} />
            <Route path={ROUTES.CATEGORY} element={<Category />} />
            <Route path={ROUTES.FACULTY} element={<Faculty />} />
            <Route path={ROUTES.GROUP} element={<Group />} />
            <Route path={ROUTES.PROJECT} element={<Project />} />
            <Route exact path={ROUTES.ADD_CATEGORY} element={<AddCategory />} />
            <Route exact path={ROUTES.ADD_GROUP} element={<AddGroup />} />
            <Route path={ROUTES.HOME} element={<Home />} />
          </Routes>
        </Dashboard>
      </BrowserRouter>
    </>
  );
}

export default App;
