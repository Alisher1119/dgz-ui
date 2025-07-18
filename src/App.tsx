import { TimePicker } from './ui/calendar';
import { useState } from 'react';

function App() {
  const [time, setTime] = useState<string>('00:00');
  return (
    <div>
      {time}
      <TimePicker value={time} onChange={setTime} icon={null} />
    </div>
  );
}

export default App;
