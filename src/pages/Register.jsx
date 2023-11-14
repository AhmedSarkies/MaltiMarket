import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup, Spinner } from "reactstrap";

import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase.config";

import { Helmet } from "../components";

import "../styles/login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const type = image?.type?.split("/")[1];

  const reset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setImage("");
    setImagePreview("");
  };

  const handleCreateBase64 = useCallback(async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImagePreview(base64);
    e.target.value = "";
  }, []);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        toast.error("Image does not exist");
      } else {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      }
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const deleteImage = (e) => {
    e.preventDefault();
    setImagePreview(null);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setLoading(false);
        toast.success("Account Created Successfully");
        reset();
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const storageRef = ref(
        storage,
        user.uid && `images/${user.uid}/profile/${username}_${user.uid}.${type}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.then(() => {
        getDownloadURL(storageRef)
          .then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });
            // Add User To Firebase Database
            const usersCol = collection(db, "users");
            const userDoc = {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            };
            const myDocRef = doc(usersCol, user.uid);
            await setDoc(myDocRef, userDoc);
          })
          .then(() => logout());
      });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);

  return (
    <Helmet title={"Register"}>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="m-auto text-center">
                <Spinner className="spinner" />
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="text-center fw-bold mb-4">Register</h3>
                <Form className="auth-form" onSubmit={handleRegister}>
                  <FormGroup className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      required
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      required
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    {!imagePreview && (
                      <label
                        htmlFor="image"
                        className="add-image-label w-100 border border-1 border-light"
                      >
                        <i className="ri-image-add-line text-light fs-2"></i>
                        <input
                          type="file"
                          className="form-control add-image-input"
                          id="image"
                          required
                          accept="image/*, png, jpg, jpeg"
                          onChange={(e) => {
                            handleCreateBase64(e);
                            setImage(e.target.files[0]);
                          }}
                        />
                      </label>
                    )}
                    {imagePreview && (
                      <div className="border border-1 border-light d-flex justify-content-center align-items-center gap-4 p-3">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={imagePreview}
                          alt="Image"
                          className="image-preview d-block"
                        />
                        <motion.button
                          whileTap={{ scale: 1.08 }}
                          className="btn btn-danger btn-sm d-block"
                          onClick={deleteImage}
                        >
                          <i className="ri-delete-bin-6-line"></i>
                        </motion.button>
                      </div>
                    )}
                  </FormGroup>
                  <motion.button
                    whileTap={{ scale: 1.08 }}
                    type="submit"
                    className="shop-btn auth-btn mt-2"
                  >
                    Register
                  </motion.button>
                  <div className="mt-2">
                    <Link to="/login" onClick={reset}>
                      Do you have an account?
                    </Link>
                  </div>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
