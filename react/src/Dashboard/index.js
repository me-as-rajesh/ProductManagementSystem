import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  dashboardHeading: {
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    border: '1px solid #ddd',
    padding: '10px',
    width: '200px',
    textAlign: 'center',
  },
  cardImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  cardInfo: {
    marginTop: '10px',
  },
};

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3005/products/getProductList');
        console.log('response-------', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response.data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 style={styles.dashboardHeading}>Product Dashboard</h2>
      <div style={styles.cardContainer}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img src={`http://localhost:3005/${product.image}`} alt={product.name} style={styles.cardImage} />
            <div style={styles.cardInfo}>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
