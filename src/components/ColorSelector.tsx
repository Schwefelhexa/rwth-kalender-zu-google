import React from 'react';
import Color from '../core/model/Color';

interface Props {
  title: string;

  colors: Color[];
  selectedId: string;

  onSelect: (id: string) => void;
}
const ColorSelector: React.FC<Props> = ({ title, colors, selectedId, onSelect }) => (
  <div>
    <h2 className="text-primary text-4xl font-semibold mb-2">{title}</h2>
    <ul className="list-none flex flex-row">
      {colors!.map((color) => (
        <li
          key={color.id}
          className={`w-10 h-10 rounded-full mr-4 cursor-pointer ${
            selectedId !== color.id ? 'border-8 border-solid' : ''
          }`}
          style={{
            backgroundColor: selectedId === color.id ? color.background : undefined,
            borderColor: selectedId === color.id ? undefined : color.background,
          }}
          onClick={() => onSelect(color.id)}
        ></li>
      ))}
    </ul>
  </div>
);
export default ColorSelector;
