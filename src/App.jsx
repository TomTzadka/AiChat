import { useState } from 'react';

// import './App.css';
import './main.css';

import AuthPage from './AuthPage';
import ChatsPage from './ChatsPage';
import FormPage from './FormPage';


function App() {
  const [user, setUser] = useState(undefined);
  const [showFormPage, setShowFormPage] = useState(true); // Default to show the FormPage

  if (!user) {
    return <AuthPage onAuth={user => setUser(user)} />;
  } else {
    return (
      <div className="app-container">
        <div className="toggle-buttons">
          <button className="auth-button" onClick={() => setShowFormPage(!showFormPage)}>
            {showFormPage ? 'הצג שיחות' : 'הצג טופס'}
          </button>
        </div>
        {showFormPage ? <FormPage user={user} /> : <ChatsPage user={user} />}
      </div>
    );
  }
}

export default App;
