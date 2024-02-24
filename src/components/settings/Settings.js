import React from 'react'
import './settings.css'
import UserInput from '../updateFormComponents/UserInput'
import PhoneInput from '../updateFormComponents/PhoneInput'
import DateInput from '../updateFormComponents/DateInput'
import PasswordInput from '../updateFormComponents/PasswordInput'
import EmailInput from '../updateFormComponents/EmailInput'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const Settings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadAvatar = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const token = Cookies.get('jwtToken');
      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
      });

      try {
        const response = await fetch('http://52.91.166.31:8080/api/file/upload', {
          method: 'POST',
          body: formData,
          headers: headers,
        });

        getUsersAvatar();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };


  const getUsersAvatar = async() =>{
    try {
      const token = Cookies.get('jwtToken');
      const response = await axios.get('http://52.91.166.31:8080/api/file/get/avatar', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'arraybuffer',
      });

      console.log(response);

    if (response.status === 200)
    {
      const blob = new Blob([response.data]);
      setUserAvatar(URL.createObjectURL(blob));
    }
    else{
      setUserAvatar('/img/profile-test-img.png');
    }

    } catch (error) {
      setUserAvatar('/img/profile-test-img.png');
      console.error('Error:', error);
    }
  }




  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = async() => {

    setIsChecked((prevChecked) => !prevChecked);
    if (!isChecked) {
      hideProfileChecked();
    } else {
      revealProfileUnchecked();
    }
  };

  const hideProfileChecked = async() => {

    try {
      const token = Cookies.get('jwtToken');
      const response = await axios.patch('http://52.91.166.31:8080/api/hideProfile', null, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const revealProfileUnchecked = async() => {

    try {
      const token = Cookies.get('jwtToken');
      const response = await axios.patch('http://52.91.166.31:8080/api/revealProfile', null, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      
    } catch (error) {
      console.error('Error:', error);
    }
  };



useEffect(() => {
  const fetchProfileVisibility = async () => {
    try {
      const token = Cookies.get('jwtToken');
      const response = await axios.get('http://52.91.166.31:8080/api/getProfileVisibility', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

    
      setIsChecked(response.data.visible);
 
    } catch (error) {
      console.error('Error:', error);
    }
  };


  fetchProfileVisibility();
}, []);




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
     
  const [userData, setUserData] = useState({
    username: '',
    email : '', 
    password: '',
    phone: '',
    dateOfBirth: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOnSubmitUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const token = Cookies.get('jwtToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      const response = await axios.patch('http://52.91.166.31:8080/api/updateUser', userData, {
        headers: headers,
      });
  
      setUserData({
        username: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
      });

      const newToken = response.data['jwt-token'];

      if(token)
      {
        Cookies.remove('jwtToken');
        Cookies.set('jwtToken', newToken);
      }
  
      console.log("Success");
      navigate('/main');
  
    } catch (error) {
      console.error('Error:', error);
    }
};
  

    const handleOnClickDeleteAccount = async () => {
        const token = Cookies.get('jwtToken');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    
        try {
            const response = await fetch('http://52.91.166.31:8080/api/deleteProfile', {
                method: 'DELETE',
                headers: headers,
            });
    
            if (response.ok) {
                Cookies.remove('jwtToken');
                navigate('/login');
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleClick = () => {
      fileInputRef.current.click();
    };
  
    useEffect(() =>{
      getUsersAvatar();
    }, []);
    

  return (
    <div className='settings-body'>
    <div className='settings-container'>
     <div className='settings-header'>
        <h1>Settings</h1>
        <div className='main-menu-options-select'>
        <ul className='list-settings'>
        
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
               
        </div>
     </div>
     <div className='main-settings-block'>
        <div className='settings-small-menu'>
        <ul className='settings-small-menu-list'>
          
            
            <li className='settings-option'>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><g id="_01_align_center" data-name="01 align center"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z"/></g></svg>
                 
               <div className='settings-option-p'>Hide Profile</div>
               <div className="checkbox-wrapper-43">
                <input type="checkbox" id="cbx-43"   
                 checked={isChecked || false}
                 onChange={handleCheckboxChange}
                />
                <label htmlFor="cbx-43" className="check">
                    <svg width="17px" height="17px" viewBox="0 0 18 18">
                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
                </div>
            </li>

            <li className='settings-option'>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="m20.5,0H4.5c-1.378,0-2.5,1.122-2.5,2.5v19c0,1.378,1.122,2.5,2.5,2.5h17.5V1.5c0-.827-.673-1.5-1.5-1.5ZM4.5,1h16c.276,0,.5.224.5.5v17.5H4.5c-.562,0-1.082.187-1.5.501V2.5c0-.827.673-1.5,1.5-1.5Zm0,22c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5h16.5v3H4.5Zm9.644-9.152l1.373,2.746,1.373-2.746,2.746-1.373-2.746-1.373-1.373-2.746-1.373,2.746-2.746,1.373,2.746,1.373Zm.745-2l.627-1.254.627,1.254,1.254.627-1.254.627-.627,1.254-.627-1.254-1.254-.627,1.254-.627Zm-6.35-1.33l1.172-2.346,2.346-1.172-2.346-1.172-1.172-2.346-1.173,2.346-2.345,1.172,2.345,1.172,1.173,2.346Zm-.428-3.945l.428-.854.427.854.854.427-.854.427-.427.854-.428-.854-.854-.427.854-.427Z"/></svg>

               <div className='settings-option-p'>Dark Mode</div>
             

             
            <div className="checkbox-wrapper-7">
            <input className="tgl tgl-ios" id="cb2-7" type="checkbox"   defaultChecked={false} />
            <label className="tgl-btn" htmlFor="cb2-7"/>
            </div>
            </li>

            

        </ul>
        </div>
        <div className='settings-profile'>
        <div className='avatar-settings'>
        <div className='avatar-settings-block'>

          <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }
        }
        onChange={handleFileChange}
          
        />
           <div className='avatar-round' onClick={handleClick}>
           <img src={userAvatar} className='avatar-settings-icon'/>

            </div>
            <div className='avatar-description'>
            <p className='avatar-header'>Avatar</p>
            <input className='change-avatar-btn' type='submit' value={'Upload Photo'} onClick={handleUploadAvatar}/>
            </div>
        </div>
        </div>
        <div className='profile-settings-block'>
        <div className='profile-info-settings'>
            <p className='profile-info-settings-description'>Personal details</p>
            <div className='profile-input-settings-block'>
             <form className='update-profile-details-form' onSubmit={handleOnSubmitUpdate}>
             

            <UserInput name = "username" value={userData.username} onChange={handleInputChange} />
            <EmailInput  name = "email" value={userData.email} onChange={handleInputChange} />
            <PhoneInput  name = "phone" value={userData.phone} onChange={handleInputChange}/>
            <DateInput  name = "dateOfBirth" value={userData.dateOfBirth} onChange={handleInputChange} />
            <PasswordInput  name = "password" value={userData.password} onChange={handleInputChange} />


             <div className='footer-profile-settings'>
             <input type='submit' value={'Update'} className='update-profile-btn' />
             <input onClick={handleOnClickDeleteAccount} type='submit' value={'Delete Account'} className='delete-profile-btn' />
             </div>
            </form> 
            </div>
        </div>
        </div>
        </div>
     </div>
     </div>
    </div>
  )
}

export default Settings
