import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { Col, Container, Row } from "react-bootstrap";
import CardC from "../components/CardC";

const UserFavPage = () => {
  const [productsFavs, setProductsFavs] = useState([]);

  const getAllProductsFavs = async () => {
    const result = await clientAxios.get(
      "/productos/todosProductosFavoritos",
      configHeaders
    );
    setProductsFavs(result.data.productos);
  };

  useEffect(() => {
    getAllProductsFavs();
  }, []);

  return (
    <>
      <Container className="my-5 mx-5">
        <Row>
          {productsFavs.map((product) => (
            <Col sm="12" md="6" lg="4" key={product._id}>
              <CardC data={product} idPage={"favs"} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserFavPage;
