import axios from "axios";
import React, { useRef, useState } from "react";
import Swal from 'sweetalert2';

function AddProducts() {

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [imageSize, setImageSize] = useState(null);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const fileInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Client-side validation
    if (!productName || !productDescription || !productPrice || !file) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form Submission',
        text: 'Please fill in all the required fields and select an image.',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', fileName);
  
    try {
      const response = await axios.post('http://localhost:3005/products/addProduct', {
        productName,
        productDescription,
        productPrice,
        productQuantity,
      });
      const id = response.data.id;
  
      await axios.post(`http://localhost:3005/products/uploadImage/${id}`, formData);
  
      console.log('Product added successfully!', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Product Added Successfully!',
        text: 'Your new product has been added to the inventory.',
      });
  
      // Reset the form after successful submission
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductQuantity(1);
      setFile(null);
      setFileName('');
      fileInput.current.value = ''; 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Product Addition Failed',
        text: 'There was an error adding the product. Please try again.',
      });
      console.error('Error adding product:', error.response.data);
    }
  };

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const handleImageChange = (e) => {
    setFile(fileInput.current.files[0])
    setFileName(fileInput.current.files[0].name)
  };
  return (
    <div className="container mt-5 ">
      <h2  >Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">Product Description:</label>
          <textarea
            className="form-control"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Product Price:</label>
          <input
            type="text"
            className="form-control"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">Product Quantity:</label>
          <div className="d-flex align-items-center">
            <button type="button" className="btn btn-secondary me-4" onClick={decreaseQuantity}>-</button>
            <span>{productQuantity}</span>
            <button type="button" className="btn btn-secondary ms-4" onClick={increaseQuantity}>+</button>
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">Product Image:</label>
            <input
              type="file" className="form-control" name="image" ref={fileInput} id="productImage" accept="image/*"
              onChange={handleImageChange}
            />
            {imageSize && (
              <p>Selected image size: {imageSize.toFixed(2)} MB</p>
            )}
          </div>
        </div >
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary ">Add Product</button>
        </div>
      </form>
    </div>

  );
}

export default AddProducts;
