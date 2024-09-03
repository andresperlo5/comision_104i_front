import { useEffect, useState } from "react";
import CarouselC from "../components/CarouselC";
import CardC from "../components/CardC";
import { Col, Container, Row } from "react-bootstrap";
import clientAxios from "../helpers/axios.config";

const HomePage = () => {
  const [productos, setProductos] = useState([]);

  const getProducts = async () => {
    const products = await clientAxios.get("/productos");
    setProductos(products.data.productos);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <CarouselC />
      <h2 className="text-center my-5">Nuestros Productos</h2>
      <Container>
        <Row>
          {productos.map(
            (producto) =>
              !producto.bloqueado && (
                <Col key={producto._id} sm="12" md="6" lg="4" className="my-3">
                  <CardC data={producto} />
                </Col>
              )
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
