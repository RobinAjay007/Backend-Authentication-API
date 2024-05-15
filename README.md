# Authentication System with Profile Privacy Feature

This project is a Node.js backend API for an authentication system with the added feature of allowing users to set their profiles as public or private. Additionally, admin users can view both public and private user profiles, while normal users can only access public profiles.

## Features

- User registration with username and password
- User authentication (login/logout) with username and password
- User authentication with Google, Facebook, Twitter, or GitHub
- Viewing and editing user profiles including photo, name, bio, phone, email, and password
- Setting user profiles as public or private
- Admin users can view both public and private user profiles
- Normal users can only view public user profiles

## Installation

1. Clone the repository:

```bash
https://github.com/RobinAjay007/Backend-Authentication-API

## .env
Create a .env file in the root directory and add the following environment variables
1. PORT
2.MONGODB_URL

## Start the server:
npm run dev

The server should now be running on http://localhost:Port/.

## Endpoints
POST auth/register: Register a new account
POST auth/login: Log in
POST auth/logout: Log out
GET profile/getprofile: Get user's profile details
PUT profile/editprofile: Update user's profile details
PUT /profile/photo/:id: Update user's photo
GET privacy/profiles/public: Get public profiles
GET /admin/profiles: Get all profiles (admin only)

## Dependencies
express
bcryptjs
jsonwebtoken
uuid
body-parser
nodemon
mongoose
passport
passport-google-oauth20
dotenv
multer (for file upload handling)
cors (for enabling CORS)
