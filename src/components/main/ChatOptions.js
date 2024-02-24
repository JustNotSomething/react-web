import React from 'react'

const ChatOptions = (props) => {

  const temp = false;

  const handleClickOption = (title, users) =>
  {
    props.getOptionTitle(title, users);
  }


  return (

    <div className='profile-chats'>
    {/* <div className='option-element-center'>
    <a href  = "#" className='option-element'>Notifications</a>
    </div> */}
    <div className='chat-nav-option'>
      <div className='option-element-center chats'>
      <a href="#" className='option-element'>Chat Sections</a>
      </div>
      <ul>


      <li key='all'>
            <a onClick={() =>handleClickOption('All', [])}  className='sm-text-1' href='#'>All </a>
            { 
                temp && <div className='not-read-message-indicator options-indicator'  >45</div>
            }
        </li>

        {
            props.options.map((option, index) => (
                <li key = {index}>
                    <a onClick={() => handleClickOption(option.title, option.users)}  className='sm-text-1' href='#'>{option.title} </a>
                    { 
                        temp && <div className='not-read-message-indicator options-indicator'  >45</div>
                    }
                </li>
            ))
        }

      </ul>
      </div>
  </div>
  )
}

export default ChatOptions
