import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container, Pagination, Button } from 'react-bootstrap';
import axios from 'axios';

function CardProduct() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState({}); // State to store quantities of each product
  const productsPerPage = 6;

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        const initialQuantities = {};
        response.data.forEach(product => {
          initialQuantities[product.id] = 0; // Initialize quantity to 0 for each product
        });
        setQuantity(initialQuantities);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const incrementQuantity = (productId) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [productId]: prevQuantity[productId] + 1
    }));
  };

  const decrementQuantity = (productId) => {
    if (quantity[productId] > 0) {
      setQuantity(prevQuantity => ({
        ...prevQuantity,
        [productId]: prevQuantity[productId] - 1
      }));
    }
  };

  return (
    <Container>
      <Row xs={12} md={2} lg={3} className="g-4">
        {currentProducts.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price} vnd</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center mt-4">
        <Pagination>
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
            <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </Container>
  );
}

export default CardProduct;
