import React, { Fragment } from "react";
import { ProductCard } from "../";

const ProductsList = ({ data }) => {
  return (
    <Fragment>
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Fragment>
  );
};

export default ProductsList;
