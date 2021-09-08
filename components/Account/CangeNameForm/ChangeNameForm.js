import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { updateNameAPi } from "../../../api/user";

const ChangeNameForm = ({ user, logout, setReloadUser }) => {
  /* states */
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (dataForm) => {
      setLoading(true);
      const response = await updateNameAPi(user.id, dataForm, logout);
      if (!response) {
        toast.error("Hubo un error al actualizar");
      } else {
        toast.success("Nombre y apellido actualizado!");
        setReloadUser(true);
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Cambiar tu nombre y apellido</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Apellido"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

/* values del formik */
const initialValues = (name, lastname) => {
  return {
    name: name || "",
    lastname: lastname || "",
  };
};

/* yup validation */
const validationSchema = () => {
  return {
    name: yup.string().required(true),
    lastname: yup.string().required(true),
  };
};

export default ChangeNameForm;
