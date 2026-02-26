import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//component user
import Headers from "./Components/user/Header";
import Banner from "./Components/user/Banner";
import Home from "./Components/user/Homepage";
import Footer from "./Components/user/Footer";
import DetailProduct from "./Components/user/DetailProduct";
import SignUp from "./Components/authen/SignUp";
import SignIn from "./Components/authen/SignIn";
import AddToCart from "./Components/user/AddToCart";
import Profile from "./Components/user/Profile";
import ProductDetail from "./Components/user/ProductDetail";
import PaymentForm from "./Components/user/PaymentForm";
import PaymentSuccess from "./Components/user/PaymentSuccess";
//component admin
import ViewProductAdmin from "./Components/admin/ViewProductAdmin";
import UpdateProduct from "./Components/admin/UpdateProduct";
import AddProduct from "./Components/admin/AddProduct";
import ViewAccounts from "./Components/admin/ViewAccounts";
import OrderList from "./Components/admin/OrderList";
function App() {
  return (
    <Router>
      <Container fluid>
        <Routes>
          <Route path="/auth/Sign-up" element={<SignUp />} />
          <Route path="/auth/Sign-in" element={<SignIn />} />
          <Route path="/admin" element={<ViewProductAdmin />} />
          <Route path="/admin/product/update/:id" element={<UpdateProduct />} />
          <Route path="/admin/product/create" element={<AddProduct />} />
          <Route path="/admin/accounts" element={<ViewAccounts />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/product/:id/viewdetail" element={<DetailProduct />} />
          <Route path="/add/to/cart" element={<AddToCart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route
            path="/"
            element={
              <>
                {/* Header (Không có khoảng cách) */}
                <Row>
                  <Col>
                    <Headers />
                  </Col>
                </Row>

                {/* Banner (Không có khoảng cách) */}
                <Row className="d-flex justify-content-center align-items-center">
                  <Col sm={12} xs={12}>
                    <Banner />
                  </Col>
                </Row>

                {/* Home (Thêm khoảng cách) */}
                <Row className="mt-4 mb-4">
                  <Col sm={10}>
                    <Home />
                  </Col>
                </Row>

                {/* Footer (Thêm khoảng cách) */}
                <Row className="mt-4">
                  <Col sm={12}>
                    <Footer />
                  </Col>
                </Row>
              </>
            }
          />
          <Route path="/product/:id" component={ProductDetail} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
