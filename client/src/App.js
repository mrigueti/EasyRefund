import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/ScreenLogin/Login.jsx";
import Register from './pages/ScreenRegister/ScreenRegister.jsx';
import ChangePassword from "./pages/ScreenChangePassword/ChangePassword.jsx";
import UploadDocument from "./pages/UploadDocument/UploadDocument.jsx";
import Permission from "./pages/Permission/Permission.jsx";
import Manegement from "./pages/Manegement/Manegement.jsx";
import Home from "./pages/HomeEmployee/Home.jsx"
import FlowRefund from "./pages/FlowRefund/FlowRefund.jsx"
import InformationUser from './pages/InformationUser/InformationUser.jsx';
import PageManager from './pages/PageManager/PageManager.jsx'
import HistoryUser from './pages/HistoryUser/HistoryUser.jsx';
import ProtectedPage from './components/ProtectedPage/ProtectedPage.jsx';
import AccessDenied from './pages/AcessoNegado/AcessoNegado.jsx';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* Fluxo de Login/Cadastro/AlterarSenha */}
          <Route path='/' element={< Login />} />
          <Route path='/change-password' element={<ChangePassword/>} />

          {/*Fluxo do gerente*/}
          <Route path='/manager' element={<ProtectedPage requiredRole="Gerente"><PageManager /></ProtectedPage>} />
          <Route path='/manager/register' element={<ProtectedPage requiredRole="Gerente"><Register /></ProtectedPage>} />

          {/* Fluxo do funcionário */}
          <Route path='/home' element={<ProtectedPage requiredRole="Funcionário"><Home /></ProtectedPage>} />
          <Route path='/home/flow-refund' element={<ProtectedPage requiredRole="Funcionário"><FlowRefund /></ProtectedPage>} />
          <Route path='/home/HistoryUser' element={<ProtectedPage requiredRole="Funcionário"><HistoryUser /></ProtectedPage>} />
          <Route path='/home/flow-refund/upload-document' element={<ProtectedPage requiredRole="Funcionário"><UploadDocument /></ProtectedPage>} />

          {/* Fluxo do Liberador */}
          <Route path='/manegement' element={<ProtectedPage requiredRole="Aprovador"><Manegement /></ProtectedPage>} />
          <Route path='/manegement/permission' element={<ProtectedPage requiredRole="Aprovador"><Permission /></ProtectedPage>} />

          {/*Fluxo de informações do usuário*/}
          <Route path='/informationUser' element={<InformationUser />} />

          <Route path='/acess-denied' element={<AccessDenied />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
