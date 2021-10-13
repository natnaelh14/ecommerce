import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GrLinkedinOption, GrGithub, GrMail } from 'react-icons/gr';

const Footer = () => (
  <footer style={{ marginTop: '50px' }}>
    <Container>
      <Row>
        <Col className="text-center">
          Copyright &copy; 2021 SpiceLand & Co. Natnael Haile
        </Col>
      </Row>
      <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ margin: '25px' }}>
          <a
            href="https://www.linkedin.com/in/natnael-haile-b146b41bb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrLinkedinOption />
          </a>
        </div>
        <div style={{ margin: '25px' }}>
          <a
            href="https://github.com/natnaelh14"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrGithub />
          </a>
        </div>
        <div style={{ margin: '25px' }}>
          <a
            href="mailto:haile.natnael@natnaeldev.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrMail />
          </a>
        </div>
      </section>
    </Container>
  </footer>
);

export default Footer;
