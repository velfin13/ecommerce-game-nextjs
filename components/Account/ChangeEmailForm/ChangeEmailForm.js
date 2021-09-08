import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { updateEmailAPi } from "../../../api/user";

const ChangeEmailForm = (props) => {
  /* states */
  const [loading, setLoading] = useState(false);
  const { user, setReloadUser } = props;

  /* validacion de formik */
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      var emailForm = formData.email;
      setLoading(true);
      const result = await updateEmailAPi(user.id, emailForm);
      if (!result || result?.statusCode === 400) {
        toast.error("Error al actualizar");
      } else {
        toast.success("Email actualizado");
        setReloadUser(true);
        formik.handleReset();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambiar de email <span>Email actual: {user.email}</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email && true}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirmar email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail && true}
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
    email: "",
    repeatEmail: "",
  };
};

const validationSchema = () => {
  return {
    email: yup
      .string()
      .email("Email invalido")
      .required("El email es requerido")
      .oneOf([yup.ref("repeatEmail"), true]),
    repeatEmail: yup
      .string()
      .email("Email invalido")
      .required("Debes repetir el email")
      .oneOf([yup.ref("email"), true]),
  };
};
export default ChangeEmailForm;
