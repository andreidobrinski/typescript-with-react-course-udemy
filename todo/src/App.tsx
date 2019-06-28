import React, { useState } from 'react';

type FormElem = React.FormEvent<HTMLFormElement>;

const App: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    setValue('');
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
    </>
  );
};

export default App;
