import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const UserCartPage = () => {
  const [productsCart, setProductsCart] = useState([]);
  const [idPreference, setIdPreference] = useState(null);

  const getAllProductsCart = async () => {
    const result = await clientAxios.get(
      "/productos/todosProductosCarrito",
      configHeaders
    );
    setProductsCart(result.data.productos);
  };

  const handleClickDeleteProdCart = async (idProduct) => {
    try {
      const confirmDeleteProductCart = confirm(
        "Estas seguro de que quieres eliminar a este producto del carrito?"
      );

      if (confirmDeleteProductCart) {
        const result = await clientAxios.delete(
          `/productos/borrarProductoCarrito/${idProduct}`,
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

  const handleClicPayMP = async () => {
    initMercadoPago(`${import.meta.env.VITE_MP_PUBLIC_KEY}`);
    const result = await clientAxios.post(
      "/productos/pagarCarritoProductos",
      {},
      configHeaders
    );

    if (result.status === 200) {
      location.href = `${result.data.url}`;
      //setIdPreference(result.data.url);
    }
  };

  useEffect(() => {
    getAllProductsCart();
  }, []);

  return (
    <>
      <Container className="my-5 mx-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productsCart.map((product) => (
              <tr>
                <td>{product._id}</td>
                <td>{product.titutlo}</td>
                <td>{product.precio}</td>
                <td>
                  <input type="number" name="" id="" />
                </td>
                <td>
                  <p>Total</p>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleClickDeleteProdCart(product._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {productsCart.length > 0 && (
          <>
            <Button onClick={handleClicPayMP}>Pagar</Button>

            {/*   <Container className="w-25">
              <Wallet
                initialization={{
                  preferenceId: idPreference,
                  redirectMode: "modal",
                }}
              />
            </Container> */}
          </>
        )}
      </Container>
    </>
  );
};

export default UserCartPage;
