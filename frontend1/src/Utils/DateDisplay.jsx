import React from 'react';

const DateDisplay = (props) => {
  const calculateMinutesAgo = () => {
    const date = new Date(props.date)
    const currentTime = new Date();
    const timeDiff = Math.abs(currentTime - date);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }else{
      return `${minutes} minutes ago`;
    }

  };

  return (
    <div className='date-all1'>
      {calculateMinutesAgo()}
    </div>
  );
};

export default DateDisplay;