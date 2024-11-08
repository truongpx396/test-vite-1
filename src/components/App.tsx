import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Register from '../pages/Register';
import RegisterSC from '../pages/RegisterSC';
import Employee from '../pages/Employee';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/about" className={styles.navLink}>About</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/register" className={styles.navLink}>Register</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/register-sc" className={styles.navLink}>RegisterSC</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/employee" className={styles.navLink}>Employee</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-sc" element={<RegisterSC />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;