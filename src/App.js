
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Main from './components/main/Main';
import Admin from './components/admin/Admin';
import PrivateRouteAdmin from './components/customs/PrivateRouteAdmin';
import PrivateRouteUser from './components/customs/PrivateRouteUser';
import Search from './components/search/Search';
import MyWebSocketComponent from './components/testChat/MyWebSocketComponent';
import Settings from './components/settings/Settings';
import SectionChat from './components/section/SectionChat';
import Welcome from './components/start/Welcome';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Welcome />} />

          
          <Route
            path="/admin"
            element={<PrivateRouteAdmin path="/admin" element={<Admin/>} role = {'ROLE_ADMIN'}/>}
          />

            <Route
            path="/main"
            element={<PrivateRouteUser path="/main" element={<Main/>}/>}
          />
            
            <Route
            path="/search"
            element={<PrivateRouteUser path="/search" element={<Search/>}/>}
          />

            <Route
            path="/testChat"
            element={<PrivateRouteUser path="/testChat" element={<MyWebSocketComponent/>}/>}
          />
          <Route
            path="/settings"
            element={<PrivateRouteUser path="/settings" element={<Settings/>}/>}
          />
             <Route
            path="/sections"
            element={<PrivateRouteUser path="/sections" element={<SectionChat/>}/>}
          />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
