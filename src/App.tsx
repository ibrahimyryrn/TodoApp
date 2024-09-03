import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  //
  return (
    <div className="flex justify-center items-center flex-col m-0 p-0 w-full">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
