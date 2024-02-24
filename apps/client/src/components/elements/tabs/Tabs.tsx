import React, { useState, useEffect, useRef } from 'react';
import styles from './Tabs.module.scss'; // Make sure to create this CSS module file

const Tabs: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  const tabs: string[] = ['Ingredients', 'Directions', 'Description'];

  useEffect(() => {
    if (decorationRef.current && tabsRef.current) {
      const decorElem = decorationRef.current;
      const activeTab = tabsRef.current.children[
        activeTabIndex
      ] as HTMLLIElement;

      const decorWidth = activeTab?.offsetWidth - 1;
      const decorOffset = activeTab?.offsetLeft;

      decorElem.style.width = `${decorWidth}px`;
      decorElem.style.transform = `translateX(${decorOffset}px)`;
    }
  }, [activeTabIndex]);

  return (
    <div>
      <div className={`${styles.content} border-gray-800`}>
        <div className={styles.contentInner}>
          <div className={styles.tabs}>
            <div className={styles.tabsNav} ref={tabsRef}>
              <ul className={styles.tabsNavList}>
                {tabs.map((tab, index) => (
                  <li
                    key={tab}
                    className={`${styles.tabsNavItem} ${
                      index === activeTabIndex ? styles.jsActive : ''
                    }`}
                    onClick={() => setActiveTabIndex(index)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
              <div
                className={`${styles.tabsNavDecoration} jsDecoration`}
                ref={decorationRef}
              ></div>
            </div>
            <div className={styles.tabsPanels}>
              {tabs.map((tab, index) => (
                <div
                  key={tab}
                  className={`${styles.tabsPanel} ${
                    index === activeTabIndex ? styles.jsActive : ''
                  }`}
                >
                  {/* Content for each tab panel */}
                  <div className={styles.tabsPanelCard}>
                    <div className={styles.tabsPanelContent}>3</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
