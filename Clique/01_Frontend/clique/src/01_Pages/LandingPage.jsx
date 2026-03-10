import "./LandingPage.css";
import { useEffect, useState } from "react";

import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { API_URL } from "../config";

const LandingPage = () => {
  const { user, isLoaded } = useUser()

  const [username, setUsername] = useState("")
  const [usersPics, setUsersPics] = useState(["/images/user12.jpg",
   "/images/user1.jpg", "/images/user2.jpg",
    "/images/user3.jpg", "/images/user4.jpg", 
    "/images/user5.jpg", "/images/user6.jpg", 
    "/images/user7.jpg", "/images/user8.jpg", 
    "/images/user9.jpg", "/images/user10.jpg", 
    "/images/user11.jpg"]);
  const [friendsPics, setFriendsPics] = useState([]);

  useEffect(() => {

  }, [])

  //Sets Username when User has Loaded
  useEffect(() => {
    if (isLoaded) {
      if (user) setUsername(user.username)
      else setUsername("")
    } else {
      setUsername("")
    }
  }, [isLoaded])

  //When Username Changes (Loads) Fetch all Their Friends
  useEffect(() => {
    if (username) {
      fetch(`${API_URL}/api/friends?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("Friends:", data.data)
        //this ensures that there will always be 12 profile pictures on the userDashboard regardless of how many friends the user has.
        // it checks that the friendsPics are a minumum of 12
        // if not it adds usersPics to friendsPics until friendsPics.length is 12
        if (data.data.length < 12) {
          setFriendsPics((friendsPics) => {
            // this creates a shallow copy of friendsPics and copies a portion on the usersPics
            let friends = [
              ...data.data,
              ...usersPics.slice(0, 12 - data.data.length)
            ]
            // this updates the friendsPics state with the new array of friends
            return friends
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
    }
  }, [username])

  //This maps through the friendsPics and creates an img element for each friend,
  //  giving it a unique key, className, src, alt, and id. 
  const dashboard = friendsPics.map((friend, index) => {
    return (
      <img
        key={`friends${index}`}
        className="circle"
        src={friend}
        alt="Profile Picture"
        id={`circle${index + 1}`}
      />
    );
  });

  // this maps through the usersPics and creates an img element for each user,
  //  giving it a unique key, className, src, alt, and id.
  const landingPage = usersPics.map((user, index) => {
    return (
      <img
        key={`users${index}`}
        className="circle"
        src={user}
        alt="Profile Picture"
        id={`circle${index + 1}`}
      />
    );
  });

  return (
    <>
      <SignedOut> 
        {/* This contains the content for the landing page */}
        <div className="main">
          {/* this is the circle that spins clockwise and all it's children */}
          <div id="mainCircle">
            <h2 id="customH2">Find your Clique</h2>

            {/* this is the circle that the border is arond */}
            <div className="centerCircle"></div>

            {/* rotating profile pictures */}
            {landingPage}
          </div>
        </div>
       </SignedOut>
      
      <SignedIn>
        {/* This contains the content for the landing page */}
        <div className="main">
          {/* this is the circle that spins clockwise and all it's children */}
          <div id="mainCircle">
            <h2 id="customH2">Welcome to Clique</h2>

            {/* this is the circle that the border is arond */}
            <div className="centerCircle"></div>

            {/* rotating profile pictures */}
            {dashboard}
          </div>
        </div>
      </SignedIn >
    </>
  );
};

export default LandingPage;
