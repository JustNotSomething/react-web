import React, { useEffect, useState } from 'react'
import MenuProfile from './MenuProfile';
import ProfileIcon from './ProfileIcon';
import ProfileInfo from './ProfileInfo';
import ChatOptions from './ChatOptions';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProfileBlock = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    const userRole = jwtDecode(token).role;

    if (userRole.includes('ROLE_ADMIN'))
    {
        setIsAdmin(true);
    }

  }, []);

  const handleAdminPage = () =>
  {
      navigate('/admin');
  }

  return (
    <div className="profile-block">
      <MenuProfile/>
      <div className='profile-details'>
        <ProfileIcon avatar={props.avatar}/>
        <ProfileInfo username={props.username} email={props.email}/>
      </div>
      <ChatOptions getOptionTitle={props.getOptionTitle} options={props.sectionsArray} setOptionUsersAll={props.setOptionUsersAll}/>
      {
          isAdmin && <div className='admin-p-block'>
            <div className='admin-p' onClick={handleAdminPage}>
              Admin Page
            </div>
          </div>
      }
    </div>
  )
}

export default ProfileBlock
