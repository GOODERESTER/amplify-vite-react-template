import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Hero = ({clothes}) => {

    const navigate = useNavigate();

    function reviews(clothingId){
        navigate(`/Reviews/${clothingId}`);
    }

    return(
        <div className='clothes-carousel-container'>
            <Carousel>
                {
                    clothes?.map((item) =>{
                        return(
                            <Paper key={item.reviewId}>
                                <div className='clothes-card-container'>
                                    <div className='clothing-card' style={{"--img":`url(${item.backdrops[0]})`}}>
                                        <div className='clothing-detail'>
                                            <div className='clothing-poster'>
                                                <img src={item.poster} alt={item.title} />
                                            </div>
                                            <div className='clothing-title'>
                                                <h4>{item.title}</h4>
                                            </div>
                                            <div className="clothing-buttons-container">
                                                <Link to={item.trailerLink? `Trailer/${item.trailerLink.substring(item.trailerLink.length-11)}`:'Trailer/default'}>
                                                    <div className="play-button-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon" 
                                                            icon={faCirclePlay}/>
                                                    </div>
                                                </Link>

                                                <div className="clothes-review-button-container">
                                                    <Button variant="info" onClick={() => reviews(item.reviewId)}>Reviews</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Hero