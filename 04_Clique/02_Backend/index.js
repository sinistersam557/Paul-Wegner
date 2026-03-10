//1.6.2025 -- Added Http, Socket IO, and Cors
const express = require('express');
const app = express();

// require('dotenv').config({path: './.env.dev'});
const envFile = process.env.NODE_ENV === 'production' ? './.env.prod' : './.env.dev';
require('dotenv').config({path: envFile});

const PORT = process.env.PORT || 3000;
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors');
app.use(cors());
const logger = require("morgan");
app.use(logger("dev"));
const mongoose = require('mongoose')

//Cloudinary and Multer Requirements
const cloudinary = require('./connections/cloudinary');
const upload = require('./middleware/multer')

//The MongoDB Models
const userModel = require("./models/userModel")
const cliqueModel = require("./models/cliqueModel")

//Variables for Socket IO
let userList = []

// Establishing JSON parsing so the request.body is defined - middleware to parse JSON data
app.use(express.json());

// Defining web route for the app
app.use(express.static(".01_Frontend/clique"));

// Importing mock data to test routes
const profileData = require("./data/profileData");


/* CRUD Functionality for User Page */

// CREATE - Update after Clerk Integration
app.post("/api/user", (request, response) => {
  // destructuring user info out of the body
  const { id, name, image, gender, age, location, about, interests } = request.body;

  if (request.body) {
    // if the information is sent through the request body, then push the contents to the profile data - will update with database later
    const newProfileObj = { id, name, image, gender, age, location, about, interests }

    profileData.push(newProfileObj);

    response
      .status(201)
      .json({ message: "Profile successfully created.", data: newProfileObj });
  } else {
    response.status(404).json({ message: "Unable to create profile." })
  };
});

// READ - Need to import user data from database and display
app.get("/api/user", (request, response) => {
  // grabbing user id from query param
  const user_id = parseInt(request.query.user_id);
  const username = request.query.username;

  // sending back profile for given id as json - will update once in database
  if (!username) {
    response.status(400).json({ message: 'Not a valid username.' });
  } else {
    userModel.find({ username })
      .then((user) => {
        if (user.length > 0) {
          response.status(200).json({ message: "Data retrieved successfully.", data: user[0] });
        } else {
          response.status(404).json({ message: "No user found" })
        }
      })
      .catch((error) => {
        console.error(error)
        response.status(500).json({ message: "Error returning username from MongoDB" })
      })
  };
});

// UPDATE - Path for user to submit updates on the user profile page
app.put("/api/user", (request, response) => {
  const user_id = parseInt(request.query.user_id);
  const username = request.query.username;

  // grabbing chosen info to update out of url request body
  const { name, image, gender, age, location, about, interests } = request.body

  // updating profile - only checking for user_id
  if (!username) {
    response.status(400).json({ message: "Please Provide a username." });
  } else {
    let updateObj = {}
    if (name) updateObj = { ...updateObj, name }
    if (image) updateObj = { ...updateObj, image }
    if (gender) updateObj = { ...updateObj, gender }
    if (age) updateObj = { ...updateObj, age }
    if (location) updateObj = { ...updateObj, location }
    if (about) updateObj = { ...updateObj, about }
    if (interests) updateObj = { ...updateObj, interests }
    userModel.findOneAndUpdate({ username }, updateObj, { new: true })
      .then(updatedUser => {
        if (!updatedUser) {
          response.status(404).json({ message: "User not Found" })
        } else {
          response.status(201).json({ message: "Update Successful", data: updatedUser })
        }
      })
      .catch(error => {
        console.error(error)
        response.status(500).json({ message: "Error updating User" })
      })


    // will update with database query when ready - updating array manually for now
    // let userProfileToUpdate = profileData.find((item) => item.id === user_id);
    // const userProfileIndex = profileData.findIndex(item => item.id === user_id);
  }
});


// DELETE - Update after Clerk Integration
app.delete("/api/user", (request, response) => {
  const user_id = parseInt(request.query.user_id);

  // deleting profile - only checking for user_id
  if (!user_id || (typeof user_id !== 'number')) {
    response.status(400).json({ message: 'Not a valid user id.' });
  } else {
    // will update with database query when ready - updating the array manualy for now
    const index = profileData.findIndex(item => item.id === user_id)
    profileData.splice(index, 1);

    response.status(201).json({ message: "Profile deletion successful." });
  }
});

app.post('/upload', upload.single('file'), async (request, response) => {
  const username = request.query.username;
  if (!username) {
    response.status(400).json({ message: "Please Provide a username." });
  } else {
    cloudinary.uploader.upload(request.file.path)
      .then(result => {
        return userModel.findOneAndUpdate({ username }, { image: result.secure_url }, { new: true })
      })
      .then(updatedUser => {
        response.status(200).json({ message: "Successfully Updated Image URL", data: updatedUser })
      })
      .catch(error => {
        console.error(error)
        response.status(500).json({ message: "Error Uploading Image" })
      })
  }
})

// GET cliques
app.get("/api/cliques", (request, response) => {
  const username = request.query.username;

  if (!username) {
    response.status(400).json({ message: "Please Provide a username." });
  } else {
    cliqueModel.aggregate([
      {
        $lookup: {
          from: "users",
          let: { usernames: "$userList" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$username", "$$usernames"]
                }
              }
            },
            {
              $project: {
                name: 1,
                _id: 0
              }
            }
          ],
          as: "namesList"
        }
      },
      {
        $addFields: {
          member: {
            $in: [
              username,
              "$userList"
            ]
          },
          invite: {
            $in: [
              username,
              "$inviteList"
            ]
          }
        }
      }
    ])
      .then(results => {
        console.log(results)
        response.status(200).json({ message: "Successfully Retrieved Cliques", data: results })
      })
      .catch(error => {
        console.error(error)
        response.status(500).json({ message: "Error Retrieving Cliques" })
      })
  }
})

/*
// POST create a clique
app.post("/api/cliques", async (req, res) => {
  try {
    const created = await cliqueModel.create(req.body);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE a clique by Mongo _id
app.delete("/api/cliques/:id", async (req, res) => {
  try {
    const deleted = await cliqueModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Clique not found" });
    return res.json(deleted);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
*/

// PATCH accept invite
app.patch("/api/cliques/:id/accept", async (request, response) => {
  const id = request.params.id;
  const username = request.query.username;
  let newUserList = []
  let newInviteList = []

  if (!username) {
    response.status(400).json({ message: "Please Provide a username." });
  } else {
    cliqueModel.findById(id)
      .then(clique => {
        if (!clique) {
          response.status(500).json({ message: "No Cliques Found with Id" })
        } else {
          newInviteList = clique._doc.inviteList.filter(user => user != username)
          newUserList = clique._doc.userList
          newUserList.push(username)
          return cliqueModel.findOneAndUpdate({ _id: id }, { userList: newUserList, inviteList: newInviteList }, { returnDocument: 'after' })
        }
      })
      .then(updatedClique => {
        console.log("HERE")
        return cliqueModel.aggregate([
          { $match: { _id: updatedClique._doc._id } },
          {
            $lookup: {
              from: "users",
              let: { usernames: "$userList" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$username", "$$usernames"]
                    }
                  }
                },
                {
                  $project: {
                    name: 1,
                    _id: 0
                  }
                }
              ],
              as: "namesList"
            }
          },
          {
            $addFields: {
              member: {
                $in: [
                  username,
                  "$userList"
                ]
              },
              invite: {
                $in: [
                  username,
                  "$inviteList"
                ]
              }
            }
          }
        ])
      })
      .then(processedData => {
        response.status(200).json({ message: "Success", data: processedData[0] })
      })
      .catch(error => {
        console.error(error)
        response.status(500).json({ message: "Error Patching Clique" })
      })
  }
});

// PATCH decline invite
app.patch("/api/cliques/:id/decline", async (request, response) => {
  const id = request.params.id;
  const username = request.query.username;
  let newInviteList = []

  if (!username) {
    response.status(400).json({ message: "Please Provide a username." });
  } else {
    cliqueModel.findById(id)
      .then(clique => {
        if (!clique) {
          response.status(500).json({ message: "No Cliques Found with Id" })
        } else {
          newInviteList = clique._doc.inviteList.filter(user => user != username)
          return cliqueModel.findOneAndUpdate({ _id: id }, { inviteList: newInviteList }, { returnDocument: 'after' })
        }
      })
      .then(updatedClique => {
        return cliqueModel.aggregate([
          { $match: { _id: updatedClique._doc._id } },
          {
            $lookup: {
              from: "users",
              let: { usernames: "$userList" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$username", "$$usernames"]
                    }
                  }
                },
                {
                  $project: {
                    name: 1,
                    _id: 0
                  }
                }
              ],
              as: "namesList"
            }
          },
          {
            $addFields: {
              member: {
                $in: [
                  username,
                  "$userList"
                ]
              },
              invite: {
                $in: [
                  username,
                  "$inviteList"
                ]
              }
            }
          }
        ])
      })
      .then(processedData => {
        response.status(200).json({ message: "Success", data: processedData[0] })
      })
      .catch(error => {
        console.error(error)
        response.status(500).json({ message: "Error Patching Clique" })
      })
  }
});

app.get("/api/friends", (request, response) => {
  const username = request.query.username;

  if (!username) {
    response.status(400).json({ message: "Please Provide a username." });
  } else {
    cliqueModel.aggregate([
      {
        $match: {
          $expr: {
            $in: [username, "$userList"]
          }
        }
      },
      {
        $lookup: {
          from: "users",
          let: { usernames: "$userList" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$username", "$$usernames"]
                }
              }
            },
            {
              $project: {
                name: 1,
                username: 1,
                image: 1,
                _id: 0
              }
            }
          ],
          as: "imagesList"
        }
      }
    ])
    .then(data => {
      let imageSet = []
      data.forEach(clique => {
        clique.imagesList.forEach(user => {
          if (user.username != username) imageSet.push(user.image)
        })
      })
      imageSet = [...new Set(imageSet)]
      console.log(imageSet)
      response.status(200).json({message: "Success", data: imageSet})
    })
    .catch(error => {
      console.error(error)
      response.status(500).json({ message: "Error Getting Friends" })
    })
  }
})

//Create the Server Object with Http Methods Wrapped Around the App Object
const server = http.createServer(app)

//Create the Socket IO Instance from the Http Server Object with Cors Parameters
//These cors parameters are for the React Front End
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

//Listening for the "Connection" Event
io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  //Listening for a "Disconnect" on the Socket that was Connected    
  socket.on('disconnect', async () => {
    console.log('a user disconnected', socket.id)
    userList = userList.filter(user => user.socket != socket.id)
    io.emit('user left', socket.id)
    io.to("Lobby").emit('count change')
  })

  //Listening for a "User Connect" Event to Be Emitted
  //Emitted Here from the Front End
  socket.on('user connect', async (userObj) => {
    if (userObj.room != 'Lobby') {
      userList.push({ socket: userObj.user, room: userObj.room })
    }
    const roomSockets = await io.in(userObj.room).fetchSockets()
    // const allSockets = Array.from(io.sockets.sockets.values())
    let userArray = []
    roomSockets.forEach((socket, index) => {
      userList.forEach(user => {
        if (user.socket === socket.id) {
          userArray.push({ socket: socket.id, user: `User ${index + 1}`, name: user.name })
        }
      })
    })
    //Emits a "User Change" back to the Front End
    io.to(userObj.room).emit('user change', userArray)
  })

  socket.on('name update', async (userObj) => {
    userList = userList.map(user => {
      if (user.socket === userObj.user) {
        return { ...user, name: userObj.name, image: userObj.img }
      } else {
        return user
      }
    })
    const roomSockets = await io.in(userObj.room).fetchSockets()
    let userArray = []
    roomSockets.forEach((socket, index) => {
      userList.forEach(user => {
        if (user.socket === socket.id) {
          userArray.push({ socket: socket.id, user: `User ${index + 1}`, name: user.name, image: user.image })
        }
      })
    })
    io.to(userObj.room).emit('user change', userArray)
  })

  //Listening for a "Join Room" Event to Be Emitted from Client
  socket.on('join room', (roomName) => {
    socket.join(roomName)
    console.log("Join Room:", socket.rooms)
    io.to("Lobby").emit('count change')
  })

  socket.on('room count', async (roomObj) => {
    const roomSockets = await io.in(roomObj.room).fetchSockets()
    let userArray = []
    roomSockets.forEach((socket, index) => {
      userList.forEach(user => {
        if (user.socket === socket.id) {
          userArray.push({ socket: socket.id, user: `User ${index + 1}`, name: user.name, image: user.image })
        }
      })
    })
    io.to("Lobby").emit('count update', { room: roomObj.room, users: userArray })
  })

  //Listening for a "Chat Message" Event to Be Emitted
  //Emitted Here from the Front End
  socket.on('chat message', async (msgObj) => {
    console.log('message:', msgObj.message)
    const roomSockets = await io.in(msgObj.room).fetchSockets()
    // const allSockets = Array.from(io.sockets.sockets.values())
    const socketIndex = roomSockets.findIndex(s => s.id === socket.id)
    const userHandle = `User ${socketIndex + 1}`
    const messageWithHandle = userHandle + ': ' + msgObj.message
    //Emits a "Chat Message" to only sockets in the Room back to Front End
    io.to(msgObj.room).emit('chat message', messageWithHandle)
    //Console Logging all Users in Room (will use this code later for see-my-chats)
    console.log("Users in Room:", msgObj.room)
    for (let s of roomSockets) {
      console.log(msgObj.room, ":", s.id)
    }
  })
})

//This was Changed from App.Listen to Server.Listen (the Http Server with App Wrapped Inside)
server.listen(PORT, () => {
  console.log(`Sever on port ${PORT}.`)
})
