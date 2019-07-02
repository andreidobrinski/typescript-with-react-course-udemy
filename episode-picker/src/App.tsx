import React from 'react';
import { Store } from './Store';

const App = (): JSX.Element => {
  const store = React.useContext(Store);

  return <div>app</div>;
};

export default App;
