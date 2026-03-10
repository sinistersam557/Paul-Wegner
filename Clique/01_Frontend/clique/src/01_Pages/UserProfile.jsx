import React from "react";
import "./UserProfile.css";
import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import profileData from "../data/profileData"
import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../config";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({})
  const [currProfile, setCurrProfile] = useState({})
  
  const [username, setUsername] = useState("")

  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null);

  /* Toggles for the page to change when user clicks the pencil.  Uses state variable (EX editInterests) that is a boolean.
  Using a ternary in the JSX it displays something different when it is true and when it is false.
  
  EX when it is true is displays an input field with two buttons so you can edit that particular field.  When false it just displays the text for that field. */

  const [editName, setEditName] = useState(false)
  const [editGender, setEditGender] = useState(false)
  const [editAge, setEditAge] = useState(false)
  const [editLoc, setEditLoc] = useState(false)
  const [editAbout, setEditAbout] = useState(false)
  const [editInterests, setEditInterests] = useState(false)
  const [editImage, setEditImage] = useState(false)

  const [successMsg, setSuccessMsg] = useState("")
  const [successMsgStyle, setSuccessMsgStyle] = useState({})

  const { user, isLoaded } = useUser()

  //Loading useEffect (for when we eventually fetch from backend)
  useEffect(() => {

  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (user) setUsername(user.username)
      else setUsername("")
    } else {
      setUsername("")
    }
  }, [isLoaded])

  useEffect(() => {
    if (username) {
      // fetch call to load in profile information
      fetch(`${API_URL}/api/user?username=${username}`, {
        // TODO - will likely need to update query params to use username later
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(profileData => {
          setUserProfile(profileData.data);
          setCurrProfile(profileData.data);
        })
        .catch((err) =>
          console.error("Error, unable to fetch profile. Error is: ", err),
        );
    }
  }, [username])

  /* Handling for entire form submission */

  // function that will trigger PUT fetch when save profile is clicked
  const handleSetSubmission = async (event) => {
    event.stopPropagation();

    if (!userProfile.id) {
      console.error('User ID not available');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user?username=${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMsgStyle({ color: "green" })
      setSuccessMsg("Profile Saved")
      console.log('Profile saved:', data);
    } catch (error) {
      setSuccessMsgStyle({ color: "red" })
      setSuccessMsg("Error: Profile not Saved")
      console.error('Error saving profile:', error);
    }
  };

  /* THIS SECTION OF CODE CONTAINS
     JSX for Name, Gender, Age, Location, About, and Interests
     Functions for Change, Click, Save, Cancel
     I keep it collapsed for easy reading
  */
  const nameField = (
    <>
      <label className="labels">Name</label>
      {
        editName ?
          <>
            <input
              type="text"
              className="form-control"
              placeholder="first name"
              value={currProfile.name}
              onChange={handleChangeName}
            />
            <div className='d-flex justify-content-start mt-2'>
              <button className='me-2' onClick={handleSaveName}>Save</button>
              <button onClick={handleCancelName}>Cancel</button>
            </div>
          </>
          :
          <p>{userProfile.name} <span style={{ float: 'right' }} onClick={handleClickName}><FontAwesomeIcon icon={faPen} /></span></p>
      }
    </>
  )
  function handleChangeName(event) {
    setCurrProfile({ ...currProfile, name: event.target.value })
  }
  function handleClickName() {
    setEditName(!editName)
  }
  function handleSaveName() {
    setUserProfile({ ...userProfile, name: currProfile.name })
    setEditName(!editName)
  }
  function handleCancelName() {
    setCurrProfile({ ...currProfile, name: userProfile.name })
    setEditName(!editName)
  }
  const genderField = (
    <>
      <label className="labels">Gender</label>
      {
        editGender ?
          <>
            <input
              type="text"
              className="form-control"
              value={currProfile.gender}
              placeholder="gender"
              onChange={handleChangeGender}
            />
            <div className='d-flex justify-content-start mt-2'>
              <button className='me-2' onClick={handleSaveGender}>Save</button>
              <button onClick={handleCancelGender}>Cancel</button>
            </div>
          </>
          :
          <p>{userProfile.gender} <span style={{ float: 'right' }} onClick={handleClickGender}><FontAwesomeIcon icon={faPen} /></span></p>
      }
    </>
  )
  function handleChangeGender(event) {
    setCurrProfile({ ...currProfile, gender: event.target.value })
  }
  function handleClickGender() {
    setEditGender(!editGender)
  }
  function handleSaveGender() {
    setUserProfile({ ...userProfile, gender: currProfile.gender })
    setEditGender(!editGender)
  }
  function handleCancelGender() {
    setCurrProfile({ ...currProfile, gender: userProfile.gender })
    setEditGender(!editGender)
  }
  const ageField = (
    <>
      <label className="labels">Age</label>
      {
        editAge ?
          <>
            <input
              type="text"
              className="form-control"
              value={currProfile.age}
              placeholder="age"
              onChange={handleChangeAge}
            />
            <div className='d-flex justify-content-start mt-2'>
              <button className='me-2' onClick={handleSaveAge}>Save</button>
              <button onClick={handleCancelAge}>Cancel</button>
            </div>
          </>
          :
          <p>{userProfile.age} <span style={{ float: 'right' }} onClick={handleClickAge}><FontAwesomeIcon icon={faPen} /></span></p>
      }
    </>
  )
  function handleChangeAge(event) {
    setCurrProfile({ ...currProfile, age: event.target.value })
  }
  function handleClickAge() {
    setEditAge(!editAge)
  }
  function handleSaveAge() {
    setUserProfile({ ...userProfile, age: currProfile.age })
    setEditAge(!editAge)
  }
  function handleCancelAge() {
    setCurrProfile({ ...currProfile, age: userProfile.age })
    setEditAge(!editAge)
  }
  const locField = (
    <>
      <label className="labels">Location</label>
      {
        editLoc ?
          <>
            <input
              type="text"
              className="form-control"
              value={currProfile.location}
              placeholder="location"
              onChange={handleChangeLoc}
            />
            <div className='d-flex justify-content-start mt-2'>
              <button className='me-2' onClick={handleSaveLoc}>Save</button>
              <button onClick={handleCancelLoc}>Cancel</button>
            </div>
          </>
          :
          <p>{userProfile.location} <span style={{ float: 'right' }} onClick={handleClickLoc}><FontAwesomeIcon icon={faPen} /></span></p>
      }
    </>
  )
  function handleChangeLoc(event) {
    setCurrProfile({ ...currProfile, location: event.target.value })
  }
  function handleClickLoc() {
    setEditLoc(!editLoc)
  }
  function handleSaveLoc() {
    setUserProfile({ ...userProfile, location: currProfile.location })
    setEditLoc(!editLoc)
  }
  function handleCancelLoc() {
    setCurrProfile({ ...currProfile, location: userProfile.location })
    setEditLoc(!editLoc)
  }
  const aboutField = (
    <>
      <label className="labels">About</label>
      {
        editAbout ?
          <>
            <textarea
              type="text"
              className="form-control"
              placeholder="about"
              value={currProfile.about}
              onChange={handleChangeAbout}
            />
            <div className='d-flex justify-content-start mt-2'>
              <button className='me-2' onClick={handleSaveAbout}>Save</button>
              <button onClick={handleCancelAbout}>Cancel</button>
            </div>
          </>
          :
          <p>{userProfile.about} <span style={{ float: 'right' }} onClick={handleClickAbout}><FontAwesomeIcon icon={faPen} /></span></p>
      }
    </>
  )
  function handleChangeAbout(event) {
    setCurrProfile({ ...currProfile, about: event.target.value })
  }
  function handleClickAbout() {
    setEditAbout(!editAbout)
  }
  function handleSaveAbout() {
    setUserProfile({ ...userProfile, about: currProfile.about })
    setEditAbout(!editAbout)
  }
  function handleCancelAbout() {
    setCurrProfile({ ...currProfile, about: userProfile.about })
    setEditAbout(!editAbout)
  }
  const interestsField = (
    <>
      <label className="labels">Interests</label>
      {
        editInterests ?
          <>
            <textarea
              type="text"
              className="form-control"
              placeholder="interests"
              value={currProfile.interests.join(', ')}
              onChange={handleChangeInterests}
            />
            <div className='d-flex justify-content-start mt-2'>
              <button className='me-2' onClick={handleSaveInterests}>Save</button>
              <button onClick={handleCancelInterests}>Cancel</button>
            </div>
          </>
          :
          <>
            <div className='d-flex flex-wrap justify-content-center'>
              {userProfile.interests?.map((interest, id) => {
                return (
                  <div key={id} className='card me-1 mb-1 px-3'>{interest}</div>
                )
              })}
              <span className='ms-auto' onClick={handleClickInterests}><FontAwesomeIcon icon={faPen} /></span>
            </div>
          </>
      }
    </>
  )
  function handleChangeInterests(event) {
    setCurrProfile({ ...currProfile, interests: event.target.value.split(',').map(item => item.trim()) })
  }
  function handleClickInterests() {
    setEditInterests(!editInterests)
  }
  function handleSaveInterests() {
    setUserProfile({ ...userProfile, interests: currProfile.interests })
    setEditInterests(!editInterests)
  }
  function handleCancelInterests() {
    setCurrProfile({ ...currProfile, interests: userProfile.interests })
    setEditInterests(!editInterests)
  }

  // SECTION OF CODE FOR JSX For Image
  // and the functions for handling stuff related to the Image

  const imageField = (
    <>
      <img
        className="rounded-circle mt-5"
        width="200px"
        src={userProfile.image}
      // https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg
      />
      { editImage ?
        <>
          <input type='file' onChange={handleChangeImage} ref={fileInputRef}/>
          <div className='dflex justify-content-start mt-2'>
            <button className='me-2' onClick={handleSaveImage}>Save</button>
            <button onClick={handleCancelImage}>Cancel</button>
          </div>
        </>
        :
        <>
          <span className="font-weight-bold">{userProfile.name} <span style={{ float: 'right' }} onClick={handleClickImage}><FontAwesomeIcon icon={faPen} /></span></span>
        </>
      }
      <span className="text-black-50">{userProfile.username}</span>
      <span> </span>
    </>
  )

  function handleChangeImage(event) {
    setFile(event.target.files[0])
  }

  function handleClickImage() {
    setEditImage(!editImage)
  }

  async function handleSaveImage() {
    if (!file) {
      setEditImage(!editImage)
      return false
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch(`${API_URL}/upload?username=${username}`, {
        method: "POST",
        body: formData
      })

      if (!response.ok) throw new Error("File Upload to Server Failed")
  
      const result = await response.json()
      setUserProfile(result.data)
      
    } catch(err) {
      console.error(err)
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }

    setEditImage(!editImage)
  }

  function handleCancelImage() {
    setEditImage(!editImage)
  }

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          {/* User Icon Section */}
          <div className="centering col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              {imageField}
            </div>
          </div>
          {/* User Profile Info Section */}
          <div className="centering col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  {nameField}
                </div>
                <div className="col-md-6">
                  {genderField}
                </div>
                <div className="col-md-6">
                  {ageField}
                </div>
                <div className="col-md-6">
                  {locField}
                </div>
              </div>
              <hr />
              <div className="row mt-3">
                <div className="col-md-12">
                  {aboutField}
                </div>
                <div className="col-md-12">
                  {interestsField}
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={handleSetSubmission}
                >
                  Save Profile
                </button>
                <p style={successMsgStyle}>{successMsg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
