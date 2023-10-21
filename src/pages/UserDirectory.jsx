import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";

const UserDirectory = () => {
  const [userDetails, setUserDetails] = useState([]);

  const userInfoWithPostDet = (users, posts) => {
    let usersIncludePost =
      users[0] &&
      users.map((elem) => {
        elem.posts = [];
        posts[0] &&
          posts.forEach((element) => {
            if (elem.id === element.userId) {
              elem.posts.push(element);
            }
          });
        return elem;
      });
    setUserDetails(usersIncludePost);
    localStorage.setItem("userDetails", JSON.stringify(usersIncludePost));
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.status === 200) {
          axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
              if (res.status === 200) {
                userInfoWithPostDet(response.data, res.data);
              }
            })
            .catch((error) => {
              console.error("Error Fetching Posts:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error Fetching Users:", error);
      });
  }, []);

  return (
    <div>
      <div className="w-screen text-center mt-10">
        <div className="inline-block">Directory</div>
      </div>
      {userDetails[0] && <UserCard userDetails={userDetails} />}
    </div>
  );
};

export default UserDirectory;
