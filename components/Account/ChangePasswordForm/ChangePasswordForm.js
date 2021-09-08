import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { updatePasswordAPi } from "../../../api/user";
import { toast } from "react-toastify";

const ChangePasswordForm = (props) => {
  const [loading, setLoading] = useState(false);
  const { user, logout } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (dataForm) => {
      setLoading(true);
      const result = await updatePasswordAPi(
        user.id,
        dataForm.password,
        logout
      );

      if (!result) {
        toast.error("Error al actualizar la contraseña");
      } else {
        toast.success("Contraseña actualizada");
        logout();
      }

      setLoading(false);
    },
  });

  return (
    <div className="change-password-form">
      <h4>Cambiar contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password && true}
          />
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Comprueba tu contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword && true}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

const initialValues = () => {
  return {
    password: "",
    repeatPassword: "",
  };
};

const validationSchema = () => {
  return {
    password: yup
      .string()
      .required(true)
      .oneOf([yup.ref("repeatPassword"), true]),
    repeatPassword: yup
      .string()
      .required(true)
      .oneOf([yup.ref("password"), true]),
  };
};

export default ChangePasswordForm;
