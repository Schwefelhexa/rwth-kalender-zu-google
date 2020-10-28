import React from 'react';
import { parseCalendar } from '../../core/parse/csv';

const UploadCalender: React.FC<{ onComplete: () => void }> = ({ onComplete }) => (
  <input
    type="file"
    name="Kalender"
    className="block mx-auto"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      parseCalendar(file)
        .then(console.table)
        .then(() => onComplete());
    }}
  />
);
export default UploadCalender;
