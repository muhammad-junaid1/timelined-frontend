import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import { useStateContext } from "./context/ContextProvider";
import SchedulePopup from "./components/SchedulePopup";
import LandingPage from "./pages/landingPage";
import { useLocation } from "react-router-dom";

const routes = [
  {
    link: "/app",
    element: <Dashboard />,
  },
  {
    link: "/",
    element: <LandingPage />,
  },
];

const getSheetData = (
  setDATA,
  setAppLoaded,
  setScheduleFormOpen,
  fetchTeachersList
) => {
  fetch(import.meta.env.VITE_BACKEND_URL + "/data")
    .then((response) => response.json())
    .then((DATA_OBJ) => {
      console.log(DATA_OBJ);

      setDATA(DATA_OBJ);

      if (localStorage.getItem("values")) {
        fetchTeachersList();
        setAppLoaded(true);
      } else {
        setScheduleFormOpen(true);
      }
    })
    .catch((error) => console.log("Something went wrong: ", error));
};

function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);
  const { setDATA, fetchTeachersList } = useStateContext();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/app") {
        getSheetData(
          setDATA,
          setAppLoaded,
          setScheduleFormOpen,
          fetchTeachersList
        );
    } else {
      setAppLoaded(true);
    }
  }, [location.pathname]);

  if (scheduleFormOpen) {
    return <SchedulePopup modal={scheduleFormOpen} handleClose={() => {}} />;
  }

  if (appLoaded) {
    return (
      <div className="flex app-fade">
        <main className="flex-1 overflow-x-hidden">
          {location.pathname === "/app" && <Navbar />}
          <div className="app-container min-h-screen">
            <Routes>
              {routes?.map((route) => {
                return (
                  <Route
                    key={route?.link}
                    path={route?.link}
                    element={route?.element}
                  />
                );
              })}
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen app-container flex justify-center items-center">
        <div className="app-loading-container">
          <span className="circle"></span>
          <span className="circle"></span>
          <span className="circle"></span>
          <span className="circle"></span>
        </div>
      </div>
    );
  }
}

export default App;
