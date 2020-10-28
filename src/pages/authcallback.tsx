import React from 'react';
import { useUrlFragment } from '../core/hooks/route';
import { parseCalendar } from '../core/parse/csv';

const Home: React.FC = () => {
  const fragment = useUrlFragment() as { access_token: string; token_type: string; expires_in: string; scope: string };

  return (
    <div>
      <h1 className="text-4xl text-red-500">Hello Callback</h1>
      <input
        type="file"
        name="calendar"
        id="calendar"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          parseCalendar(file).then((res) => console.log(res[0]));
        }}
      />
    </div>
  );
};
export default Home;
