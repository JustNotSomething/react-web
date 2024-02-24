import React from 'react'
import './section.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useState, useEffect } from 'react';
import FriendToSection from './FriendToSection';
import MinSection from './MinSection';
import axios from 'axios';


const SectionChat = () => {
const navigate = useNavigate();
const [peopleArray, setPeopleArray] = useState([]);
const [friendToSectionArray, setFriendToSectionArray] = useState([]);
const [sectionsArray, setSectionsArray] = useState([]);
const [selectedSectionTitle, setSelectedSectionTitle] = useState('');


const[updateSectionTitle, setUpdateSectionTitle] = useState('');
const[updatedFriendArrayToAdd, setUpdatedFriendArrayToAdd] = useState([]);

const[updatedFriendArrayToRemove, setUpdatedFriendArrayToRemove] = useState([]);

const [sectionTitle, setSectionTitle] = useState('');

const [friendsAvatarsArray, setFriendsAvatarsArray] = useState([]);
    
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

    const handleDeleteUserFromSection = (user) =>
    {
        setUpdatedFriendArrayToRemove((prevArr) => [...prevArr, user])
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

     
    const fetchUserChatSections = async () => {
        const token = Cookies.get('jwtToken');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
    
        try {
          const response = await fetch('http://52.91.166.31:8080/api/sections', {
            method: 'GET',
            headers: headers,
          });
    
          const jsonData = await response.json();
          setSectionsArray(jsonData);
          console.log(sectionsArray);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      useEffect(() => {
        fetchUserChatSections();
        fetchUserPeople();
        fetchUserPeopleAvatars();
      }, []);



    const updateSection = async() =>
    {
        
        if (updateSectionTitle === '')
        {
            setUpdateSectionTitle(selectedSectionTitle);
        }
       

        try{
            const token = Cookies.get('jwtToken');
            

            const sectionData = {
                prevTitle: selectedSectionTitle,
                newTitle: updateSectionTitle,
                usersToDelete: updatedFriendArrayToRemove || [],
                usersToAdd: updatedFriendArrayToAdd || [],
            };
        
        
                await axios.post('http://52.91.166.31:8080/api/sections/update', sectionData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            
                console.log('Section Data:' + sectionData.usersToDelete);
                setUpdatedFriendArrayToAdd([]);
                setUpdatedFriendArrayToRemove([]);
                setUpdateSectionTitle('');
                setSelectedSectionTitle('');

                
                fetchUserPeople();
                fetchUserPeopleAvatars();
                fetchUserChatSections();

            }
        catch (error) {
            console.error('Error:', error);
        }

    }




    const createSection = async() => {
    if (sectionTitle !== '' && friendToSectionArray.length !== 0)
    {

        try{
            const token = Cookies.get('jwtToken');
            

            const sectionData = {
                title: sectionTitle,
                users: friendToSectionArray,
            };
        
        
                await axios.post('http://52.91.166.31:8080/api/sections/create', sectionData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            
                setFriendToSectionArray([]);
                fetchUserChatSections();
            }
        catch (error) {
            console.error('Error:', error);
        }
    }
        
       

    }


      

    const fetchUserPeople = async () => 
     {
          const token = Cookies.get('jwtToken');
          const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
    
          try {
            const response = await fetch('http://52.91.166.31:8080/api/sections/getOther', {
              method: 'GET',
              headers: headers,
            });
    
            const jsonData = await response.json();
            setPeopleArray(jsonData);
            
          } catch (error) {
            console.error('Error:', error);
          }
        };
    

    
        const fetchUserPeopleAvatars = async () => 
        {
            try {
              const token = Cookies.get('jwtToken');

              const response = await axios.get(`http://52.91.166.31:8080/api/sections/getOther/avatars`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              });

              setFriendsAvatarsArray(response.data);


            } catch (error) {
              console.error('Error fetching avatars:', error);
            }     
        };
       

    
     

  return (
    <div className='section-main-block'>
        <div className='section-main-container'>
        <div className='section-block-header'>
            <h1 className='section-main-block-header'>Chat Sections</h1>


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

        <div className='main-section-block-div'>
        <div className='create-new-section-block'>
            <h2>Create New Chat Section</h2>
            <div className='create-section-form' >
            <label className='create-section-label' htmlFor='section-title-input'> </label>
            
            <input className='section-title-input' id='section-title-input'placeholder='Section Title'   value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}/>

            <div className='add-people-to-section-div'>
             <p className='section-people-add'>  Add People to Section </p>
            {peopleArray.length === 0 ? 
            
            <div>
                You don't have any friends, find and add them in search section
            </div>
            : 
            ( 
                <div className='all-friends-section'>
                {peopleArray
                  .filter((user) => !friendToSectionArray.some((friend) => friend === user.username))
                  .map((user) => (
                    <FriendToSection key={user.username} username={user.username} email={user.email} setArray={setFriendToSectionArray} friendsAvatarsArray={friendsAvatarsArray} id = {user.id}/>
                  ))}
              </div>
            )
            }
            </div>
            <input type="submit" className='create-section-btn' value={'Create'} onClick={createSection}/>
            </div>
        </div>

        <div className='all-sections-block'>
            <h2>Your Sections</h2>
            <div className='section-sm-block'>
            <div className='all-sections-list'>
                {
                    sectionsArray.map((section, index) =>(
                    <MinSection sectionUsers={section.users} title={section.title} key={index}
                    onSelectSection={setSelectedSectionTitle}
                    setUpdatedFriendArrayToRemove={setUpdatedFriendArrayToRemove}
                    setUpdatedFriendArrayToAdd={setUpdatedFriendArrayToAdd}
                    
                    />
                    ))
                }
            
    
            </div>
            </div>
        </div>
        <div className='manage-section-block'>
        
        
        {selectedSectionTitle !== '' && (
  <div className='update-section-container'>  
    <h2>{selectedSectionTitle}</h2> 
    <div className='update-section-block'>
      <input
        className='section-title-input'
        id='section-title-input'
        placeholder='Update Title'
        value={updateSectionTitle}
        onChange={(e) => setUpdateSectionTitle(e.target.value)}
      />
      <div className='all-friends-section space-top'>
        {sectionsArray
          .find((section) => section.title === selectedSectionTitle)
          .users.filter((user) => !updatedFriendArrayToRemove.includes(user)).map((user) => (
            <div className='some-user-block section-chat-user-block-delete' key={user}>
              <div className='username-search-block'>{user}</div>
              <div className='null-empty-div'></div>
              <div className='null-empty-div'></div>
              <button className="bookmarkBtn" onClick={() => handleDeleteUserFromSection(user)}>
                <span className="IconContainer"> 
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" height="0.9em"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                </span>
                <p className="text-p">Remove</p>
              </button>
            </div>
          ))}
      </div>
      <div className='users-to-update-add'>
      <p className='section-people-add'>  Add People to Section </p>
      <div className='all-friends-section'>
                {peopleArray
                  .filter((user) => !updatedFriendArrayToAdd.some((friend) => friend === user.username))
                  .map((user) => (
                    <FriendToSection key={user.username} username={user.username} email={user.email} setArray={setUpdatedFriendArrayToAdd} friendsAvatarsArray={friendsAvatarsArray} id = {user.id}/>
                  ))}
              </div>
      </div>
      <div className='update-section-btn-div'>
      <input type="submit" className='update-section-btn' value={'Update'} onClick={updateSection}/>
        </div>
    </div>
  </div>
)}

          </div>
    

        </div>
        </div>
    </div>
  )
}

export default SectionChat
