import Navbar from "./components/universal/Navbar";
import "./App.css";
import Router from "./pages/Router";
import { logoutUser } from "./utils/userutils";
import useAutobankStore from "./store/autobankstore";
import Footer from "./components/universal/Footer";
import { useAuth } from "react-oidc-context";
import axios from "axios";



function App() {

  const auth = useAuth();
   if (auth.isAuthenticated) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.user?.access_token}`
  }

  return (
   
      <div className="App bg-online-blue">
        <Navbar />
        <Router/>
             <Footer />
      </div>  


  );
}

export default App;
