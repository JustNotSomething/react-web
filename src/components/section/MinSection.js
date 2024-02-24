import React from 'react'

const MinSection = (props) => {

    const handleSectionClick = () => {
        props.onSelectSection(props.title);
        props.setUpdatedFriendArrayToRemove([]);
        props.setUpdatedFriendArrayToAdd([]);
      };

  return (
    <div className='min-section-block'>
      <div className='section-sm-option' onClick={handleSectionClick}>{props.title}</div>
      <div className='section-sm-option-users'>
        { props.sectionUsers.map((user,index) =>(
            <div key={index} className='section-sm-option-user'>{user}</div>

        ))
             
        }
       
      </div>
    </div>
  )
}

export default MinSection
