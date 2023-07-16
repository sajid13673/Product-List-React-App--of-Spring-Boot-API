import React from "react";
import ProductForm from './productForm';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {storage} from './../firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

export default function EditProduct(props){
    
    const location = useLocation();
    const [productWithID, setProductWithID] = React.useState([]);
    const id = location.state.id;
    const navigate = useNavigate()

    React.useEffect(() => {
        axios
          .get(`http://localhost:8080/api/v1/product/${id}`)
          .then(function (response) {
            setProductWithID(response.data);
            //console.log(response.data);
          });
        props.setUpdate(true);
        props.setNavStatus(true);
      }, []);

    function handleEdit(event, formData) {
      event.preventDefault();
      console.log(formData)

      if (formData.imageFile == "") {
        console.log("no image")
        const fData = {
          product: formData,
          image: {
            imageName: "",
            imageLink: "",
          },
        };
        axios
          .put(`http://localhost:8080/api/v1/product/${id}`, fData)
          .then(console.log("edited"));
      } else {
        console.log("with image");
        const imageName = `${formData.sku}_${formData.imageFile.name}`;
        const imageRef = ref(storage, `images/${imageName}`);

          uploadBytes(imageRef, formData.imageFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
            const fmData = {
                product: formData,
                image: {
                    imageName: imageName,
                    imageLink: url
                }
            }
                axios
                .put(`http://localhost:8080/api/v1/product/${id}`, fmData)
                .then(function (response) {
                    console.log(response.data)
                  // navigate("/");
                  // props.setNavStatus(false)
                  // props.getProducts();
                });
          });
            });
      }
    }

    return(
        <div>
            <ProductForm
            updateStatus={props.updateStatus}
            productWithId = {productWithID}
            handleEdit = {(event, formData)=>handleEdit(event,formData)}
            />
        </div>
    )
}