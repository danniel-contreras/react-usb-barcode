import { useState, useEffect } from 'react';
import { formatAMPM } from '../utils/functions';
function Clock(){
  const [date, setDate] = useState(new Date());
  
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <span className='mx-4 text-sm font-semibold'>
      {formatAMPM(date)}
    </span>
  );
}
export default Clock;

