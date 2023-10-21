import React, { useState } from "react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import momentTimezone from "moment-timezone";
import moment from "moment";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("--/--");
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [timezone, setTimezone] = useState("");
  const [stopButton, setStopButton] = useState(true);
  const [stoppedTime, setStoppedTime] = useState("");
  const [stoppedTimeFormat, setStoppedTimeFormat] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const { profile } = useParams();

  const goToHomePage = () => {
    navigate("/");
  };

  const countrySelect = (event) => {
    event.preventDefault();
    axios
      .get(`http://worldtimeapi.org/api/timezone/${event.target.value}`)
      .then((response) => {
        if (response.status === 200) {
          setStoppedTimeFormat("");
          setStopButton(true);

          setTimezone(response.data.timezone);
          setCountry(event.target.value);
        }
      })
      .catch((error) => {
        console.error("Error Fetching Posts:", error);
      });
  };

  const timerPlayPause = (event) => {
    event.preventDefault();
    setStopButton((prev) => !prev);
    setStoppedTime(currentTime);
    setStoppedTimeFormat(currentTime);
  };

  useEffect(() => {
    let timerID;
    if (stopButton) {
      timerID = setInterval(() => {
        if (stoppedTimeFormat) {
          setCurrentTime(
            moment(stoppedTimeFormat, "hh:mm:ss A")
              .add(1, "second")
              .format("hh:mm:ss A")
          );
          setStoppedTimeFormat(
            moment(stoppedTimeFormat, "hh:mm:ss A")
              .add(1, "second")
              .format("hh:mm:ss A")
          );
        } else {
          setCurrentTime(momentTimezone.tz(timezone).format("hh:mm:ss A"));
        }
      }, 1000);
    } else {
      clearInterval(timerID);
    }

    return () => clearInterval(timerID);
  }, [country, stopButton, stoppedTimeFormat]);

  useEffect(() => {
    const usersDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserInfo(usersDetails.find((elem) => elem.name === profile));

    axios
      .get("http://worldtimeapi.org/api/timezone")
      .then((response) => {
        if (response.status === 200) {
          axios
            .get(`http://worldtimeapi.org/api/timezone/${response.data[0]}`)
            .then((response) => {
              if (response.status === 200) {
                setTimezone(response.data.timezone);
                setCountry(response.data[0]);
              }
            })
            .catch((error) => {
              console.error("Error Fetching Posts:", error);
            });
          setCountries(response.data);
        }
      })
      .catch((error) => {
        console.error("Error Fetching Posts:", error);
      });
  }, []);

  return (
    <div>
      <nav className="py-4 mx-10">
        <div className="w-90 mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="bg-blue-300 border border-black rounded p-2 text-black ml-0 hover:bg-blue-400"
              onClick={() => goToHomePage()}
            >
              Back
            </button>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <select
              className="bg-white border border-black rounded p-2"
              onClick={(e) => {
                countrySelect(e);
              }}
            >
              {countries.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
            <div className="bg-black text-white border border-black rounded p-2">
              <span>{stopButton ? currentTime : stoppedTime}</span>
            </div>
            <button
              className="bg-blue-300 border border-black rounded p-2 text-black hover:bg-blue-400"
              onClick={(e) => timerPlayPause(e)}
            >
              {stopButton ? "Pause" : "Start"}
            </button>
          </div>
        </div>
      </nav>
      <div className="py-4 text-center">Profile Page</div>
      <div className="w-85 mx-10 mt-4">
        <div className="border border-black rounded-lg p-4 flex justify-between items-center">
          <div className="text-lg font-normal">
            <p>Name: {userInfo.name}</p>
            <p>
              {userInfo.username} | {userInfo.website}
            </p>
          </div>
          <div className="text-lg font-semibold">
            <p>
              {userInfo.address && userInfo.address.city},
              {userInfo.address && userInfo.address.street},
              {userInfo.address && userInfo.address.suite},
              {userInfo.address && userInfo.address.zipcode}
            </p>
            <p>
              {userInfo.email} | {userInfo.phone}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-85 mx-10">
        <div className="flex flex-wrap justify-center">
          {userInfo.posts &&
            userInfo.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
