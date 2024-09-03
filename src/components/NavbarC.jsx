import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarC = () => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const rol = JSON.parse(sessionStorage.getItem("rol")) || "";

  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-color-mario">
        <Container>
          <Navbar.Brand
            href={
              token && rol === "user"
                ? "/user-home"
                : token && rol === "admin"
                ? "/admin-home"
                : "/"
            }
          >
            Logo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to={
                  token && rol === "user"
                    ? "/user-home"
                    : token && rol === "admin"
                    ? "/admin-home"
                    : "/"
                }
                className={"nav-link"}
              >
                Inicio
              </NavLink>
              {token && rol !== "admin" ? (
                <>
                  <NavLink to="#link" className={"nav-link"}>
                    Sobre Nosotros
                  </NavLink>
                  <NavLink to="#link" className={"nav-link"}>
                    Contacto
                  </NavLink>
                  {rol === "user" && (
                    <>
                      <NavLink to="/user/favs" className={"nav-link"}>
                        Favoritos
                      </NavLink>
                      <NavLink to="/user/cart" className={"nav-link"}>
                        Carrito
                      </NavLink>
                    </>
                  )}
                </>
              ) : (
                <>
                  <NavLink to="/admin/users" className={"nav-link"}>
                    Panel Usuarios
                  </NavLink>
                  <NavLink to="/admin/products" className={"nav-link"}>
                    Panel Productos
                  </NavLink>
                </>
              )}
            </Nav>
            {token ? (
              <Nav className="ms-auto">
                <NavLink to="#" className={"nav-link"} onClick={cerrarSesion}>
                  Cerrar Sesion
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <NavLink to="/login" className={"nav-link"}>
                  Iniciar Sesion
                </NavLink>
                <NavLink to="/register" className={"nav-link"}>
                  Registrarse
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
