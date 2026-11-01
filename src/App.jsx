
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [page, setPage] = useState('login');

  const isLoggedIn = useSelector(
    (state) => state.auth.token !== null
  );

  let content;

  if (isLoggedIn) {
    content = (
      <div className="container mt-5">
        <h2>Welcome to PromptPix!</h2>
      </div>
    );
  } else if (page === 'register') {
    content = (
      <Register
        onLogin={() => setPage('login')}
        onSuccess={() => setPage('login')}
      />
    );
  } else {
    content = (
      <Login onRegister={() => setPage('register')} />
    );
  }

  return (
    <>
      <Header />
      <main>{content}</main>
    </>
  );
}

export default App;
