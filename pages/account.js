import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import Speaner from "../components/Speaner";
import ChangeNameForm from "../components/Account/CangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import useAuth from "../hooks/useAuth";
import { getMeAPI } from "../api/user";
import { Icon } from "semantic-ui-react";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";

const Account = () => {
  /* states */
  const [user, setUser] = useState(undefined);

  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeAPI(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return <Speaner />;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
};

const Configuration = ({ user, logout, setReloadUser }) => {
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
      </div>
    </div>
  );
};

const Addresses = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);
  const [reloadAddress, setReloadAddress] = useState(false);

  /* funcion que abre el modal */
  const openModal = (titulo, address) => {
    setTitleModal(titulo);
    setShowModal(true);
    setContentModal(
      <AddressForm
        setReloadAddress={setReloadAddress}
        setShowModal={setShowModal}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" link onClick={() => openModal("Nueva dirección")} />
      </div>
      <div className="data">
        <ListAddress
          reloadAddress={reloadAddress}
          setReloadAddress={setReloadAddress}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
};

export default Account;
