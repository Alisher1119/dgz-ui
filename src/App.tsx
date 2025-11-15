import { type Option, ReactSelect } from './ui/form';
import { useMemo } from 'react';

function App() {
  const pageOptions = useMemo(() => {
    const options: Option[] = [];
    for (let i = 0; i < 100000; i++) {
      options.push({
        value: `${i + 1}`,
        label: `${i + 1}`,
      });
    }
    return options;
  }, []);

  return (
    <div className={'p-4'}>
      <ReactSelect
        menuIsOpen={true}
        className={'min-w-20'}
        isClearable={false}
        options={pageOptions}
        onChange={console.log}
      />
    </div>
  );
}

export default App;
