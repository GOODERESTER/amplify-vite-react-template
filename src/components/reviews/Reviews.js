import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react';

const Reviews = ({getClothesData, clothes, reviews, setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const clothingId = params.clothingId;

    useEffect(()=>{
        getClothesData(clothingId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try{
            const response = await api.post("api/v1/reviews", {reviewBody:rev.value, reviewId:clothingId});

            const updateReviews = [...reviews,{body:rev.value}];
    
            rev.value="";
    
            setReviews(updateReviews);
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row>
                <Col>
                    <img src={clothes?.poster} alt=""/>
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r, index) => {
                            return(
                                <React.Fragment key = {index}>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>                                
                                </ React.Fragment>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews