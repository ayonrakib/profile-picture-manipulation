
import '../App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import DeleteUser from './DeleteUser';
import Count from './Count';

import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>

function App() {
  return (
    <BrowserRouter>
      <Route exact path = "/login" component = {Login}></Route>
      <Route exact path="/delete-user" component={DeleteUser}/>
      <Route exact path = "/count" component={Count}/>
      <Route exact path = "/" component = {Home}></Route>
      
      
    </BrowserRouter>
  );
}

export default App;