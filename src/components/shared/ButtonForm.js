import React from 'react'

const ButtonForm = (props) => {
  return (
    <button type="submit" onClick={() => false} className='btn-form'>
      {props.text}
    </button>
  );
};

export default ButtonForm
