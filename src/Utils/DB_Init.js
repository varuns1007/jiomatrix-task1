import { v4 as uuidv4 } from "uuid";

export function addHours(date, hours) {
  date.setHours(date.getHours() + hours);

  return date;
}

export const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

export const checkIndexedDb = () => {
  //check for support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("test-db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log(event);
    const db = request.result;

    if (!db.objectStoreNames.contains("userData")) {
      const objectStore = db.createObjectStore("userData", {
        keyPath: "email",
      });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");
  };
};

export const getAllData = () => {
  const dbPromise = idb.open("test-db", 1);
  dbPromise.onsuccess = () => {
    const db = dbPromise.result;

    var tx = db.transaction("userData", "readonly");
    var userData = tx.objectStore("userData");
    const users = userData.getAll();

    users.onsuccess = (query) => {
      return query.srcElement.result;
    };

    tx.oncomplete = function () {
      db.close();
    };
  };
};

export const signup = (e, email, password, setCookie, notify) => {
  // console.log("userData", userData);

  const request = idb.open("test-db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };
  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("userData", "readwrite");
    var userData = tx.objectStore("userData");

    const user1 = userData.get(email);
    user1.onsuccess = (query) => {
      const user1 = query.srcElement.result;
      if (!user1) {
        const v4Id = uuidv4();
        console.log("v4id", v4Id);
        const item = {
          id: v4Id,
          email: email,
          password: password,
          todos: [],
        };
        const user = userData.put(item);
        user.onsuccess = () => {
          //set cookie
          const date = new Date();

          const newDate = addHours(date, 2);
          setCookie("loggedInUser", item, {
            expires: newDate,
          });
        };
        user.onerror = () => {
          console.log("User Adding failed");
        };
      } else {
        console.log("User found", user1);
        notify("User already exists❗");
      }
    };
    user1.onerror = (query) => {
      console.log("Error", query);
    };

    tx.oncomplete = function () {
      // console.log("User added successfully");
      db.close();
    };
  };

  e.preventDefault();
};

export const login = (e, email, password, setCookie, notify) => {
  const request = idb.open("test-db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };
  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("userData", "readonly");
    var userData = tx.objectStore("userData");

    const user = userData.get(email);
    user.onsuccess = (query) => {
      const user1 = query.srcElement.result;
      console.log("User found", user1);
      if (!user1) {
        notify("No such user❗");
      } else {
        if (user1.password === password) {
          console.log("password matched, log in user");
          //set cookie
          const date = new Date();
          const newDate = addHours(date, 2);
          user1.loginTime = new Date();
          setCookie("loggedInUser", user1, {
            expires: newDate,
          });
          // window.location.replace("/landingPage");
        } else {
          notify("Incorrect Password❗");
        }
      }
    };
    user.onerror = (query) => {
      console.log("User not found");
    };

    tx.oncomplete = function () {
      // console.log("User found");
      db.close();
    };
  };
  e.preventDefault();
};

export const addTodo = (e,title,description,dateTime,cookies,setCookie,changeTodos,handleClose,notify) => {
    if(!title || !description || !dateTime) return;

    const request = idb.open("test-db", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      var tx = db.transaction("userData", "readwrite");
      var userData = tx.objectStore("userData");

      //add todo
      const v4Id = uuidv4();
      const todo = {
        id: v4Id,
        title,
        description,
        dateTime,
        completed: false,
      };
      const updatedUser = cookies.loggedInUser;
      updatedUser.todos.push(todo);

      // console.log("updatedUser", updatedUser);
      // console.log(cookies.loggedInUser.email);

      // const user = userData.put(cookies.loggedInUser.email);
      const user = userData.put(updatedUser);
      user.onsuccess = (query) => {
        console.log("Todo added");
        const date = new Date();

        const newDate = addHours(date, 1);
        // console.log("before: ", cookies.loggedInUser);
        setCookie("loggedInUser", updatedUser, {
          expires: newDate,
        });
        changeTodos(updatedUser.todos);
        // console.log("after: ", cookies.loggedInUser);
      };
      user.onerror = (query) => {
        console.log("Todo adding failed");
      };

      tx.oncomplete = function () {
        // console.log("User found");
        handleClose();
        notify("Todo added successfully ✅");
        db.close();
      };
    };

    e.preventDefault();
  };

  export const search = (keyword,date,cookies,changeTodos) => {
    console.log("keyword",keyword);
    console.log("date",date);
    if (keyword !== "" && date !== "") {
      const currentUserTodos = cookies.loggedInUser.todos;
      const searchQuery = new RegExp(keyword,"i");
      const searchResults  = currentUserTodos.filter((todo) => (!(todo.title.search(searchQuery)) 
      || !(todo.description.search(searchQuery))) && (todo.dateTime.slice(0,10) == date))
      changeTodos(searchResults);
    }else if(keyword !== ""){
      const currentUserTodos = cookies.loggedInUser.todos;
      const searchQuery = new RegExp(keyword,"i");
      const searchResults  = currentUserTodos.filter((todo) => !(todo.title.search(searchQuery)) 
      || !(todo.description.search(searchQuery)))
      changeTodos(searchResults);
    }else if(date !== ""){
      const currentUserTodos = cookies.loggedInUser.todos;
      const searchResults  = currentUserTodos.filter((todo) => (todo.dateTime.slice(0,10) == date))
      changeTodos(searchResults);
    }else{
      changeTodos(cookies.loggedInUser.todos);
    }
    // notify("Search Complete ✅");
  };

  export const markTodoComplete = (notify,cookies,data,setCookie) => {
    const request = idb.open("test-db", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      notify("An error occurred with IndexedDB ❗");
      
      // console.error(event);
    };
    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      var tx = db.transaction("userData", "readwrite");
      var userData = tx.objectStore("userData");

      const currentUser = cookies.loggedInUser;
      let currentTodo = false;

      // console.log("before", currentUser.todos[0]);
      currentUser.todos.forEach((todo) => {
        // console.log(todo.id === data.id);
        if (todo.id === data.id) {
          todo.completed = !todo.completed;
          currentTodo = todo.completed;
          return;
        }
      });
      // console.log("after", currentUser.todos[0]);

      const user = userData.put(currentUser);
      user.onsuccess = (query) => {
        console.log("Todo completed");
        const date = new Date();

        const newDate = addHours(date, 1);
        // console.log("before: ", cookies.loggedInUser);
        setCookie("loggedInUser", currentUser, {
          expires: newDate,
        });
        // console.log("after: ", cookies.loggedInUser);
      };
      user.onerror = (query) => {
        console.log("Todo completed update failed");
      notify("Todo completed update failed❗");

      };

      tx.oncomplete = function () {
        // console.log("User found");
        currentTodo ? notify("Todo completed ✅") : notify("Todo pending ❗");
        db.close();
      };
    };
  };

  export const editTodo = (notify,cookies,data,title,todoComplete,description,dateTime,setCookie) => {
    const request = idb.open("test-db", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      notify("An error occurred with IndexedDB ❗");
      // console.error(event);
    };
    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      var tx = db.transaction("userData", "readwrite");
      var userData = tx.objectStore("userData");

      const currentUser = cookies.loggedInUser;

      // console.log("before", currentUser.todos[0]);
      currentUser.todos.forEach((todo) => {
        // console.log(todo.id === data.id);
        if (todo.id === data.id) {
          todo.title = title;
          todo.completed = todoComplete;
          todo.description = description;
          todo.dateTime = dateTime;
          return;
        }
      });
      // console.log("after", currentUser.todos[0]);

      const user = userData.put(currentUser);
      user.onsuccess = (query) => {
        console.log("Todo edited");
        const date = new Date();

        const newDate = addHours(date, 1);
        // console.log("before: ", cookies.loggedInUser);
        setCookie("loggedInUser", currentUser, {
          expires: newDate,
        });
        // console.log("after: ", cookies.loggedInUser);
      };
      user.onerror = (query) => {
        console.log("Todo update failed");
        notify("Todo update failed ❗");

      };

      tx.oncomplete = function () {
        // console.log("User found");
        notify("Todo edited successfully ✅");
        db.close();
      };
    };
  };

  export const deleteTodo = (e,notify,cookies,data,setCookie,todoStateHandler) => {
    const request = idb.open("test-db", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
      notify("An error occurred with IndexedDB ❗");
    };
    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      var tx = db.transaction("userData", "readwrite");
      var userData = tx.objectStore("userData");

      //add todo
      const updatedUser = cookies.loggedInUser;
      updatedUser.todos.forEach((todo,i)=>{
        if(todo.id === data.id){
          updatedUser.todos.splice(i,1);
          return;
        }
      });

      const user = userData.put(updatedUser);
      user.onsuccess = () => {
        console.log("Todo deleted");
        const date = new Date();

        const newDate = addHours(date, 1);
        // console.log("before: ", cookies.loggedInUser);
        setCookie("loggedInUser", updatedUser, {
          expires: newDate,
        });

        todoStateHandler(updatedUser.todos);
        // console.log("after: ", cookies.loggedInUser);
      };
      user.onerror = () => {
        console.log("Todo adding failed");
        notify("Todo adding failed ❗");
      };

      tx.oncomplete = function () {
        // console.log("User found");
        notify("Todo deleted successfully ✅");
        db.close();
      };
    };

    e.preventDefault();
  };