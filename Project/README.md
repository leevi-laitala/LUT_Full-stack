# Full-stack project

Simple board-styled "social media" site.

Three collections in databases:
- Users
- Posts
- Comments

Users collection would hold user information, such as username and password. Posts collection would host information on posts, like date of creation, title, body and likes/dislikes. Comments collection would share most attributes with regular posts, but are missing title and have identifier linking them to a parent post.

# Running the app

App requires a MongoDB instance be running on the local machine. The database files with filler data are included in the repo.

```
$ git clone https://github.com/leevi-laitala/LUT_Full-stack
$ cd LUT_Full-stack
$ docker pull mongodb/mongodb-community-server:7.0-ubi8
$ docker run --name mongodb -d -p 27017:27017 -v "./db:/data/db" mongodb/mongodb-community-server:7.0-ubi8
$ npm run start
```

Then the app should be accessible via a web browser at `localhost:8080`.


