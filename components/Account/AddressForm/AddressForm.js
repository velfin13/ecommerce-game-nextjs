import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import { addAdressAPI, updateAdressUserAPI } from "../../../api/address";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";

const AddressForm = (props) => {
  const { setShowModal, setReloadAddress, newAddress, address } = props;
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  /* configurando formik */
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  /* funcion para crear la direccion */
  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };

    const result = await addAdressAPI(formDataTemp, logout);
    if (!result) {
      toast.error("Error al crear la Dirección");
      setLoading(false);
    } else {
      toast.success("Dirección creada con exito!");
      setReloadAddress(true);
      setShowModal(false);
      setLoading(false);
    }
  };
  /* funcion para editar direcciones */
  const updateAddress = async (formData) => {
    setLoading(true);

    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };
    const result = updateAdressUserAPI(address._id, formDataTemp, logout);

    if (!result) {
      toast.error("Error al actualizar Dirección");
      setLoading(false);
    } else {
      toast.success("Dirección actualizada con exito!");
      setLoading(false);
      setReloadAddress(true);
      setShowModal(false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        type="text"
        name="title"
        label="Titulo de la direccion"
        placeholder="Dirección"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title && true}
      />

      <Form.Group widths="equal">
        <Form.Input
          type="text"
          name="name"
          label="Nombres y Apellidos"
          placeholder="Nombres y Apellidos"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          name="address"
          label="Dirección"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address && true}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          type="text"
          name="city"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city && true}
        />
        <Form.Input
          type="text"
          name="state"
          label="Estado-Provincia-Region"
          placeholder="Estado-Provincia-Region"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state && true}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          type="text"
          name="postalCode"
          label="Código Postal"
          placeholder="Código Postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode && true}
        />
        <Form.Input
          type="text"
          name="phone"
          label="Numero de teléfono"
          placeholder="Numero de teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone && true}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear" : "Editar"}
        </Button>
      </div>
    </Form>
  );
};

const initialValues = (address) => {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  };
};

const validationSchema = () => {
  return {
    title: yup.string().required(true),
    name: yup.string().required(true),
    address: yup.string().required(true),
    city: yup.string().required(true),
    state: yup.string().required(true),
    postalCode: yup.number().required(true),
    phone: yup.number().required(true),
  };
};

export default AddressForm;
