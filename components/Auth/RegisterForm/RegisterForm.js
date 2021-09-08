import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { registerAPI } from "../../../api/user";

const { Input } = Form;

const RegisterForm = (props) => {
  const { showLoginForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registerAPI(formData);
      setLoading(false);
      if (response?.jwt) {
        showLoginForm();
        toast.success("Usuario creado!");
      } else {
        toast.error("Este usuario ya existe!");
      }
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Input
        name="name"
        type="text"
        placeholder="Nombres"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
        error={formik.errors.lastname}
        onChange={formik.handleChange}
      />
      <Input
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        error={formik.errors.username}
        onChange={formik.handleChange}
      />
      <Input
        name="email"
        type="text"
        placeholder="Correo electrónico"
        error={formik.errors.email}
        onChange={formik.handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="contraseña"
        error={formik.errors.password}
        onChange={formik.handleChange}
      />
      <div className="actions">
        <Button basic type="button" onClick={showLoginForm}>
          Iniciar Sesión
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
};

const initialValues = () => {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    name: yup.string().required(true),
    lastname: yup.string().required(true),
    username: yup.string().required(true),
    email: yup.string().email("email invalido").required(true),
    password: yup.string().required(true),
  };
};

export default RegisterForm;
