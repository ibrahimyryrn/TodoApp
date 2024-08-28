import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
// import { fetchTodosSupabase } from "./redux/supabaseSlice";
// import { AppDispatch } from "./redux/store";
// import { useDispatch } from "react-redux";

function App() {
  // const dispatch = useDispatch<AppDispatch>();
  // const user_id = "98b806e0-a72a-4c95-8f62-08a08f50f5c8";

  // dispatch(fetchTodosSupabase(user_id));

  return (
    <div className="flex justify-center items-center flex-col m-0 p-0 w-full">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
