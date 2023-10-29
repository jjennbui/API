import React, { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const urlPosts = `https://jsonplaceholder.typicode.com/posts`;
    const urlUsers = `https://jsonplaceholder.typicode.com/users`;

    async function fetchData() {
      try {
        const postsResponse = await fetch(urlPosts);
        const usersResponse = await fetch(urlUsers);

        if (postsResponse.ok && usersResponse.ok) {
          const postsData = await postsResponse.json();
          const usersData = await usersResponse.json();

          setPosts(postsData);
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Combine the posts data with user data
  const combinedData = posts.map((post) => ({
    ...post,
    user: users.find((user) => user.id === post.userId)
  }));

  return (
    <div className="container">
      {combinedData.map((data) => (
        <div key={data.id} className="article">
          <h2>{data.title}</h2>
          <div className="author">
            <p>By: {data.user.name}</p>
            <p>{data.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
