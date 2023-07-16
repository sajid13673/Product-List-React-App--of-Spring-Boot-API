import React from "react";
import ProductForm from './productForm';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {storage} from './../firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

export default function AddProduct(props){
    const navigate = useNavigate();

    function handleAdd(event, formData){
        event.preventDefault();
        if (formData.imageFile == "") {
          const fmdata = {
            product: formData,
            image: {
              imageName: "",
              imageLink: "",
            },
          };
          console.log(formData);
            axios
              .post("http://localhost:8080/api/v1/product", fmdata)
              .then((response) => {
                console.log(response.data);
                navigate("/");
                props.setNavStatus(false);
                props.getProducts();
              }).catch((err)=>{
                console.log("error");
                console.log(err);
                console.log(err.response.data);
              })
        } else {
          const imageName = `${formData.sku}_${formData.imageFile.name}`;
          const imageRef = ref(storage, `images/${imageName}`);

          uploadBytes(imageRef, formData.imageFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              const fmData = {
                product: formData,
                image: {
                  imageName: imageName,
                  imageLink: url,
                },
              };
              axios
                .post("http://localhost:8080/api/v1/product", fmData)
                .then(function (response) {
                  console.log(response.data);
                  navigate("/");
                  props.setNavStatus(false);
                  props.getProducts();
                });
            });
          });

          //new try
          //   uploadBytes(imageRef, formData.imageFile)
          //     .then((snapshot) => {
          //       getDownloadURL(snapshot.ref).then((url) => {
          //         (function () {
          //           console.log("image setted 1");
          //           setImage({
          //             imageName: imageName,
          //             imageLink: url,
          //           });
          //         })();
          //       }).then(()=>{
          //       (() => {
          //         console.log("fmData setted 2");
          //         setFmData({
          //           product: formData,
          //           image: image,
          //         });
          //       })();})
          //     })
          //     .then(() => {
          //       console.log("fmData ready 3" + fmData);
          //       axios
          //         .post("http://localhost:8080/api/v1/product", fmData)
          //         .then(function (response) {
          //           console.log(response.data);
          //           //   navigate("/");
          //           //   props.setNavStatus(false)
          //           //   props.getProducts();
          //         });
          //     });
        }
}
    React.useEffect(()=>{
        props.setNavStatus(true);
    },[])

    return(
        <div>
            <ProductForm
            handleAdd = {(event, formData)=>handleAdd(event,formData)}
            />
        </div>
    )
}