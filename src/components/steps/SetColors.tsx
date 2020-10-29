import React, { useState } from 'react';
import { getEventColors } from '../../core/fetch/colors';
import { useGoogleToken, useSetEventColors } from '../../core/hooks/global_state';
import { usePromise } from '../../core/hooks/promise';
import Color from '../../core/model/Color';
import { LvType } from '../../core/model/CsvEvent';
import { Colors } from '../../core/model/GlobalState';
import ColorSelector from '../ColorSelector';

const SetColors: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const token = useGoogleToken();
  const [colors, done] = usePromise(() => {
    console.log(token);
    if (token) return getEventColors(token);
    return null;
  }, [token]);

  const [selectedColors, setSelectedColors] = useState<{ [key in LvType]: string }>({ UE: '1', VO: '1', VU: '1' });

  const setColors = useSetEventColors();

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
          onClick={() => {
            setColors(
              (Object.keys(selectedColors) as LvType[])
                .map((key) => ({ key, value: colors?.find((val) => val.id === selectedColors[key])! }))
                .reduce<{ [key: string]: Color }>((all, { key, value }) => ({ ...all, [key]: value }), {}) as Colors
            );
            onComplete();
          }}
        />
      </div>
    </div>
  );
};
export default SetColors;
