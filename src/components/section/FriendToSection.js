import React from 'react'

const FriendToSection = (props) => {

    const handleAddToSectionClick = () =>
    {
       
        props.setArray((prevArray) => [...prevArray, props.username]);
    }

  return (
    <div className='some-user-block section-chat-user-block'>
       
    <div className='icon-block'>
        <div className='small-icon-block'>



            {props.friendsAvatarsArray.find((avatar) => avatar.id === props.id) ? (
            <img
              src={`data:image/png;base64,${props.friendsAvatarsArray.find((avatar) => avatar.id === props.id).avatar}`}
              alt={`Avatar of ${props.username}`}
            />
          ) : (
            <img src="/img/profile-test-img.png" alt="Fallback Avatar" />
          )}


    </div>
    </div>
    <div className='username-search-block'>
           {props.username}
    </div>
    <div className='email-search-block'>
            {props.email}
    </div>
    
    <div className='null-empty-div'></div>

    <button className="bookmarkBtn" onClick={handleAddToSectionClick}>
    <span className="IconContainer"> 
        <svg viewBox="0 0 384 512" height="0.9em" className="icon-w"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
    </span>
    <p className="text-p" onClick={handleAddToSectionClick}>Add</p>
    </button>

    </div>
  )
}

export default FriendToSection
