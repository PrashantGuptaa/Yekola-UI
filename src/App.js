import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import JoinForm from "./containers/100MS/JoinRoom";
import appRoutes from "./configs/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          {appRoutes.map((route) => {
            const { path, component: Component } = route;
            return <Route path={path} element={<Component />} />;
          })}
        </Routes>
      </BrowserRouter>

      {/* <JoinForm /> */}
    </div>
  );
}

export default App;
