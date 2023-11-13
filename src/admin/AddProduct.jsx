import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, FormGroup, Spinner } from "reactstrap";

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import "../styles/add-product.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("DEFAULT");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

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

  const reset = () => {
    setTitle("");
    setShortDesc("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategory("DEFAULT");
    setImage("");
    setImagePreview("");
    document.getElementById("category").value = "DEFAULT";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const product = {
      productName: title,
      shortDesc,
      description,
      price,
      stock,
      category,
      imgUrl: image,
    };

    // Add product to Firebase
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          const docRef = collection(db, "products");

          await addDoc(docRef, {
            ...product,
            imgUrl: downloadURL,
          });
        });

        setLoading(false);
        toast.success("Product Added Successfully");
        reset();
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
            <h4 className="mb-5">Add Product</h4>
            <Form className="add-product-form" onSubmit={handleSubmit}>
              <FormGroup className="form-group">
                <label htmlFor="title" className="form-label">
                  Product Title
                </label>
                <input
                  required
                  type="text"
                  className="form-control p-2"
                  id="title"
                  placeholder="Double sofa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <label htmlFor="shortDesc" className="form-label">
                  Short Description
                </label>
                <input
                  required
                  type="text"
                  className="form-control p-2"
                  id="shortDesc"
                  placeholder="lorem...."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="form-control p-2"
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </FormGroup>
              <div className="d-flex justify-content-between gap-4">
                <FormGroup className="form-group w-25">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    className="form-control p-2"
                    id="price"
                    placeholder="100$"
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-group w-25">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    className="form-control p-2"
                    id="stock"
                    placeholder="10"
                    value={stock}
                    onChange={(e) => setStock(+e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-group w-50">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control p-2"
                    id="category"
                    defaultValue={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="DEFAULT" disabled>
                      Select Category
                    </option>
                    <option value="sofa">Sofa</option>
                    <option value="chair">Chair</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>
              <FormGroup className="form-group">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                {!imagePreview && (
                  <label
                    htmlFor="image"
                    className="add-image-label w-100 text-center form-control"
                  >
                    <i className="ri-image-add-line fs-1"></i>
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
                  <div className="form-control d-flex justify-content-center align-items-center gap-4 p-3">
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
              <button type="submit" className="shop-btn" disabled={loading}>
                {loading ? <Spinner size="sm" color="light" /> : "Add Product"}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProduct;
