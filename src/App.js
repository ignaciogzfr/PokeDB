import './App.css';
import React from 'react';
import Header from './Components/Layout/Header';
import PkList from './Pages/PkList';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <PkList></PkList>
    </div>
  );
}

export default App;
