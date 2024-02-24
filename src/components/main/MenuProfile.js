import Cookies from 'js-cookie';
import React from 'react';
import {useNavigate} from 'react-router-dom'; 



const MenuProfile = () => {
    const navigate = useNavigate();


    const logout = () =>
    {
        setStatusOffline();
        Cookies.remove('jwtToken');
        navigate('/login');
    }

    const handleOnClickSearch = () =>
    {
        navigate('/search');
    }
    const handleOnClickMain = () =>
    {
        navigate('/main');
    }
    const handleOnClickSettings = () =>{
      navigate('/settings');
    }



    const setStatusOffline = async() =>
    {
      const token = Cookies.get('jwtToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    
      try {
        const response = await fetch(`http://52.91.166.31:8080/api/status/offline`, {
          method: 'POST',
          headers: headers,
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        
      } catch (error) {
        console.error('Error saving user:', error);
      }
    };

  return (
    <div className='div-center-nav'>
<div className="container">
  <input type="checkbox" id="toggle" defaultChecked />
  <label className="button" htmlFor="toggle" >
    <nav className="nav">
    <ul>
        
            <li onClick={handleOnClickMain}>
            <a>
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 25 25" width="25" height="25"><path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"/></svg>
            </a>
            </li>
        
            <li onClick={handleOnClickSearch}>
            <a>
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline"  viewBox="0 0 25 25" width="25" height="25"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></svg>
            </a>
          </li>
        
                <li onClick ={handleOnClickSettings}>
                <a >
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline"  viewBox="0 0 25 25" width="25" height="25"><path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/><path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/></svg>
                </a>
              </li>
            
       
                <li onClick={logout}>
                <a>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline"  viewBox="0 0 25 25" width="25" height="25"><path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"/><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"/></svg>
                </a>
            </li>
            
      
      
      </ul>
    </nav>
  </label>
</div>
</div>
  )
}

export default MenuProfile
