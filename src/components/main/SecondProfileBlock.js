import React from 'react';
import MenuProfile from './MenuProfile';
import ProfileIcon from './ProfileIcon';
import ProfileInfo from './ProfileInfo';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import './mainStyles.css';
import { useNavigate } from 'react-router-dom';

const SecondProfileBlock = ({avatar}) => {
    const navigate = useNavigate();
    const token = Cookies.get('jwtToken');
    const userName = jwtDecode(token).username;
    const email = jwtDecode(token).email;


const onClickSections = () =>
{
  navigate('/sections')
}
    
  return (
      <div className="profile-block search-profile-block">
        <MenuProfile/>
        <div className='profile-details'>
          <ProfileIcon avatar={avatar}/>
          <ProfileInfo username={userName} email={email}/>
        </div>

        <div className='chat-section-create-block'>
          <div onClick={onClickSections} className='add-section-title'>
           <p className='add-section-text'>
           Manage Sections
            </p>
          </div>
        </div>
      </div>
    )
  }


export default SecondProfileBlock
