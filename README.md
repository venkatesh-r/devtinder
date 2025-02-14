# Tinder Clone Application

A full-stack dating application inspired by Tinder.

## Table of Contents

- [Features](#features)
- [Technologies used](#technologiesused)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#apiendpoints)
- [Database schema](#databaseschema)
- [Contributing](#contributing)
- [License](#license)

## About

This project built with Node.js, Express, and MongoDB. This application allows users to sign up, create profiles, browse other users, send connection requests, and manage matches

## Features

User authentication (sign up, login, logout)
Profile creation and management
Browse user profiles (feed)
Send and receive connection requests
View connections (matches)
Real-time chat between matched users

## Technologies used

Backend:
Node.js
Express.js
MongoDB (Mongoose ODM)
Authentication:
JSON Web Tokens (JWT)
bcrypt for password hashing
cookie parser

## Prerequisites

- Node.js v16 or higher
- npm v8 or higher

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/venkatesh-r/devtinder.git
   ```

   cd tinder-clone

2. Install Dependencies:

npm install

3. Start the Server:
   npm start

## Usage

1. Sign Up: Create a new account by providing first name, last name, age, bio, and a profile photo.
2. Login: Access your account using email and password.
3. Profile Management: Update your profile information and photo.
4. Browse Profiles: View a feed of other users and send connection requests.
   Connections: View users who have sent you requests and manage your matches.

## API Endpoints

1. Sign Up

   - Endpoint: POST /signup
   - Description: Register a new user.
   - Request Body:
     {
     "firstName": "kevin",
     "lastName": "petersen",
     "email": "kevin@gmail.com",
     "password": "Kevin@123",
     "age": 45,
     "gender": "male",
     "skills": ["cricket", "Batsman"],
     "bio": "I am a cricket player"
     }

2. Login

   - Endpoint: POST /login
   - Description: Authenticate an existing user.
   - Request Body:{
     "email": "john.doe@example.com",
     "password": "securepassword"
     }

3. Logout

   - Endpoint: POST /logout
   - Description: Log out the current user.

### User Profile

4. View Profile

   - Endpoint: GET profile/view
   - Description: Retrieve a user's profile information.

5. Update Profile

   - Endpoint: PUT users/:userId
   - Description: Update a user's profile details.
   - Request Body: {
     "firstName": "John",
     "lastName": "Doe",
     "age": 31,
     "bio": "An updated bio",
     "photo": "new_profile_photo.jpg"
     }

6. Delete User

   - Endpoint: DELETE /user
   - Description: Delete a user.

   - Request Body:{
     "userId" : "673cdace35a4c3e4504933cd"
     }

### Connections

7. Send Connection Request

   - Endpoint: POST sendRequest/interested/:id
   - Description: Send a connection request to another user.

8. View Received Requests

   - Endpoint: POST /request/reviews/accepted/:id
   - Description: View connection requests received by the current user.

9. View Connections

   - Endpoint: GET user/requests/received
   - Description: View all confirmed connections (matches) of the current user.

10. Feed

    - Get User Feed
    - Endpoint: GET /feed
    - Description: Retrieve a list of user profiles for the feed.

## Database Schema

1. User:

firstName (String)
lastName (String)
email (String, unique)
password (String, hashed)
age (Number)
bio (String)
profile (String, URL or file path)
bio (String)
createdAt (Date)

2. Connections

fromUserId (User ID)
toUserId (User ID)
status (String: 'ignored', 'accepted', 'rejected', 'interested')
createdAt (Date)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- Express.js
- MongoDB
- Mongoose
