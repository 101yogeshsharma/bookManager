import React, { useState } from 'react';
import Header from './components/Header'
import { Route, Switch } from "react-router-dom";
import Home from './components/home';
import AddBook from './components/AddBook';
import Register from './components/Register';
import Login from './components/Login';
import Delete from './components/Delete';
import Details from './components/details'

function App() {


  const [book, setBooks] = useState<any>("");


  function handle(row: any) {
    setBooks(row)
  }

  return (<>
    <div>
      <Header />
    </div>
    <div>
      <Switch>
        <Route exact path="/" >
          <Home getBook={handle} />
        </Route>
        <Route path="/Details/:id" component={Details} />
        <Route path="/Addbook" component={AddBook}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Delete" component={Delete}></Route>
      </Switch>
    </div>
  </>
  );
}

export default App;
