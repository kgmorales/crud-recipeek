import React, { useEffect, useState } from 'react';

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
    <div>
      {listItems.map((item, index) => (
        <div key={item.label}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleToggle(index)}
          />
          <span
            onClick={() => handleToggle(index)}
            style={{
              textDecoration: item.checked ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
