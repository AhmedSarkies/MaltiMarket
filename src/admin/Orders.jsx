import React, { Fragment, useState } from "react";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

import { Container, Row, Col, Spinner } from "reactstrap";

import "../styles/all-products.css";

import useGetData from "../hooks/useGetData";
import { db } from "../firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Orders = () => {
  const [showSubRow, setShowSubRow] = useState(false);

  const { data, setData, loading, setLoading } = useGetData("orders");

  const handleDeleteProduct = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          await deleteDoc(doc(db, `orders/${id}`))
            .then(() => {
              const newData = data.filter((product) => product.id !== id);
              setData(newData);
              toast.success(`deleted successfully`);
            })
            .then(() => {
              setLoading(false);
            });
        }
      });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

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
                    <th>User ID</th>
                    <th>Username</th>
                    <th>User Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(
                    ({ id, userId, userName, userEmail, products }, index) => {
                      return (
                        <Fragment key={index}>
                          <tr
                            key={id + index}
                            className="orders-main-row"
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#f5f5f5",
                            }}
                            onClick={() => setShowSubRow(!showSubRow)}
                          >
                            <td>{userId}</td>
                            <td>{userName}</td>
                            <td>{userEmail}</td>
                            <td>
                              <motion.button
                                whileTap={{ scale: 1.08 }}
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteProduct(id)}
                              >
                                Delete
                              </motion.button>
                            </td>
                          </tr>
                          {showSubRow ? (
                            <tr key={id + index + userId}>
                              <td colSpan="4" className={`orders-sub-row`}>
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Product Image</th>
                                      <th>Product ID</th>
                                      <th>Product Name</th>
                                      <th>Price</th>
                                      <th>Qty</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {products.map(
                                      (
                                        {
                                          id: productId,
                                          productName,
                                          price,
                                          quantity,
                                          imgUrl,
                                        },
                                        idx
                                      ) => {
                                        return (
                                          <tr key={productId + id + idx}>
                                            <td>
                                              <img
                                                src={imgUrl}
                                                alt={productName}
                                                width="50"
                                                height="50"
                                              />
                                            </td>
                                            <td>{productId}</td>
                                            <td>{productName}</td>
                                            <td>{price}</td>
                                            <td>{quantity}</td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          ) : null}
                        </Fragment>
                      );
                    }
                  )}
                </tbody>
              </table>
            )}
            {!loading && data?.length === 0 && (
              <div className="text-center mt-5">
                <h2>No orders found</h2>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
