import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom'

function BlogDetails () {
    const { slug } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        fetch("https://public-api.wordpress.com/rest/v1.1/sites/adilj13.wordpress.com/posts/slug:" + slug)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setUser(data);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }  
    
    if (user) {
        return (
            <div>
                <h1>{user.title}</h1>
                <div>
                    Content: {user.content}
                </div>
                <div>
                    Phone: {user.data}
                </div>
                <div>
                    Website: {user.website}
                </div>
            </div>
        );
    }
}

export default BlogDetails;