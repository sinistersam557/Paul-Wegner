import "./SeeMyChats.css";
import { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import { Link } from 'react-router-dom'
// import cliqueData from "../data/cliqueData"
import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../config";
//The Socket is Set to The Back End (:3000)
// const socket = io("http://localhost:3000")

const SeeMyChats = () => {
  const { user, isLoaded } = useUser()

  // State Variables -- Important as these Dynamically Update the JSX
  const [username, setUsername] = useState("")
  const [cliqueList, setCliqueList] = useState([])
  const [selectedClique, setSelectedClique] = useState({})
  const [isUpdated, setIsUpdated] = useState(false)
  const [socket, setSocket] = useState(io(API_URL))

  // Loading useEffect (for when we fetch from backend)
  useEffect(() => {
    // setCliqueList(cliqueData)
    // Pretending the 3rd chat is the selected one
    // setSelectedClique(cliqueData[2])
  }, [])

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
      fetch(`${API_URL}/api/cliques?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(cliqueData => {
          setCliqueList(cliqueData.data)
          setSelectedClique(cliqueData.data[2])
        })
        .catch(err => {
          console.error("Unable to Fetch Cliques", err)
        })
    }
  }, [username])

  useEffect(() => {
    console.log("ping")
    console.log(cliqueList)
    if (!isUpdated) loopCliques()
    socket.on('count update', (countObj) => {
      console.log("Count Update", countObj.room)
      console.log(cliqueList)
      let newList = [...cliqueList]
      newList.forEach((clique, index) => {
        if (clique.name == countObj.room) {
          newList[index].currList = countObj.users.map(user => {
            if (user.name) return `${user.name}`
            else return `${user.socket}`
          })
          newList[index].currCount = newList[index].currList.length
        }
      })
      setCliqueList(newList)
    })
    socket.on('count change', () => {
      console.log("***trigger")
      setIsUpdated(false)
      loopCliques()
    })
  }, [cliqueList])

  useEffect(() => {
    console.log("Socket Change")

    //Listening for Connect Event
    socket.on('connect', () => {
      console.log("user connect: ", socket.id)
      //Emitting the User Connect and Join Room to BackEnd
      socket.emit("join room", "Lobby")
      socket.emit("user connect", { user: socket.id, room: "Lobby" })
    })
  }, [socket])

  function loopCliques() {
    cliqueList.forEach(clique => {
      console.log("emitted room count", clique.name)
      socket.emit("room count", { room: clique.name })
    })
    if (cliqueList.length > 0) setIsUpdated(true)
  }

  // We Will Ultimately use a NavBar Component (but I kept this in here)
  // The JSX for the NavBar
  const navbar = (
    <header className="smc-header">
      <div className="smc-logo">Logo</div>
      <nav className="smc-nav">
        <a href="/cliques" className="smc-nav-link">
          Cliques
        </a>
        <a href="/friends" className="smc-nav-link">
          Friends
        </a>
        <a href="/profile" className="smc-nav-link">
          Profile
        </a>
      </nav>
    </header>
  )

  //The JSX for the List of Cliques which you are a Member Of (Displayed First)
  const memberCliques = cliqueList.map(clique => {
    if (clique.member) {
      return (
        <div
          key={clique.id}
          data-id={clique.id}
          className={
            "smc-chat-card " +
            (clique.id == selectedClique.id ? "smc-chat-card--dark" : "smc-chat-card--light")
          }
          onClick={handleClickClique}
        >
          <div className="smc-chat-info">
            <h3 className="smc-chat-title">{clique.name}</h3>
            <p className="smc-chat-subtitle">
              {clique.currCount} Users in Chat
            </p>
          </div>
        </div>
      )
    }
  })

  // The JSX for the list of Cliques you are invited to join (Displayed Second)
  const inviteCliques = cliqueList.map(clique => {
    if (clique.invite) {
      return (
        <div
          key={clique.id}
          data-id={clique.id}
          className={
            "smc-chat-card " +
            (clique.id == selectedClique.id ? "smc-chat-card--dark" : "smc-chat-card--light")
          }
          onClick={handleClickClique}
        >
          <div className="smc-chat-info">
            <h3 className="smc-chat-title">{clique.name}</h3>
            <p className="smc-chat-subtitle">
              You have something in common with this Clique!
            </p>
          </div>
          <div className="smc-chat-invite">
            Accept Invite?
            <div>
              <button className="smc-chat-invite-btn" onClick={handleJoinYes}>Yes</button>
              <button className="smc-chat-invite-btn" onClick={handleJoinNo}>No</button>
            </div>
          </div>
        </div>
      )
    }
  })

  //The Function When you Click on a Clique, it sets the state variable selectedClick to the one you clicked on
  //Once the state variable is set the JSX dynamically knows to change
  //Find will return the clique Object in the array cliqueList which matches the id that you clicked on (event.currentTarget.dataset.id)
  function handleClickClique(event) {
    setSelectedClique(cliqueList.find(clique => clique.id == event.currentTarget.dataset.id))
  }

  //The Function when you click yes for Accept Invite?, it sets the state variable cliqueList
  //It's Basically going into the Array of Cliques and Changing the one you clicked the button on
  //It modifies the values in the Clique object for member to TRUE and invite to FALSE
  //The JSX dynamically knows to change as a result 
  function handleJoinYes(event) {
    let id = event.target.parentNode.parentNode.parentNode.dataset.id
    let _id = cliqueList.find(clique => clique.id == id)._id
    let index = cliqueList.findIndex(clique => clique.id == id)
    fetch(`${API_URL}/api/cliques/${_id}/accept?username=${username}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.data)
      let updatedList = [...cliqueList.slice(0, index), data.data, ...cliqueList.slice(index + 1)]
      setCliqueList(updatedList)
    })
    .catch(error => {
      console.error(error)
    })
  }

  //Very Similar to the above function except you've clicked No not Yes
  //It modifies cliqueList state variable, changes the value in the Clique object for invite to FALSE
  //As a result it won't show up because JSX dynamically knows to change (see the JSX)
  function handleJoinNo(event) {
    let id = event.target.parentNode.parentNode.parentNode.dataset.id
    let _id = cliqueList.find(clique => clique.id == id)._id
    let index = cliqueList.findIndex(clique => clique.id == id)
    fetch(`${API_URL}/api/cliques/${_id}/decline?username=${username}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.data)
      let updatedList = [...cliqueList.slice(0, index), data.data, ...cliqueList.slice(index + 1)]
      setCliqueList(updatedList)
    })
    .catch(error => {
      console.error(error)
    })
  }

  // The JSX for The Details Pane
  const cliqueDetails = (
    <>
      <h3 className="smc-detail-title">{selectedClique.name}</h3>
      <hr className="smc-detail-divider" />
      <div className="smc-detail-section">
        <p className="smc-detail-text">
          <strong>Main Interest</strong>: {selectedClique.mainInterest}
        </p>
        <p className="smc-detail-text"><strong>Users in Clique</strong>:</p>
        <ul className="smc-detail-userlist">
          {selectedClique.namesList?.map((user, index) => (
            <li key={index + 1}>{user.name}</li>
          ))}
        </ul>
      </div>
      <hr className="smc-detail-divider" />
      {!selectedClique.invite ?
        <>
          <div className="smc-detail-section">
            <p className="smc-detail-text">
              <strong>{selectedClique.currCount} Users in Chat</strong>
            </p>
            <p className="smc-detail-text">
              <strong>Users</strong>: {selectedClique.currList?.join(", ")}
            </p>
          </div>
          <Link to={`/chat/${selectedClique.id}`}><button className="smc-resume-btn">Resume Chat</button></Link>
        </>
        :
        <>
          <div className="smc-detail-section">
            <p className="smc-detail-text">
              Would you like to join this Clique?
            </p>
          </div>
        </>
      }

    </>
  )

  //The JSX that is Returned
  //Check inside {navbar}, {memberCliques}, {inviteCliques}, {cliqueDetails} are defined above
  return (
    <div className="smc-page">
      {/* Top header with logo + nav links */}
      {/* {navbar} */}


      <main className="smc-main">

        <section className="smc-chat-list-wrapper">
          <div className="smc-chat-list">
            {memberCliques}
            {inviteCliques}
          </div>
        </section>

        {/* details for selected chat */}
        <aside className="smc-detail-panel">
          <div className="smc-detail-card">
            {cliqueDetails}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default SeeMyChats;
