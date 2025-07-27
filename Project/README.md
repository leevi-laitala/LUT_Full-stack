# Full-stack project

Simple board-styled "social media" site.

Three collections in databases:
- Users
- Posts
- Comments

Users collection would hold user information, such as username and password. Posts collection would host information on posts, like date of creation, title, body and likes/dislikes. Comments collection would share most attributes with regular posts, but are missing title and have identifier linking them to a parent post.

# Running the app

First clone the repo

```
$ git clone https://github.com/leevi-laitala/LUT_Full-stack
$ cd LUT_Full-stack/Project
```

App requires a MongoDB instance be running on the local machine. The database dump is include in the repo and needs to be restored to get the filler data.

URI of the mongodb is defined in `.env` file in the project root, by default is set to `localhost:27017` 

```
$ mkdir db
$ docker pull mongodb/mongodb-community-server:7.0-ubi8
$ docker run --name mongodb -d -p 27017:27017 -v "./db:/data/db" mongodb/mongodb-community-server:7.0-ubi8 --noauth
$ mongorestore --db mernapp --archive=db.backup --gzip
```

Next install backend node modules

```
$ cd backend
$ npm install
$ cd ..
```

Finally run the server. This "start" script exists in the project root and should be executed there.

```
$ npm run start
```

Then the app should be accessible via a web browser at `localhost:8080`.


