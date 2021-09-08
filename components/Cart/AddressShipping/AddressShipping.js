import React, { useState, useEffect } from "react";
import Link from "next/link";
import Classnames from "classnames";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import { getAdressUserAPI } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

const AddressShipping = ({ setAdress }) => {
  const [addresses, setAddresses] = useState(null);
  const [adressActive, setAdressActive] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAdressUserAPI(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Direccion de envio</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay direcciones registradas!!{" "}
            <Link href="/account">
              <a>Añade tu primera dirección</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (adress) => (
              <Grid.Column key={adress.id} mobile={16} tablet={8} computer={4}>
                <Adress
                  adress={adress}
                  adressActive={adressActive}
                  setAdressActive={setAdressActive}
                  setAdress={setAdress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

const Adress = (props) => {
  const { adress, adressActive, setAdressActive, setAdress } = props;

  const changeAdress = () => {
    setAdressActive(adress._id);
    setAdress(adress);
  };

  return (
    <div
      className={Classnames("address", {
        active: adressActive === adress._id,
      })}
      onClick={changeAdress}
    >
      <p>{adress.title}</p>
      <p>
        <b>Nombre:</b> {adress.name}
      </p>
      <p>
        <b>Ciudad:</b> {adress.city}
      </p>
      <p>
        <b>Cod. Postal</b> {adress.postalCode}
      </p>
      <p>
        <b>Direccion:</b> {adress.address}
      </p>
      <p>
        <b>Telefono:</b> {adress.phone}
      </p>
    </div>
  );
};

export default AddressShipping;
