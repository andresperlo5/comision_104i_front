import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { useNavigate } from "react-router-dom";

const FormC = ({ idPage }) => {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState(null);
  const [formLogin, setFormLogin] = useState(null);

  const handleChangeRegister = (ev) => {
    setFormRegister({ ...formRegister, [ev.target.name]: ev.target.value });
  };

  const handleChangeLogin = (ev) => {
    setFormLogin({ ...formLogin, [ev.target.name]: ev.target.value });
  };

  const handleClickRegister = async (ev) => {
    ev.preventDefault();
    console.log(formRegister);
    const { usuario, email, contrasenia, rcontrasenia } = formRegister;

    if (!usuario || !email || !contrasenia || !rcontrasenia) {
      return alert("Algun campo esta vacio");
    }

    if (contrasenia === rcontrasenia) {
      const result = await clientAxios.post(
        "/usuarios",
        {
          nombreUsuario: usuario,
          emailUsuario: email,
          contrasenia,
        },
        configHeaders
      );

      if (result.status === 201) {
        alert("Usuario registrado con exito");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } else {
      alert("Las contraseñas no son iguales");
    }
  };

  const handleClickLogin = async (ev) => {
    try {
      ev.preventDefault();
      const { usuario, contrasenia } = formLogin;

      if (!usuario || !contrasenia) {
        return alert("Algun campo esta vacio");
      }

      const result = await clientAxios.post(
        "/usuarios/iniciarSesion",
        {
          nombreUsuario: usuario,
          contrasenia,
        },
        configHeaders
      );

      if (result.status === 200) {
        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        sessionStorage.setItem("rol", JSON.stringify(result.data.rol));

        if (result.data.rol === "admin") {
          setTimeout(() => {
            navigate("/admin-home");
          }, 500);
        } else {
          setTimeout(() => {
            navigate("/user-home");
          }, 500);
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.bloqueado) {
          return alert("Usuario bloqueado. Comunicarse con un administrador");
        }
      }
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            name="usuario"
            placeholder="Enter email"
            onChange={
              idPage === "register" ? handleChangeRegister : handleChangeLogin
            }
          />
        </Form.Group>
        {idPage === "register" && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email </Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Password"
              onChange={handleChangeRegister}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="contrasenia"
            type="password"
            placeholder="Password"
            onChange={
              idPage === "register" ? handleChangeRegister : handleChangeLogin
            }
          />
        </Form.Group>
        {idPage === "register" && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repetir Contraseña</Form.Label>
            <Form.Control
              name="rcontrasenia"
              type="password"
              placeholder="Password"
              onChange={handleChangeRegister}
            />
          </Form.Group>
        )}

        <Button
          variant="primary"
          type="submit"
          onClick={
            idPage === "register" ? handleClickRegister : handleClickLogin
          }
        >
          {idPage === "register" ? "Enviar Datos" : "Ingresar"}
        </Button>
      </Form>
    </>
  );
};

export default FormC;
