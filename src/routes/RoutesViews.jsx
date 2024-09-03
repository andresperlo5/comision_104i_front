import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import AboutPage from "../pages/AboutPage";
import RegisterPage from "../pages/RegisterPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import UserFavPage from "../pages/UserFavPage";
import UserCartPage from "../pages/UserCartPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AdminPage from "../pages/AdminPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";
import PrivateRoute from "../components/PrivateRoute";

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route
          path="/admin/products"
          element={
            <PrivateRoute rolRuta={"admin"}>
              <AdminProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute rolRuta={"admin"}>
              <AdminUsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-home"
          element={
            <PrivateRoute rolRuta={"admin"}>
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/cart"
          element={
            <PrivateRoute rolRuta={"user"}>
              <UserCartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/favs"
          element={
            <PrivateRoute rolRuta={"user"}>
              <UserFavPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-home"
          element={
            <PrivateRoute rolRuta={"user"}>
              <UserPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/details-product/:idProducto"
          element={<ProductDetailsPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
