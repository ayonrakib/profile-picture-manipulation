
import '../App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>

function App() {
  return (
    <BrowserRouter>
      <Route exact path = "/login" component = {Login}></Route>
      <Route exact path = "/" component = {Home}></Route>
    </BrowserRouter>
  );
}

export default App;