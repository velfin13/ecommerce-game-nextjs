import React from "react";
import Head from "next/head";

const Seo = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
};

Seo.defaultProps = {
  title: "Gaming - Tienda de videojuegos",
  description:"Tus juegos favoritos para pc,play station y más.. al mejor precios"
};

export default Seo;
