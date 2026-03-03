import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Card, Pagination, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaBuilding } from 'react-icons/fa';
import Search from './Search';

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    axios.get('http://localhost:9999/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));

    axios.get('http://localhost:9999/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (categoryName) => {
    if (categoryName === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === categoryName);
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar Categories */}
        <Col sm={3}>
          <ListGroup>
            <h3>List Categories</h3>
            <ListGroup.Item action onClick={() => handleCategoryClick('All')}>
              <FaBuilding className="me-2" /> All Categories
            </ListGroup.Item>
            {categories.map(category => (
              <ListGroup.Item
                key={category.id}
                action
                onClick={() => handleCategoryClick(category.name)}
              >
                <FaBuilding className="me-2" /> {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Product Grid */}
        <Col sm={9}>
          <Row className="mb-3">
            <Search setSearchTerm={setSearchTerm} />
          </Row>
          
          <Row>
            {currentProducts.map(p => (
              <Col sm={4} key={p.id} className="mb-4">
                <Card className="mx-auto text-center shadow-sm" style={{ width: '18rem', height: '100%' }}>
                  <Card.Img 
                    variant="top" 
                    src={p.image} 
                    style={{ height: '200px', objectFit: 'cover' }} 
                  />
                  <Card.Body>
                    <Card.Title className="text-truncate">{p.name}</Card.Title>
                    <Card.Text className="text-danger fw-bold">Price: {p.price} VND</Card.Text>
                    <Link to={`/product/${p.id}/viewdetail`}>
                      <Button variant="warning">
                        <FaEye className="me-2" /> View Detail
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination Centered */}
          <Row className="justify-content-center mt-4">
            <Col sm="auto">
              <Pagination>
                {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
                  <Pagination.Item
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    active={number + 1 === currentPage}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
