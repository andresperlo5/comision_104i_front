import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import clientAxios, {
  configHeaders,
  configHeadersImg,
} from "../helpers/axios.config";

const ModalC = ({ objeto, idPage, setIsLoading, set }) => {
  const [show, setShow] = useState(false);
  const [infoUser, setInfoUser] = useState(objeto);
  const [infoProduct, setInfoProduct] = useState(objeto);
  const [imagen, setImagen] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlerChangeUser = (ev) => {
    setInfoUser({ ...infoUser, [ev.target.name]: ev.target.value });
  };

  const handlerChangeProduct = (ev) => {
    setInfoProduct({ ...infoProduct, [ev.target.name]: ev.target.value });
  };

  const handleClickUser = async (ev) => {
    ev.preventDefault();

    if (infoUser.rol !== "admin" && infoUser.rol !== "user") {
      return alert("Rol incorrecto. Opciones correctas: USER o ADMIN");
    }

    const result = await clientAxios.put(
      `/usuarios/${infoUser._id}`,
      infoUser,
      configHeaders
    );

    if (result.status === 200) {
      alert(`${result.data.msg}`);
      setIsLoading(false);
      set(result.data.usuarios);
      handleClose();
    }
  };

  const handleClickProduct = async (ev) => {
    ev.preventDefault();
    const result1 = await clientAxios.put(
      `/productos/${infoProduct._id}`,
      infoProduct,
      configHeaders
    );

    if (result1.status === 200) {
      console.log(imagen);
      if (imagen) {
        const formData = new FormData();
        formData.append("image", imagen);
        const result = await clientAxios.post(
          `/productos/agregarImagen/${infoProduct._id}`,
          formData,
          configHeadersImg
        );

        if (result.status === 200) {
          alert(`${result.data.msg}`);
          setIsLoading(false);
          set(result1.data.productos);
          handleClose();
          setImagen(null);
          return;
        }
      }

      alert(`${result1.data.msg}`);
      setIsLoading(false);
      set(result1.data.productos);
      handleClose();
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Modal {idPage === "adminUsers" ? "Usuario" : "Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {idPage === "adminUsers" ? (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreUsuario"
                  value={infoUser?.nombreUsuario}
                  placeholder="Enter email"
                  a
                  onChange={handlerChangeUser}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  type="text"
                  name="rol"
                  value={infoUser?.rol}
                  placeholder="Password"
                  onChange={handlerChangeUser}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleClickUser}>
                Guardar Datos
              </Button>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={infoProduct.titulo}
                  placeholder="titulo"
                  onChange={handlerChangeProduct}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  name="precio"
                  value={infoProduct.precio}
                  placeholder="precio"
                  onChange={handlerChangeProduct}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion"
                  value={infoProduct.descripcion}
                  placeholder="descripcion"
                  onChange={handlerChangeProduct}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(ev) => setImagen(ev.target.files[0])}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={handleClickProduct}
              >
                Guardar Datos
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalC;
