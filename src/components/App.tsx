import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Register from '../pages/Register';
import RegisterSC from '../pages/RegisterSC';
import RegisterTCSS from '../pages/RegisterTCSS';
import Employee from '../pages/Employee';
import TSPage from '../pages/TSPage';
import CSPage from '../pages/CSPage';
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
              <Link to="/register-tcss" className={styles.navLink}>RegisterTCSS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/employee" className={styles.navLink}>Employee</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/ts-page" className={styles.navLink}>TSPage</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/cs-page" className={styles.navLink}>CSPage</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-sc" element={<RegisterSC />} />
          <Route path="/register-tcss" element={<RegisterTCSS />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/ts-page" element={<TSPage />} />
          <Route path="/cs-page" element={<CSPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;