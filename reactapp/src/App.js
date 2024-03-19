import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import { Fragment } from 'react';
import LoginForm  from './Components/login/login';

const App = () => {
<BrowserRouter>
<Switch>
<Route exact path="/login" component={LoginForm}/>
<Route exat path="/" component= {ChatRoom}/>
</Switch>
</BrowserRouter>

}

export default App;
