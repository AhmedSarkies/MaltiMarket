import React from "react";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

import { Container, Row, Col, Spinner } from "reactstrap";

import "../styles/all-products.css";

import useGetData from "../hooks/useGetData";
import { db } from "../firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const AllProducts = () => {
  // First way to delete a product
  const { data, setData, loading, setLoading } = useGetData("products");
  const handleDeleteProduct = async ({ id, productName }) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert ${productName}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          // delete reviews collection of the product
          await getDocs(collection(db, `products/${id}/reviews`))
            .then((data) => {
              data.docs.map(async (item) => {
                await deleteDoc(doc(db, `products/${id}/reviews/${item.id}`));
              });
            })
            .then(async () => {
              // delete product
              await deleteDoc(doc(db, `products/${id}`)).then(() => {
                const newData = data.filter((product) => product.id !== id);
                setData(newData);
                setLoading(false);
                toast.success(`${productName} deleted successfully`);
              });
            });
        }
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // Second way to delete a product
  // const { data, loading } = useGetData("products");
  // const handleDeleteProduct = async ({ id, productName }) => {
  //   try {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: `You won't be able to revert ${productName}!`,
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#d33",
  //       cancelButtonColor: "#3085d6",
  //       confirmButtonText: "Delete",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         await deleteDoc(doc(db, "products", id));
  //         toast.success(`${productName} deleted successfully`);
  //       }
  //     });
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <div className="text-center">
                <Spinner className="spinner" />
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {data && (
                  <tbody>
                    {data?.length > 0 &&
                      data.map((product) => {
                        const {
                          id,
                          imgUrl,
                          productName,
                          category,
                          price,
                          stock,
                        } = product;
                        return (
                          <tr key={id}>
                            <td>
                              <img src={imgUrl} alt={productName} />
                            </td>
                            <td>{productName}</td>
                            <td>{category}</td>
                            <td>${price}</td>
                            <td>{stock}</td>
                            <td>
                              <motion.button
                                whileTap={{ scale: 1.08 }}
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteProduct(product)}
                              >
                                Delete
                              </motion.button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </table>
            )}
            {!loading && data?.length === 0 && (
              <div className="text-center mt-5">
                <h2>No products found</h2>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
