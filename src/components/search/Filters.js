import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';



const { Header, slider } = Layout;

const Filters = ({ getItemData, getReviews, clothing, query }) => {

    const [tags, setTags] = useState([]);
    const [queryResults, setResults] = useState([]);

    const navigate=useNavigate();

    useEffect(() =>{
        getTags();
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

    function updateSearch(tag){
        try{
            const response = api.get(`api/v1/clothes/Query/${tag}`)

            setResults(response.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <Menu className='tags-menu' theme='dark' mode="inline">
                {tags?.map((item, index) =>(
                    <Menu.Item onClick={()=>updateSearch(item)}>
                        {item}
                    </Menu.Item>
                ))}
        </Menu>
    );
}

export default Filters