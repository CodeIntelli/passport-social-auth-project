import Navbar from "./components/navbar";
import Post from "./pages/post"
import Home from "./pages/Home"
import Login from "./pages/login"
import "./app.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:2020/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      }).then(response => {
        if (response.status === 200) {
          return response.json()
          throw new Error("authentication has been failed!")
        }
      }).then(resObject => {
        const userData = resObject;
        console.log("🚀 ~ file: App.js ~ line 28 ~ getUser ~ userData", userData?.user?.id);
        if (userData?.user?.id) {

          setUserId(userData?.user?.id);
        }
        setUser(resObject.user)
      }).catch(err => {
        console.log(err);
      })
    }
    const getUserEmail = () => {
      // fetch()
      console.log(userId)
      if (userId) {
        fetch(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          }
        }).then(response => {
          if (response.status === 200) {
            return response.json()
            throw new Error("authentication has been failed!")
          }
        }).then(resObject => {
          const userData = resObject;
          console.log("🚀 ~ file: App.js ~ line 54 ~ getUserEmail ~ userData", userData)
          // setUserId(userData?.user?.id);
          // setUser(resObject.user)
        }).catch(err => {
          console.log(err);
        })
      }
    }

    getUser();
    getUserEmail();
  }, [])
  console.log(user)
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
