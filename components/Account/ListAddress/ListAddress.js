import React, { useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import Swal from "sweetalert2";
import { getAdressUserAPI } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import { map, size } from "lodash";
import { deleteAdressUserAPI } from "../../../api/address";

const ListAddress = (props) => {
  const { reloadAddress, setReloadAddress, openModal } = props;
  const [address, setAddress] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAdressUserAPI(auth.idUser, logout);
      setAddress(response || []);
      setReloadAddress(false);
    })();
  }, [reloadAddress]);

  if (address === undefined) return null;

  return (
    <div className="list-address">
      {size(address) === 0 ? (
        <h3 style={{ textAlign: "center" }}>No hay direcciones creada</h3>
      ) : (
        <Grid>
          {map(address, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddress={setReloadAddress}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
};

const Address = (props) => {
  const { address, logout, setReloadAddress, openModal } = props;
  /* funcion para elimnar el address */
  const deleteAddress = async () => {
    Swal.fire({
      title: "Estas seguro de eliminar esta dirección?",
      text: "Una vez eliminada no se podra recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteAdressUserAPI(address._id, logout);
        if (!result) {
          Swal.fire("Error!", "No se pudo eliminar la dirección.", "error");
        } else {
          Swal.fire(
            "Eliminado!",
            "La dirección ha sido eliminada con exito!.",
            "success"
          );
          setReloadAddress(true);
        }
      }
    });
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address )}
        >
          Editar
        </Button>
        <Button
          color="red"
          onClick={() => {
            deleteAddress();
          }}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default ListAddress;
