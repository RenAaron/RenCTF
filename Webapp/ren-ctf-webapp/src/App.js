import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
          <div>
              {!user ? (
                <Welcome />
                ) : (
                <Routes>
                  <Route path="/" element={<Layout />} />
                  <Route path="challenges/:ctfId" element={<Layout />} />
                </Routes>
              )}
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;