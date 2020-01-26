# websocket-chat

Create an online chat with websocket and react

## Prerequisite

- Knowledge of Javascript/React.Js & MongoDb
- Node.Js & npm/yarn on your computer

## Tree structure

The project is separated in two parts :

- ROOT DIRECTORY

  - src/

    - server.js => is the entrypoint of the project (server)

  - client/
    - public/ => directory where you paste your assets
    - src/
      - index.js => is the entrypoint for the Front-End (react.js)
      - App.js => the main component of your application

## Installation

1. First thing you have to do, is to clone this repo
2. You have to install dependencies for the two parts,
   so '_npm install_' on **ROOT DIRECTORY** AND on **client**
3. You are now ready to start hacking !

(For the auto build in development mode, you have just to tap this command already twice : '_npm run wacth_')

# Step-by-step

## 1. Create the user interface

1.1 Create React Containers and Components for the chat app

![Result](/docs/images/screenshot0.png)

## 2. Create the Node.js Server

2.1 Visualize the minimal [database](/docs/images/Websocket-Database.png)

2.2 Pseudo Code for the Server instructions

2.3 Create your database access on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Cheatsheet / Documents

- [Emit Socket.io](https://socket.io/docs/emit-cheatsheet/)
- [Rooms/Namespaces](https://socket.io/docs/rooms-and-namespaces/)
- [Avatar Faker](https://pravatar.cc/)
- [Picsum](https://picsum.photos/)
