import React, { useEffect, useState } from 'react';
import { getEventColors } from '../../core/data/colors';
import { usePromise } from '../../core/hooks/promise';
import { LvType } from '../../core/model/CsvEvent';
import ColorSelector from '../ColorSelector';

const SetColors: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [colors, done] = usePromise(() =>
    getEventColors(
      'ya29.a0AfH6SMDf_9WRSutUGlm3KVjRAMOJRx1pASUVkt2cffdplwEm6NMDCW_jtHrvd2subJfI0QSUolTztXfJsKhJ3tzjzYdkBKhIUP9PtMgKef_BfjOZHa1Gps6eV8o8WqnQhErGyJxeGKUm31C-iT5b1ZY5lfiO8ZADp4o'
    )
  );

  const [selectedColors, setSelectedColors] = useState<{ [key in LvType]: string }>({ UE: '1', VO: '1', VU: '1' });

  return (
    <div className="w-full flex flex-row">
      <div>
        {done && (
          <div className="mb-16">
            <ColorSelector
              title="Vorlesungen"
              colors={colors!}
              selectedId={selectedColors.VO}
              onSelect={(id) => setSelectedColors((old) => ({ ...old, VO: id }))}
            />
          </div>
        )}
        {done && (
          <div className="mb-16">
            <ColorSelector
              title="Übungen"
              colors={colors!}
              selectedId={selectedColors.UE}
              onSelect={(id) => setSelectedColors((old) => ({ ...old, UE: id }))}
            />
          </div>
        )}
        {done && (
          <ColorSelector
            title="Vorlesung/Übung"
            colors={colors!}
            selectedId={selectedColors.VU}
            onSelect={(id) => setSelectedColors((old) => ({ ...old, VU: id }))}
          />
        )}
      </div>
      <div className="flex-grow flex justify-end items-center">
        <input
          className="text-4xl font-semibold leading-none bg-primary text-light px-10 py-6 cursor-pointer"
          type="button"
          value="Weiter"
          onClick={() => onComplete()}
        />
      </div>
    </div>
  );
};
export default SetColors;
