import React from "react";
import { Container } from "semantic-ui-react";
import classnames from "classnames";
import Header from "../../components/Header";

const BasicLayout = ({ children, className }) => {
  return (
    <Container
      fluid
      className={classnames("basic-layout", { [className]: className })}
    >
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
};

export default BasicLayout;
