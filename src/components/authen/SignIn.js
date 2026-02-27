import { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [account, setAccount] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch account data from server on component mount
    fetch("http://localhost:9999/accounts")
      .then(res => res.json())
      .then(result => setAccount(result));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const user = account.find(acc => acc.email === email && acc.password === password);
  
    if (user) {
      // Kiểm tra user có `id` hay không
      if (!user.id) {
        alert("User ID is missing! Please check your database.");
        return;
      }
  
      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Kiểm tra lưu thành công chưa
      console.log("User saved to localStorage:", localStorage.getItem("user"));
  
      // Điều hướng dựa vào role
      if (user.Role?.toLowerCase() === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert("Invalid email or password");
    }
  };
  
  const handleSignUp = () =>{
    navigate('/auth/Sign-up')
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>Sign In</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Sign In
              </Button>
              <div className="d-flex justify-content-center align-items-center mt-3">
                <p className="mb-0">Don't have an account?</p>
                <Button variant="link" onClick={handleSignUp} className="ms-2">
                  Sign Up
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;

