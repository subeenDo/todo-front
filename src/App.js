import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async() =>{ 
    try{
      const storedToken = sessionStorage.getItem("token");
      if(storedToken){
        //utils api.js에 넣음 api.defaults.headers['authorization']="Bearer "+ storedToken;
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }

    }catch(error){
      console.error(error);
      setUser(null);
    }
  };

  useEffect(()=>{
    getUser();
  },[]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute user={user}> 
              <TodoPage user={user} setUser={setUser}/>
            </PrivateRoute>
          }
          />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
