# Paul-Wegner Repository Overview

> This Repository was created to showcase Projects for my Employment Search in Spring 2026.

This is by no means a demonstration of my absolute best, but rather a working practical compliation to
showcase my capabilities with various technologies.  Especially those that I have employed while undertaking
a full stack software development bootcamp.  Many of these example projects were items we worked on in class 
as part of our instruction or as homework that have been repurposed.  Like I said, it's not my absolute best, 
as I would prefer not to build an ambitious project from scratch due to the massive amount of time that would take.
This was meant to serve as a basic and functional example of proficiency with various elements of coding.

---

## 1. BucketList Application

> This is a simple application which maintains a BucketList.  You can add items to your BucketList as well as
delete the items, and even mark through items once you have completed them.  It runs using jQuery on the Front End and
an Express Server on the Back End.  The Back End is connected to PostGreSQL, which allows the BucketList items to be
retrieved from a Database.

There is a server folder with an index.js which contains the backend.  Inside the server folder there is a subfolder called client,
client contains the html, css, and javascript/jQuery.

The BackEnd index.js Express Server is commented

The FrontEnd script.js containing the jQuery is commented

If you clone this repository and are seeking to run this project, it will not work directly out of the box.  Primarily because
the information for the PostGreSQL is in an .env file.  You'll have to create your own .env file or directly type your connection
information into pgClient.js under the server and then connections folder.  You'll also need your own PostGreSQL database, if you have
one you can use the information in the schema.sql at the top level to create a new schema and the necessary tables.  You can run the application and then delete the schema and tables.

---

## 2. tmdbAPI Application

> This project utilizes a Movie API to allow users to search for movies from an extensive database.  It is a good example of 
consuming an API.

This is a simple combination of index.html, styles.css, and script.js.  Using html, css, and javascript (and jQuery) in combination.

script.js is commented.

---

## 3. Giphy API in React

> This project consumes a Giphy API to search for and display gifs.  It allows users to search and browse forward and backwards through the results.  It is built in React.

The App.jsx under the src folder in React is commented.

---

## 4. Clique

> This was our class project for the software bootcamp.  It is a React Application that allows users to create a profile and join chat rooms ('cliques') to chat with others.  There is a Front End in React and a Back End Express Server.  Chat works with Socket IO.  I worked extensively on all parts of the project.

The site is deployed at cliqueapp.site, but one word of caution!  

I just realized the MongoDB Atlas Cluster we are using for the Database has an IP Address List, so if it doesn't recognize you, you won't be able to see anything after logging into the website and creating a username with Clerk.  If you are really interested in seeing our class project, please contact me and I can add your IP address to the List in MongoDB as well as your clerk username.

At any rate hopefully you should be able to see how it was a vast undertaking from inspecting the code.  Unfortunately I feel that it could be structured and commented better (and I will periodically look into improving this).  I'd suggest looking at the general structure of the project, especially the various pages in the 01_Pages folder in React's src folder.  In addition to these pages it's basically just the App.jsx as far as the Front End is concerned.  The backend is basically just the index.js with some additional folders and files (the connections to mongodb and multer/cloudinary for file uploads).

---

