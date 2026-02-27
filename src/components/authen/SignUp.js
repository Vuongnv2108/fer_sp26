import { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [account, setAccount] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const Role = 'user'; // Default role

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:9999/accounts")
      .then(res => res.json())
      .then(result => setAccount(result));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newId = Math.random().toString(36).substr(2, 9);
    const newAccount = { id: newId, email, password, dateOfBirth, gender, Role };

    if (validProduct(newAccount)) {
      fetch("http://localhost:9999/accounts", {
        method: "POST",
        body: JSON.stringify(newAccount),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(res => res.json())
        .then(result => {
          if (result) {
            alert(`${result.email} create success`);
            navigate('/auth/Sign-in');
          }
        })
    }
  };

  const handleSignIn = () => {
    navigate('/auth/Sign-in');
  }

  function validProduct({ id, email, password, dateOfBirth, gender, Role }) {
    let msg = '';

    if (!account) {
      msg += "Account information is not available yet. Please try again later.";
      return false;
    }

    if (email === "") {
      msg += "Email is required.\n";
    } else {
      const existingAccount = account.find(p => p.email === email);
      if (existingAccount) {
        msg += "This email already exists.";
      }
    }

    if (password === "") {
      msg += "Password is required.\n";
    } else {
      if (password.length < 8) {
        msg += "Password must be at least 8 characters long.\n";
      }
    }

    if (dateOfBirth === "") {
      msg += "Date of Birth is required.\n";
    } else if (!dateOfBirth.match(/^\d{4}-\d{2}-\d{2}$/)) {
      msg += "Invalid Date of Birth format. Please use YYYY-MM-DD format.\n";
    }

    if (gender === "") {
      msg += "Gender is required.\n";
    } else if (!["male", "female", "other"].includes(gender)) {
      msg += "Invalid gender. Please select from 'male', 'female', or 'other'.\n";
    }

    if (msg.length !== 0) {
      alert(msg);
      return false;
    }

    return true;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>Sign Up</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="female">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="other">Other</label>
              </div>
            </Form.Group>
            <Form.Group className='mb-3'>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" size="lg">
                  Sign Up
                </Button>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <p className="mb-0">You have an account?</p>
                  <Button variant="link" onClick={handleSignIn} className="ms-2">
                    Sign In
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
