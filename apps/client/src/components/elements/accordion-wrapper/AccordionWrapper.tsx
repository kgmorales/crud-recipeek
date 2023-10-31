import React, { useState } from 'react';
import styles from './AccordionWrapper.module.scss';

interface ActiveState {
  status: boolean;
  key: number;
}

const Accordion: React.FC = () => {
  const [isActive, setIsActive] = useState<ActiveState>({
    status: false,
    key: 0,
  });

  const handleToggle = (key: number) => {
    setIsActive((prevState) => ({
      status: prevState.key !== key,
      key: prevState.key !== key ? key : 0,
    }));
  };

  const faq = [
    {
      title: 'When do you sleep?',
      content: `We don't`,
    },
    {
      title: 'Is your house chaos?',
      content: 'yes',
    },
    {
      title: 'Is it expensive?',
      content: 'yes',
    },
    {
      title: 'Are you always tired?',
      content: 'yes',
    },
  ];

  return (
    <>
      <div className={`${styles.accordion} accordion`} id="accordionFaqs">
        <div className="color-gray-900-day text-center d-flex flex-column align-items-center mt-2 mb-2">
          <h2 className="color-gray-300 d-flex align-items-center">FAQ</h2>
        </div>
        {faq.map((item, index) => (
          <div
            key={index}
            className={` ${styles.accordionItem} accordion-item wow animate__animated animate__fadeIn`}
          >
            <h2
              className="accordion-header "
              onClick={() => handleToggle(index + 1)}
            >
              <button
                className={
                  isActive.key === index + 1
                    ? `bg-gray-500 accordion-button ${styles.accordionButton} `
                    : `bg-gray-500 accordion-button collapsed ${styles.accordionButton} `
                }
              >
                <span className="color-gray-100 heading-4">{item.title}</span>
              </button>
            </h2>
            <div
              className={
                isActive.key === index + 1
                  ? 'accordion-collapse bg-gray-900 collapse show'
                  : 'accordion-collapse bg-gray-900 collapse'
              }
            >
              <div className="accordion-body">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accordion;
