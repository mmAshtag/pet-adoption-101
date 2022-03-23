import './App.css';
import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import HomePage from "./Components/HomePage";
import Profile from "./Components/Account/Profile";
import SearchPage from './Components/SearchPage';
import PetsPage from "./Components/Pets/PetsPage";
import PetProfile from "./Components/Pets/PetProfile"
import MyPets from "./Components/Pets/MyPets";
import SavedPets from "./Components/Pets/SavedPets";
import PrivateOutlet from "./Components/PrivateOutlet";
import AdminHome from "./Components/Admin/AdminHome";
import AddPet from './Components/Admin/AddPet';
import PetsToEdit from "./Components/Admin/PetsToEdit";
import { Outlet } from "react-router-dom";
import { AppContext, PersonalPetsContext } from './Context/AppContext';
import Navbar from './Components/Utilities/Navbar';
import { getUserToken } from "./lib/APIs/usersApi";
import PrivateAdminOutlet from "./Components/Admin/PrivateAdminOutlet";
import AdminLogin from "./Components/Admin/AdminLogin";

function App() {
  const [petsList, setPetsList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [viewedPet, setViewedPet] = useState({});
  const [savedPetsList, setSavedPetsList] = useState([]);
  const [myPetsList, setMyPetsList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      getUserToken().then((data) => {
        setCurrentUser(data.user)
      });
    }
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{ petsList, setPetsList, currentUser, setCurrentUser, viewedPet, setViewedPet }}>
        <PersonalPetsContext.Provider value={{ savedPetsList, setSavedPetsList, myPetsList, setMyPetsList }}>
          <BrowserRouter>
            <Navbar position="fixed" />
            <div>
              <Routes>
                {/* <Route path='*' element={<NotFound />} /> */} {/* 404 Page */}
                <Route index path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/home" element={<PrivateOutlet />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="pets" element={<Outlet />}>
                    <Route path="/home/pets" element={<PetsPage />}/>
                    <Route path=":id" element={<PetProfile />}/>
                    <Route path="mypets" element={<MyPets />}/>
                    <Route path="savedpets" element={<SavedPets />}/>
                  </Route>
                </Route>
                <Route path="/adminlogin" element={<AdminLogin />}/>
                <Route path="admin" element={<PrivateAdminOutlet />}>
                    <Route path="/admin" element={<AdminHome />}/>
                    <Route path="addpet" element={<AddPet />}/>
                    <Route path="editpet" element={<PetsToEdit />}/>
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </PersonalPetsContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
