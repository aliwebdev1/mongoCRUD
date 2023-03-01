import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users)

    const handleDelete = user => {
        const agree = window.confirm(`Are you want to delete ${user.name}`)
        if (agree) {
            // console.log(`deleted id is ${user._id}`);
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount > 0) {
                        alert("User Deleted Successfully");
                        const remainingUser = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUser)
                    }
                    // console.log(data)
                })
        }


    }

    return (
        <div>
            <h2>This is home</h2>
            <h3>Users: {displayUsers.length}</h3>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>
                        Name: {user.name} + Email: {user.email}

                        <Link to={`/update/${user._id}`}> <button>Update</button></Link>
                        <button onClick={() => handleDelete(user)}>X</button>

                    </p>)
                }
            </div>

        </div>
    );
};

export default Home;