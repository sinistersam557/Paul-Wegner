import React, { useEffect, useState } from 'react'
import './ChatsPage.css'
//React Requires the NPM Module Socket.IO-Client
import { io } from "socket.io-client"
import { useParams } from 'react-router-dom'
import cliqueData from "../data/cliqueData"
import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../config";
//The Socket is Set to The Back End (:3000)
// const socket = io("http://localhost:3000")



const ChatsPage = () => {
    const { id } = useParams()
    const { user, isLoaded } = useUser()

    //State Variables
    const [chatName, setChatName] = useState(cliqueData.find(element => element.id == id).name)
    const [username, setUsername] = useState("")
    const [userProfile, setUserProfile] = useState({})
    const [currentMsg, setCurrentMsg] = useState("")
    const [userArray, setUserArray] = useState([])
    const [msgArray, setMsgArray] = useState([])
    const [socket, setSocket] = useState(io(API_URL))

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
            fetch(`${API_URL}/api/user?username=${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(profileData => {
                setUserProfile(profileData.data);
            })
            .catch((err) =>
                console.error("Error, unable to fetch profile. Error is: ", err),
            );
        }
    }, [username])

    useEffect(() => {
        socket.emit("name update", { user: socket.id, room: chatName, name: userProfile.name, img: userProfile.image})
    }, [userProfile])

    //A useEffect Hook that updates when the Socket Changes
    //Thus when something changes with Socket IO this will run
    useEffect(() => {
        //Listening for Chat Message Returned (Emitted) from BackEnd
        socket.on('chat message', (msg) => {
            console.log("Socket Msg:", msg)
            //Modify State Variable
            setMsgArray(prevMsgs => [...prevMsgs, msg])
        })

        //Listening for Connect Event
        socket.on('connect', () => {
            console.log("user connect: ", socket.id)
            //Emitting the User Connect and Join Room to BackEnd
            socket.emit("join room", chatName)
            socket.emit("user connect", { user: socket.id, room: chatName })
        })
    }, [socket])

    useEffect(() => {
        //Listening for User Change Emitted from BackEnd
        socket.on('user change', (userList) => {
            //Modify State Variable
            setUserArray(prevUsers => [...userList])
        })
        //Listening for User Left Emitted form BackEnd
        socket.on('user left', (s) => {
            let updatedArray = userArray.filter(user => user.socket != s)
            setUserArray(prevUsers => [...updatedArray])
        })
        console.log("Users:", userArray)
    }, [userArray])

    useEffect(() => {
        console.log("Messages:", msgArray)
    }, [msgArray])

    //Handle the Event of a Chat Message Being Sent (Submitting the Form)
    function handleSubmission(event) {
        event.preventDefault()
        const input = document.getElementById('input')
        // console.log(event.target)
        // console.log(input.value)
        if (input.value) {
            socket.emit('chat message', { message: currentMsg, room: chatName })
            setCurrentMsg('')
        }
    }

    //Handle the Change of Value in Input (The Chat Message)
    function handleMsgChange(event) {
        setCurrentMsg(event.target.value)
    }

    //The Variable Representing JSX for the Messages
    const msgList = msgArray.map((msg, index) => {
        return (
            <li key={index}>{msg}</li>
        )
    })

    //The Variable Representing JSX for the List of Users
    const userList = userArray.map((user, index) => {
        return (
            <>
                <div key={index} className='chats-users-block'>
                    <div className='chats-users-img'>
                        <img className='rounded-circle' src={user.image} width='80px' />
                    </div>
                    <div className='chats-users-name'>
                        {user.user}<br />
                        {user.name ? user.name : "Anonymous"}<br />
                        {user.socket}
                    </div>
                </div>
            </>
        )
    })

    //THE JSX (needs explanation?)
    return (
        <>
            <h2>{chatName}</h2>
            <main className="chats-main">
                <section className="chats-messages">
                    <ul id="messages">
                        {msgList}
                    </ul>
                    <form id="form" action="" onSubmit={handleSubmission}>
                        <input id="input" value={currentMsg} autoComplete="off" onChange={handleMsgChange} /><button>Send</button>
                    </form>
                </section>
                <aside className="chats-users">
                    {userList}
                </aside>
            </main>
        </>
    )
}

export default ChatsPage