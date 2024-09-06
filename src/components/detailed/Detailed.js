import './Detailed.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';

import React from 'react';

const Detailed = ({ getItemData, getReviews, clothing, reviews }) => {
    let params = useParams();
    const id = params.clothingId;

    const navigate = useNavigate();

    useEffect(() => {
        getItemData(id);
        getReviews(id);
    }, [id, getItemData, getReviews]);

    function navToReviews(clothingId){
        navigate(`/Reviews/${clothingId}`);
    }

    function navToSearch(query){
        navigate(`/Search/${query}`)
    }

    return (
        <div className="item-container">
            <Row>
                <Col md={6}>
                    <div className="carousel-container">
                        <Carousel className="carousel">
                            {clothing?.backdrops && clothing.backdrops.map((item, index) => (
                                <div className="clothes-img-container" key={index}>
                                    <img src={item} alt={`Clothing ${index}`} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </Col>
                <Col md={6}>
                    <Row className='title-row'>
                        <div>
                            <h1 className='title-text'>{clothing?.title}</h1>
                        </div>
                    </Row>
                    <Row>
                        <hr className='title-bar'/>
                    </Row>
                    <Row className='description-row'>
                        <div>
                            <h6 className="description-body">{clothing?.releaseDate}</h6> {/*Temp solution for description */}
                        </div>
                    </Row>
                    <Row>
                        <hr className='description-bar'/>
                    </Row>
                    <Row className='tags-row'>
                        <div className='tags-container'>
                            {clothing?.genres.map((item, index) =>(
                                <Button variant='info' className='tags-button' onClick={() => navToSearch(item)} key={index}>{
                                    `${item}`}
                                </Button>
                            ))}
                        </div>
                    </Row>
                    <Row>
                        <hr className='tags-bar'/>
                    </Row>
                    <Row className='review-button-row'>
                        <div className="clothes-review-button-container">
                            <Button variant="info" onClick={() => navToReviews(clothing?.reviewId)}>Reviews</Button>
                        </div>
                    </Row>
                    <Row>
                        <hr className='review-button-bar'/>
                    </Row>
                    <Row className='comments-row' style={{ height: '200px', overflow: 'auto' }}>
                        {reviews?.map((r, index) => {
                            return(
                                <React.Fragment key = {index}>
                                    <Row className='comment-body'>
                                        <Col>{r.body}</Col>
                                    </Row>                
                                </ React.Fragment>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </div>
        
    );
}

export default Detailed;
