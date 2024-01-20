import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultProductImage from '../nothing.jpg';

function Products() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3005/products/getProductList")
      .then((response) => {
        console.log(response);
        setProducts(response.data);
        setTotalProducts(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ProductCard = ({ product }) => {
    const { image, name, description, price, brand } = product;

    return (
      <div className="product-card">
        <img src={`http://localhost:3005${product.image}`} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Brand: {brand}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Product List</h1>

      <div className="d-flex justify-content-center">
        <Link to="/AddProducts" className="btn btn-success">
          Add product
        </Link>
      </div>
      
      <p>Total Products: {totalProducts}</p>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={product.image ? `http://localhost:3005/${product.image}` : defaultProductImage}
                  onError={(e) => { e.target.src = defaultProductImage }}
                  alt={product.name}
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
