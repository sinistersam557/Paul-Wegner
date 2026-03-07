# Paul-Wegner

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
an Express Server on the Back End.  The Back End is connected to PostGres SQL, which allows the BucketList items to be
retrieved from a Database.

#### A Quick Overview / Walkthrough

- Navigate to server folder, and then to the client folder.  Inside review the index.html for Basic Format of Page.  There is also a styles.css which contains styling of the Page.

- Also inside the client folder is script.js.  This includes the Front End Functionality.  It is commented and self-explanatory.

- Next leave the client folder and look directly under the server folder.  index.js contains the code for the Express Server, that is
the BackEnd, it is commented and self-explanatory as well.

- Under the connections folder you will see how the PostGres SQL is connected.  It uses a .env (which is hidden here b/c of gitignore)

- There is a schema.sql this includes some commands for the admin or DBA to create the tables and schemas used by PostGres.

---

## 2. Movie API Application

> This project utilizes a Movie API to allow users to search for movies from an extensive database.  It is a good example of 
consuming an API.  There is also some skill involved in building the Front End with jQuery.