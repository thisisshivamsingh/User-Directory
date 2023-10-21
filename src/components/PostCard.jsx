import React, { useState, useRef, useEffect } from "react";

function PostCard({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-[500px] flex justify-center p-5">
        <div
          className="border border-black rounded-lg p-4 w-40  flex   break-words items-center flex-col justify-between"
          onClick={() => setIsOpen(true)}
        >
          <p className="text-wrap w-full  text-center font-bold">
            {post.title && post.title}
          </p>
          <p className="text-wrap w-full  text-center">
            {post.body && post.body}
          </p>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-[500px] flex justify-center p-5 bg-white"
            ref={popupRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 w-40  flex   break-words items-center flex-col justify-between">
              <p className="text-wrap w-full  text-center font-bold">
                {post.title && post.title}
              </p>
              <p className="text-wrap w-full  text-center">
                {post.body && post.body}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;
