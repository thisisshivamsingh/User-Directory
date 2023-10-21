import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ userDetails }) => {
  return (
    <>
      {userDetails[0] &&
        userDetails.map((elememt) => {
          return (
            <React.Fragment key={elememt.id}>
              <Link to={`/${elememt.name}`}>
                <div className="w-5/6 mx-auto mt-4">
                  <div className="bg-blue-200 border border-black rounded-lg p-4 flex justify-between items-center">
                    <div className="text-lg font-semibold">
                      Name: {elememt.name}
                    </div>
                    <div className="text-lg font-semibold">
                      Posts: {elememt.posts.length}
                    </div>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          );
        })}
    </>
  );
};

export default UserCard;
