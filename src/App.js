import './App.css';
import React from 'react';
import Header from './components/layout/Header';
import PkList from './pages/PkList';
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
