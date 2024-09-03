import { Container } from "react-bootstrap";
import TableC from "../components/TableC";
import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const obtenerTodosLosUsuarios = async () => {
    const result = await clientAxios.get("/usuarios", configHeaders);
    setUsers(result.data.usuarios);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      obtenerTodosLosUsuarios();
    }
  }, [users]);

  return (
    <>
      <Container className="my-5 mx-5">
        <TableC
          idPage={"adminUsers"}
          array={users}
          setIsLoading={setIsLoading}
          set={setUsers}
        />
      </Container>
    </>
  );
};

export default AdminUsersPage;
