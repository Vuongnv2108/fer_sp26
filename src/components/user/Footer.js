import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#343a40', color: '#fff' }}>
      <Container fluid className="py-4">
        <div className="text-center">
          <h5 className="mb-3">Welcome to Our Store</h5>
          <p className="mb-2">
            Cảm ơn bạn đã ghé thăm! Hãy kết nối với chúng tôi qua các kênh bên dưới.
          </p>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <a href="https://facebook.com" className="text-white text-decoration-none">
              Facebook
            </a>
            <a href="https://instagram.com" className="text-white text-decoration-none">
              Instagram
            </a>
            <a href="https://tiktok.com" className="text-white text-decoration-none">
              TikTok
            </a>
          </div>
          <div style={{ borderTop: '1px solid #777' }} className="pt-3">
            © 2024 Copyright — <a href="https://mdbootstrap.com/" className="text-white text-decoration-none">MDBootstrap.com</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
