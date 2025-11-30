// src/components/Routes1.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import Weblayout from "../layouts/Weblayout";
import TransparentLayout from "../layouts/TransparentLayout";

// Navbars
import Navbargeneric from "./Navbargeneric";
import Navbar1 from "./Navbar1";

// Pages
import Home from "../pages/Home";
import Intro from "../pages/Intro";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Visitordashboard from "../pages/Visitordashboard";
import Admindashboard from "../pages/Admindashboard";
import Cart from "../pages/Cart";
import Curatordashboard from "../pages/Curatordashboard";
import Artistdashboard from "../pages/Artistdashboard";
import Upload from "../pages/Upload";
import Manage from "../pages/Manage";
import Analysis from "../pages/Analysis";
import CreateExhibition from "../pages/CreateExhibition";
import ManageExhibitions from "../pages/ManageExhibitions";
import ExhibitionAnalysis from "../pages/ExhibitionAnalysis";
import Exhibitions1 from "../pages/Exhibitions1";

const Routes1 = () => {
  const [cart, setCart] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [artists, setArtists] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [curators, setCurators] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);

  // User state for Navbar
  const [user, setUser] = useState({
    username: "Perry",
    role: "Visitor", // default role
  });

  // Initialize from localStorage
  useEffect(() => {
    const storedArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
    const storedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];
    setArtworks(storedArtworks);
    setExhibitions(storedExhibitions);
  }, []);

  useEffect(() => {
    localStorage.setItem("artworks", JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    localStorage.setItem("exhibitions", JSON.stringify(exhibitions));
  }, [exhibitions]);

  return (
    <Routes>
      {/* Intro + Home + Login + Signup */}
      <Route
        path="/"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbargeneric />
              <Intro />
            </Weblayout>
          </TransparentLayout>
        }
      />
      <Route
        path="/home"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbargeneric />
              <Home />
            </Weblayout>
          </TransparentLayout>
        }
      />
      <Route
        path="/login/:role"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbargeneric />
              <Login
                admins={admins}
                setAdmins={setAdmins}
                artists={artists}
                setArtists={setArtists}
                visitors={visitors}
                setVisitors={setVisitors}
                curators={curators}
                setCurators={setCurators}
                setUser={setUser} // <-- Pass setUser to update Navbar on login
              />
            </Weblayout>
          </TransparentLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbargeneric />
              <Signup
                admins={admins}
                setAdmins={setAdmins}
                artists={artists}
                setArtists={setArtists}
                visitors={visitors}
                setVisitors={setVisitors}
                curators={curators}
                setCurators={setCurators}
              />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Visitor Dashboard */}
      <Route
        path="/visitordashboard"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Visitordashboard cart={cart} setCart={setCart} />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admindashboard"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Admindashboard
                admins={admins}
                setAdmins={setAdmins}
                artists={artists}
                setArtists={setArtists}
                visitors={visitors}
                setVisitors={setVisitors}
                curators={curators}
                setCurators={setCurators}
              />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Curator Dashboard */}
      <Route
        path="/curatordashboard"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Curatordashboard
                curators={curators}
                setCurators={setCurators}
                exhibitions={exhibitions}
                setExhibitions={setExhibitions}
              />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Artist Dashboard */}
      <Route
        path="/artistdashboard"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Artistdashboard artworks={artworks} setArtworks={setArtworks} />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Upload Page */}
      <Route
        path="/upload"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Upload artworks={artworks} setArtworks={setArtworks} />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Manage Page */}
      <Route
        path="/manage"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Manage artworks={artworks} setArtworks={setArtworks} />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Analysis Page */}
      <Route
        path="/analysis"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Analysis artworks={artworks} setArtworks={setArtworks} />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Cart page */}
      <Route
        path="/cart"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Cart cart={cart} setCart={setCart} />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Create Exhibition */}
      <Route
        path="/createexhibition"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <CreateExhibition
                exhibitions={exhibitions}
                setExhibitions={setExhibitions}
              />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Manage Exhibitions */}
      <Route
        path="/manageexhibitions"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <ManageExhibitions
                exhibitions={exhibitions}
                setExhibitions={setExhibitions}
              />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Exhibition Analysis */}
      <Route
        path="/exhibitionsanalysis"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <ExhibitionAnalysis
                exhibitions={exhibitions}
                setExhibitions={setExhibitions}
              />
            </Weblayout>
          </TransparentLayout>
        }
      />

      <Route
        path="/exhibitions"
        element={
          <TransparentLayout>
            <Weblayout>
              <Navbar1 username={user.username} role={user.role} />
              <Exhibitions1 />
            </Weblayout>
          </TransparentLayout>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
};

export default Routes1;
