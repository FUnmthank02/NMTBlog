import { createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase_config'
import './App.css';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Home from './component/home/Home';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState({})

  // set lai user khi thay doi
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    localStorage.setItem('user', currentUser)
    localStorage.setItem('userEmail', currentUser.email)
  })

  return (

    <UserContext.Provider value={user}>
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    </UserContext.Provider>

  );
}

export default App;
