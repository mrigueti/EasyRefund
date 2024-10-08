import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/ScreenLogin/Login.jsx";
import Register from "./components/ScreenRegister/Register.jsx";
import ChangePassword from "./components/ScreenChangePassword/ChangePassword.jsx";
import UploadDocument from "./components/UploadDocument/UploadDocument.jsx";
import Permission from "./components/Permission/Permission.jsx";
import Manegement from "./components/Manegement/PageManegement.jsx";
import Home from "./components/Home/Home.jsx"
import FlowRefund from "./components/FlowRefund/FlowRefund.jsx"
import Template from './templates/Template.jsx';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< Login />} />
          <Route path='/register' element={< Register />} />
          <Route path='/change-password' element={< ChangePassword />} />
          <Route path='/home' element={< Home />} />
          <Route path='/home/flow-refund' element={< FlowRefund />} />
          <Route path='/home/flow-refund/upload-document' element={< UploadDocument />} />
          <Route path='/manegement' element={< Manegement />} />
          <Route path='/manegement/permission' element={<Permission />} />
          <Route path='/template' element={< Template/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
