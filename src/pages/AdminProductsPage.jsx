import { Container } from "react-bootstrap";
import TableC from "../components/TableC";
import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const obtenerTodosLosProductos = async () => {
    const result = await clientAxios.get("/productos", configHeaders);
    setProducts(result.data.productos);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      obtenerTodosLosProductos();
    }
  }, [products]);

  return (
    <>
      <Container className="my-5 mx-5">
        <TableC
          idPage={"adminProducts"}
          array={products}
          setIsLoading={setIsLoading}
          set={setProducts}
        />
      </Container>
    </>
  );
};

export default AdminProductsPage;
