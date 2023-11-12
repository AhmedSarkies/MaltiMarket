import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Container, Row, Col, Form, FormGroup, Spinner } from "reactstrap";
import { toast } from "react-toastify";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

import { Helmet } from "../components";

import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      reset();
      setLoading(false);
      toast.success("Login successfully");
      navigate("/checkout");
    } catch (error) {
      setLoading(false);
      setPassword("");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);

  return (
    <Helmet title={"Login"}>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="m-auto text-center">
                <Spinner className="spinner" />
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="text-center fw-bold mb-4">Login</h3>
                <Form className="auth-form" onSubmit={handleLogin}>
                  <FormGroup className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <motion.button
                    whileTap={{ scale: 1.08 }}
                    type="submit"
                    className="shop-btn auth-btn mt-2"
                  >
                    Login
                  </motion.button>
                  <div className="mt-2">
                    <Link to="/register" onClick={reset}>
                      Don't you have an account?
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

export default Login;
