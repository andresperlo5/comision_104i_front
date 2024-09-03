import Card from "react-bootstrap/Card";
import { Nav } from "react-bootstrap";
import "../css/CardC.css";
import clientAxios, { configHeaders } from "../helpers/axios.config";

const CardC = ({ data, idPage }) => {
  console.log(data);
  const handleDeleteProduct = async () => {
    try {
      const confirmDeleteProductFavs = confirm(
        "Estas seguro de que quieres eliminar a este producto de tus favoritos?"
      );

      if (confirmDeleteProductFavs) {
        const result = await clientAxios.delete(
          `/productos/borrarProductoFavorito/${data._id}`,
          configHeaders
        );

        console.log(result);

        if (result.status === 200) {
          return alert(`${result.data.msg}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <Card.Img variant="top" src={data.imagen} />
        <Card.Body>
          <Card.Title className="text-truncate">{data.titulo}</Card.Title>
          <Card.Title>${data.precio}</Card.Title>
          <Card.Text className="text-truncate">{data.descripcion}</Card.Text>
          <Nav.Link
            href={`/details-product/${data._id}`}
            className="btn btn-primary"
          >
            Ver Mas
          </Nav.Link>
          {idPage === "favs" && (
            <Nav.Link
              href={`#`}
              className="btn btn-danger"
              onClick={handleDeleteProduct}
            >
              Eliminar
            </Nav.Link>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardC;
