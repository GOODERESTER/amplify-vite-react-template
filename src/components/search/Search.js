import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import Filters from './Filters';
import Sider from 'antd/es/layout/Sider';
import { useNavigate, useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import api from '../../api/axiosConfig';


const { Header, slider } = Layout;

const Search = ({ getItemData, getReviews, clothing, query }) => {
    const [tags, setTags] = useState([]);
    const [queryResults, setResults] = useState([]);
    const location = useLocation();
    const curTag = location.pathname.split("/").pop();

    const navigate=useNavigate();

    useEffect(() =>{
        getTags();
        updateSearch(curTag);
    }, []);

    const getTags = async () => {
        try{
            const response = await api.get("/api/v1/clothes/tags");
            setTags(response.data);
        }
        catch(err){
            console.log(err);
        }
    }

    function toDetailed(clothingId) {
        navigate(`/Detailed/${clothingId}`);
    }

    const updateSearch = async (tag) => {
        try {
            const response = await api.get(`/api/v1/clothes/Search/${tag}`); // Use async/await
            console.log('Query Results:', response.data); // Log response data
            setResults(response.data);
        } catch (err) {
            console.log('Error fetching query results:', err); // Log error
        }
    };  

    return(
        <Layout>
            <Sider>
                <Menu className='tags-menu' theme='dark' mode="inline">
                    {tags?.map((item, index) =>(
                        <Menu.Item key={index} onClick={()=>updateSearch(item)}>
                            {item}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <body>
                {queryResults ? (queryResults?.map((item, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="grid-item" onClick={() => toDetailed(item.reviewId)}>
                        <div className="item-content">
                            <img src={item.poster} alt={item.title} className="item-image" />
                            <h4>{item.title}</h4>
                            <p>{item.releaseDate}</p>
                        </div>
                    </Col>
                    ))
                ): (
                    <div className='no-results'>
                        <h3>No Results Found</h3>
                    </div>
                )}
                {queryResults?.map((item, index) => (
                    <Col key={item.reviewId} xs={12} sm={6} md={4} lg={3} className="grid-item" onClick={() => toDetailed(item.reviewId)}>
                        <div className="item-content">
                            <img src={item.poster} alt={item.title} className="item-image" />
                            <h4>{item.title}</h4>
                            <p>{item.releaseDate}</p>
                        </div>
                    </Col>
                ))}
            </body>
        </Layout>
    );
}

export default Search