import React from 'react';
import { useSetCalendarEvents } from '../../core/hooks/global_state';
import { parseCalendar } from '../../core/data/csv';

const UploadCalender: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const setEvents = useSetCalendarEvents();

  return (
    <input
      type="file"
      name="Kalender"
      className="block mx-auto"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        parseCalendar(file)
          .then((events) => setEvents(events))
          .then(() => onComplete());
      }}
    />
  );
};
export default UploadCalender;
