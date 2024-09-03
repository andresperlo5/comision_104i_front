import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, rolRuta }) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || "";

  if (!token) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  } else {
    if (rolRuta === rolUsuario) {
      return children;
    } else {
      if (rolUsuario === "user") {
        setTimeout(() => {
          navigate("/user-home");
        }, 500);
      } else {
        return children;
      }
    }
  }
};

export default PrivateRoute;
