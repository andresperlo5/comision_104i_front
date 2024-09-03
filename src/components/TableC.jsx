import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import clientAxios, { configHeaders } from "../helpers/axios.config";

import ModalC from "./ModalC";

const TableC = ({ idPage, array, setIsLoading, set }) => {
  const eliminarUsuario = async (idUsuario) => {
    const confirmarEliminarUsuario = confirm(
      "Estas seguro de que quieres eliminar a este usuario?"
    );

    if (confirmarEliminarUsuario) {
      const result = await clientAxios.delete(
        `/usuarios/${idUsuario}`,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }
    }
  };

  const eliminarProducto = async (idProducto) => {
    const confirmarEliminarProducto = confirm(
      "Estas seguro de que quieres eliminar a este producto?"
    );

    if (confirmarEliminarProducto) {
      const result = await clientAxios.delete(
        `/productos/${idProducto}`,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }
    }
  };

  const deshabilitarUsuario = async (idUsuario) => {
    const confirmarDeshabilitarUsuario = confirm(
      "Estas seguro de que quieres deshabilitar a este usuario?"
    );

    if (confirmarDeshabilitarUsuario) {
      const result = await clientAxios.put(
        `/usuarios/deshabilitar/${idUsuario}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }
    }
  };

  const habilitarUsuario = async (idUsuario) => {
    const confirmarHabilitarUsuario = confirm(
      "Estas seguro de que quieres habilitar a este usuario?"
    );

    if (confirmarHabilitarUsuario) {
      const result = await clientAxios.put(
        `/usuarios/habilitar/${idUsuario}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }
    }
  };

  const deshabilitarProducto = async (idProducto) => {
    const confirmarDeshabilitarProducto = confirm(
      "Estas seguro de que quieres deshabilitar a este producto?"
    );

    if (confirmarDeshabilitarProducto) {
      const result = await clientAxios.put(
        `/productos/deshabilitar/${idProducto}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }
    }
  };

  const habilitarProducto = async (idProducto) => {
    const confirmarHabilitarProducto = confirm(
      "Estas seguro de que quieres habilitar a este producto?"
    );

    if (confirmarHabilitarProducto) {
      const result = await clientAxios.put(
        `/productos/habilitar/${idProducto}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          {idPage === "adminUsers" ? (
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Opciones</th>
            </tr>
          ) : (
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Opciones</th>
            </tr>
          )}
        </thead>
        <tbody>
          {idPage === "adminUsers"
            ? array.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.nombreUsuario}</td>
                  <td>{user.rol}</td>
                  <td className="d-flex justify-content-evenly">
                    <ModalC
                      objeto={user}
                      idPage={"adminUsers"}
                      setIsLoading={setIsLoading}
                      set={set}
                    />
                    <Button
                      variant="danger"
                      onClick={() => eliminarUsuario(user._id)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant={user.bloqueado ? "success" : "info"}
                      onClick={
                        user.bloqueado
                          ? () => habilitarUsuario(user._id)
                          : () => deshabilitarUsuario(user._id)
                      }
                    >
                      {user.bloqueado ? "Habilitar" : "Bloquear"}
                    </Button>
                  </td>
                </tr>
              ))
            : array.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.titulo}</td>
                  <td>{product.precio}</td>
                  <td className="text-center">
                    <img src={`${product.imagen}`} alt="" width={50} />
                  </td>
                  <td className="d-flex justify-content-evenly">
                    <ModalC
                      objeto={product}
                      idPage={"adminProducts"}
                      setIsLoading={setIsLoading}
                      set={set}
                    />
                    <Button
                      variant="danger"
                      onClick={() => eliminarProducto(product._id)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant={product.bloqueado ? "success" : "info"}
                      onClick={
                        product.bloqueado
                          ? () => habilitarProducto(product._id)
                          : () => deshabilitarProducto(product._id)
                      }
                    >
                      {product.bloqueado ? "Habilitar" : "Bloquear"}
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableC;
