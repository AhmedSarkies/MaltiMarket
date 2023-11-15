import React from "react";

import { Container, Row, Col, Spinner } from "reactstrap";

import { motion } from "framer-motion";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import useGetData from "../hooks/useGetData";

const Users = () => {
  const { data, setData, loading, setLoading } = useGetData("users");

  const handleDeleteUser = async ({ id, displayName }) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert ${displayName}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          await deleteDoc(doc(db, "users", id))
            .then(() => {
              const newData = data.filter((user) => user.id !== id);
              setData(newData);
              toast.success(`${displayName} deleted successfully`);
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
            <h4 className="mb-5 fw-bold">Users</h4>
          </Col>
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
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {data && (
                  <tbody>
                    {data?.length > 0 &&
                      data.map((user) => {
                        const { uid, photoURL, displayName, email } = user;
                        return (
                          <tr key={uid}>
                            <td>
                              <img src={photoURL} alt={displayName} />
                            </td>
                            <td>{displayName}</td>
                            <td>{email}</td>
                            <td>
                              <motion.button
                                whileTap={{ scale: 1.08 }}
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteUser(user)}
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

export default Users;
