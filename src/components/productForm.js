import React from 'react';

export default function ProductForm(props){
    const [formData, setFormData] = React.useState({
        sku: "",
        name:"",
        price:"",
        status:false
    })
    function handleChange(event){
        const name = event.target.name;
        const type = event.target.type;
        const value = event.target.value;
        const checked = event.target.checked;
        setFormData(prevFormData=>{return{...prevFormData, [name] : type === 'checkbox' ? checked : value}});
    }
    function handleSubmit(event){
        if(props.updateStatus == undefined){
        props.handleAdd(event, formData);
    }
        else if(props.updateStatus) {
            props.handleEdit(event, formData);
        }
    }
    React.useEffect(()=>{
      if(props.updateStatus != undefined && props.updateStatus)
      {
      console.log(props.productWithId);
      console.log(props.updateStatus);
      const productWithId = props.productWithId;
      setFormData({
        sku: productWithId.sku,
        name: productWithId.name,
        price: productWithId.price,
        status: productWithId.status
      });
    }
    },[props.productWithId])
    return(
        <div className="div-form"> 
        <h1>product form</h1>
        <form
          id="product-form"
          onSubmit={handleSubmit}
          encType="multipart/form"
        >
          <p>SKU:</p>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <p>Price:</p>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {/* <p>Image:</p>
          <input
            type="file"
            className="file-input"
            name="imageFile"
            onChange={handleImage}
          /> */}
          <p>Status:</p>
          <label className="toggle">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
            <span className="slider"></span>
            <span
              className="labels"
              data-on="Active"
              data-off="Inactive"
            ></span>
          </label>
        </form>
      </div>
    )
}