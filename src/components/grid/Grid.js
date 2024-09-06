import './Grid.css';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

const Grid = ({ clothes }) => {
    const navigate = useNavigate();

    function toDetailed(clothingId) {
        navigate(`/Detailed/${clothingId}`);
    }

    return (
        <Container className="item-container">
            <Row>
                {clothes?.map((item) => {
                    return (
                        <Col key={item.reviewId} xs={12} sm={6} md={4} lg={3} className="grid-item" onClick={() => toDetailed(item.reviewId)}>
                            <div className="item-content">
                                <img src={item.poster} alt={item.title} className="item-image" />
                                <h4>{item.title}</h4>
                                <p>{item.releaseDate}</p>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default Grid;
