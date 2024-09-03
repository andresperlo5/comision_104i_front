import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { Button } from "react-bootstrap";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [producto, setProducto] = useState(null);

  const obtenerProducto = async () => {
    const result = await clientAxios.get(`/productos/${params.idProducto}`);
    setProducto(result.data.producto);
  };

  const agregarProductoCarrito = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token")) || "";

      if (!token) {
        alert("Debes iniciar sesion");
        navigate("/login");
      }

      const result = await clientAxios.post(
        `/productos/agregarProductoCarrito/${params.idProducto}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  const agregarProductoFavorito = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token")) || "";

      if (!token) {
        alert("Debes iniciar sesion");
        navigate("/login");
      }

      const result = await clientAxios.post(
        `/productos/agregarProductoFavorito/${params.idProducto}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  useEffect(() => {
    obtenerProducto();
  }, []);

  return (
    <>
      <div className="d-flex mx-5 my-5 align-items-center justify-content-center">
        <img src={producto?.imagen} alt="" width={"500"} />
        <div className="ms-3">
          <div className="text-center">
            <p className="fs-2">{producto?.titulo}</p>
            <p>{producto?.descripcion}</p>
            <p className="fs-3">${producto?.precio}</p>
          </div>
          <Button variant="primary" onClick={agregarProductoFavorito}>
            Añadir Favoritos
          </Button>
          <Button
            variant="success"
            className="ms-3"
            onClick={agregarProductoCarrito}
          >
            Añadir Carrito
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
