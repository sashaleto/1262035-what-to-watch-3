import React from 'react';
import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {films, title, genre, year} = props;
  return (
    <Main title={title} genre={genre} year={year} films={films}/>
  );
};

export default App;
