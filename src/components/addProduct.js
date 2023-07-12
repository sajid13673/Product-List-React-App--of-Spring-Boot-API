import React from "react";
import ProductForm from './productForm';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function AddProduct(props){
    const navigate = useNavigate();
    function handleAdd(event, formData){
        event.preventDefault();
        const fData = new FormData();
        fData.append("product",formData);
        const fmdata = {"product" : formData,
    "image": {
        "imageName" : "",
        "imageLink" : "" 
    }};
        console.log(formData);
        console.log("fData :"+ fData);
    axios.post('http://localhost:8080/api/v1/product', fmdata).then(
        console.log("created")
    )
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