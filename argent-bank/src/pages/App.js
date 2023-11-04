//react Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components Imports
import Home from "./Home";
import SignIn from "./SignIn";
import User from "./User";
import Footer from "../components/Footer";
import PageLayout from "../layout/PageLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;