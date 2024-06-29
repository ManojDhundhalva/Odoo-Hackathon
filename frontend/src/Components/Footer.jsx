import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-white text-center text-lg-left' style={{ backgroundColor: '#296066', position: 'relative', bottom: 0, width: '100%' }}>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Our Vision</h5>
            <p>
              At E-CycleNet, we are dedicated to delivering innovative solutions and services that meet the evolving needs of our customers. Our commitment to excellence drives us to continuously improve and provide exceptional support.
            </p>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Links</h5>
            <ul className='list-unstyled mb-0'>
              <li>
                <a href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master' className='text-white'>
                  Link 1
                </a>
              </li>
              <li>
                <a href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master' className='text-white'>
                  Link 2
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0'>Links</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master' className='text-white'>
                  Link 1
                </a>
              </li>
              <li>
                <a href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master' className='text-white'>
                  Link 2
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
        
        {/* Social Media Buttons */}
        <section className='d-flex justify-content-center mb-2'>
          <MDBBtn
            floating
            className='m-1'
            style={{
              backgroundColor: '#3b5998',
              boxShadow: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'none'
            }}
            href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{
              backgroundColor: '#55acee',
              boxShadow: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'none'
            }}
            href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{
              backgroundColor: '#dd4b39',
              boxShadow: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'none'
            }}
            href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master'
            role='button'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{
              backgroundColor: '#ac2bac',
              boxShadow: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'none'
            }}
            href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{
              backgroundColor: '#0082ca',
              boxShadow: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'none'
            }}
            href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master'
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{
              backgroundColor: '#333333',
              boxShadow: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'none'
            }}
            href='https://github.com/Dharmesh-Kota/Odoo-Hackathon/tree/master'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright
      </div>
    </MDBFooter>
  );
}
