import React from 'react';
import styles from './CSPage.module.css';

const CSPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CSS Features Page</h1>
      <p className={styles.paragraph}>
        This page demonstrates various common CSS features using CSS Modules.
      </p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Flexbox</h2>
          <p className={styles.cardContent}>
            Flexbox is a layout model that allows elements to align and distribute space within a container.
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Grid</h2>
          <p className={styles.cardContent}>
            CSS Grid Layout is a two-dimensional layout system for the web.
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Animations</h2>
          <p className={styles.cardContent}>
            CSS animations make it possible to animate transitions from one CSS style configuration to another.
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Media Queries</h2>
          <p className={styles.cardContent}>
            Media queries are useful when you want to modify your site or app depending on a device's general type.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CSPage;