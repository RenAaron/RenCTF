import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Layout from "./components/Layout";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <NavBar />
      {/* <div className="main-content"> */}

      {/* <Sidebar /> */}

        <div className="center-cont">
            {!user ? (
              <Welcome />
              ) : (
              <>
              <Layout />
              </>
            )}
        </div>
      </div>
    // </div>
  );
}

export default App;