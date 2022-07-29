import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
const BlogList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("https://public-api.wordpress.com/rest/v1.1/sites/adilj13.wordpress.com/posts/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data.posts);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {users.map(user => (
                <li key={(user.slug).toString()}>
                    <Link to={`${user.slug}`}>{user.title}</Link>
                </li>
                ))}
            </ul>
        );
    }
}

export default BlogList;