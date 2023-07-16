import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ProductList from './components/productList';
import AddProduct from './components/addProduct';
import EditProduct from './components/editProduct';
import {Route, Routes, useNavigate} from 'react-router-dom';
import axios from "axios";
import { storage } from "./firebase";
import {ref, deleteObject} from "firebase/storage";

export default function App(){
  const [products, setProducts] = React.useState([]);
  const [productStatus, setProductStatus] = React.useState(false);
  const navigate = useNavigate();
  const productList = products.map((item) => {
    return (
      <ProductList
        key={item.id}
        name={item.name}
        sku={item.sku}
        price={item.price}
        handleDelete={() => handleDelete(item.id, item.image)}
        image={item.image}
        status={item.status}
        handleEdit={() => handleEdit(item.id)}
        // handleDelete = {()=>handleDelete(item.id, item.images)}
        //handleStatus = {()=>handleStatus(item.id, item.status)}
      />
    );
  });
  const emptyList = (
    <div className="emptyList">
      {" "}
      <h1>Product List is empty</h1>{" "}
    </div>
  );

  function getProducts() {
    axios.get("http://localhost:8080/api/v1/product").then(function (response) {
      setProducts(response.data);
      // if(response.data.length != 0){
      setProductStatus(true);
      // }
      console.log("get", response.data);
    });
    console.log("products");
  }
  function deleteFromFireBase(imageName) {
    //if(imageName != null){
    const desertRef = ref(storage, `images/${imageName}`);
    deleteObject(desertRef);
    //}
  }
  function handleDelete(id, image) {
    axios.delete("http://localhost:8080/api/v1/product/" + id).then(() => {
      if (image !== null) {
        console.log(image.imageName);
        deleteFromFireBase(image.imageName);
        getProducts();
        console.log("deleted : " + id);
      }
    });
  }
  const [navStatus, setNavStatus] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  function handleEdit(id) {
    navigate("edit-product", { state: { id: id } });
  }

  React.useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <Navbar
        navStatus={navStatus}
        updateStatus={update}
        setUpdate={(status) => setUpdate(status)}
        setNavStatus={(status) => setNavStatus(status)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="product_list">
              <div className="products">
                {productStatus ? productList : emptyList}
              </div>
            </div>
          }
        />
        <Route
          path="add-product"
          element={
            <AddProduct
              updateStatus={update}
              getProducts={() => getProducts()}
              setNavStatus={(status) => setNavStatus(status)}
            />
          }
        />
        <Route
          path="edit-product"
          element={
            <EditProduct
              setUpdate={(status) => setUpdate(status)}
              updateStatus={update}
              setNavStatus={(status) => setNavStatus(status)}
              getProducts={() => getProducts()}
              deleteFromFireBase={(imageName) => deleteFromFireBase(imageName)}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}