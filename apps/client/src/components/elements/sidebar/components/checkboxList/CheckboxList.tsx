import React, { useEffect, useState } from 'react';
import styles from './CheckboxList.module.scss';

type ListItem = {
  label: string;
  checked: boolean;
};

interface CheckboxListProps {
  items: string[] | undefined;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ items = [] }) => {
  const [listItems, setListItems] = useState<ListItem[]>([]);

  useEffect(() => {
    if (items) {
      const newItems = items.map((item) => ({
        label: item,
        checked: false,
      }));
      setListItems(newItems);
    }
  }, [items]);
  // Handle change for checkboxes and label click
  const handleToggle = (index: number) => {
    setListItems((currentListItems) =>
      currentListItems.map(
        (item, idx) =>
          idx === index ? { ...item, checked: !item.checked } : item, // Toggle checked state for the clicked item
      ),
    );
  };

  return (
    <div className={`${styles.Input}`}>
      {listItems.map((item, index) => (
        <div key={item.label}>
          <input
            id={`checkbox${index}`}
            type="checkbox"
            checked={item.checked}
            onChange={() => handleToggle(index)}
          />
          <label htmlFor={`checkbox-${index}`}>
            <span
              onClick={() => handleToggle(index)}
              style={{
                textDecoration: item.checked ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
