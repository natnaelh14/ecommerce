import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GrLinkedinOption, GrGithub, GrMail } from 'react-icons/gr';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; SpiceLand & Co.</Col>
        </Row>
        <Row>
          <Col className='text-center' md="2" >
            {' '}
            <a
              href='https://www.linkedin.com/in/natnael-haile-b146b41bb/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GrLinkedinOption />
            </a>
          </Col>
          <Col className='text-center' md="2">
            {' '}
            <a
              href='https://github.com/natnaelh14'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GrGithub />
            </a>
          </Col>
          <Col className='text-center' md="2">
            {' '}
            <a
              href='mailto:haile.natnael@natnaeldev.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GrMail />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
