import './LoadingSpinner.css';
import {Container, Spinner} from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <Container className="spinner-container">
      {/* <img src={SpinnerImage} alt='로딩' className='spinner-image' /> */}
      <Spinner animation="border" role="status" className="spinner" />
    </Container>
  );
};

export default LoadingSpinner;