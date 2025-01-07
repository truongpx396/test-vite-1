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
import TmpPage from '../pages/TmpPage';
import ItemsPage from '../features/items'
import styles from './App.module.css';

const BASE_PATH = '/test-vite-1';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/`} className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/about`} className={styles.navLink}>About</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/register`} className={styles.navLink}>Register</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/register-sc`} className={styles.navLink}>RegisterSC</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/register-tcss`} className={styles.navLink}>RegisterTCSS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/employee`} className={styles.navLink}>Employee</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/ts-page`} className={styles.navLink}>TSPage</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/cs-page`} className={styles.navLink}>CSPage</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/redux-page`} className={styles.navLink}>ReduxPage</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={`${BASE_PATH}/tmp-page`} className={styles.navLink}>TmpPage</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path={`${BASE_PATH}/`} element={<Home />} />
          <Route path={`${BASE_PATH}/about`} element={<About />} />
          <Route path={`${BASE_PATH}/register`} element={<Register />} />
          <Route path={`${BASE_PATH}/register-sc`} element={<RegisterSC />} />
          <Route path={`${BASE_PATH}/register-tcss`} element={<RegisterTCSS />} />
          <Route path={`${BASE_PATH}/employee`} element={<Employee />} />
          <Route path={`${BASE_PATH}/ts-page`} element={<TSPage />} />
          <Route path={`${BASE_PATH}/cs-page`} element={<CSPage />} />
          <Route path={`${BASE_PATH}/redux-page`} element={<ItemsPage />} />
          <Route path={`${BASE_PATH}/tmp-page`} element={<TmpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;