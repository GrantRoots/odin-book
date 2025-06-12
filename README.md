# Odinstagram

An Instagram‑inspired social media app built with Express, Prisma (PostgreSQL), and React.

## Live

https://odinsta-gram.netlify.app

Frontend deployed on Netlify  
Backend hosted on Koyeb

## Features

- Create Account and generate jsonwebtoken to authenticate routes
- Customize all profile info and profile picture
- Create Post's with images and text content
- Send follow requests to other users that they can accept or decline
- Have a feed of your and your follwing's posts
- Like and comment on posts
- View profiles and individual posts

## Installation

1. `git clone git@github.com:GrantRoots/odinstagram.git`
2. `cd odinstagram`
3. `npm install`
4. `npm run seed` (Optional)
5. `npm run dev`

## Environment Variables

```
DATABASE_URL="your db url"
JWT_SECRET="secret"
TEST_DATABASE_URL="test db url"
NODE_ENV=development - or test
VITE_API_URL="http://localhost:3000" - Backend url for frontend API calls
```
