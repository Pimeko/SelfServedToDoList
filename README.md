# Tusharnankani's ToDo List, extended with server-stored data

This is a simple extension of the great ToDo List you can find here : [Tusharnankani's original repository](https://github.com/tusharnankani/ToDoList)

In this version, instead of storing the tasks and theme in the local storage, they are stored on an express server. They will be preserved, as long as the server remanins active.

![Screenshot (773)](https://user-images.githubusercontent.com/61280281/99399728-0d096d00-290c-11eb-9ee5-59cc8358676c.png)

## Installation

```sh
cd back
npm install
node app.js
```

For production environments...

```sh
cd back
npm install
forever start app.js
```

The app will then run on the port 2696.