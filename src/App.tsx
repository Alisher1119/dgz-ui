import { ReactSelect } from './ui/form';

/**
 * Root component of the application.
 * Currently renders the TimePicker component for demonstration or testing purposes.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <>
      <ReactSelect
        options={[]}
        containerProps={{
          'data-testid': '123123',
        }}
      />
    </>
  );
}

export default App;
