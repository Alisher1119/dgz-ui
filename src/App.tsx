import { Checkbox, Input, Label, ReactSelect } from './ui/form';

/**
 * Root component of the application.
 * Currently renders the TimePicker component for demonstration or testing purposes.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div className={'mx-auto max-w-2xl space-y-6'}>
      <Label className="flex items-center space-x-3">
        <Checkbox />
        <div className="space-y-1 leading-none">
          <Label>Checkbox</Label>
        </div>
      </Label>
      <Label className="flex items-center space-x-3">
        <Checkbox />
        <div className="space-y-1 leading-none">
          <Label>Checkbox</Label>
        </div>
      </Label>
      <Input placeholder={'123'} />
      <ReactSelect
        placeholder={'123'}
        options={[
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '3',
            value: '3',
          },
          {
            label: '4',
            value: '5',
          },
        ]}
      />
    </div>
  );
}

export default App;
