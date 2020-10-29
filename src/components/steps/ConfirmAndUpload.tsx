import React from 'react';
import { batchCreateEvents } from '../../core/fetch/events';
import { getUserInfo } from '../../core/fetch/user';
import { useCalendarEvents, useEventColors, useGoogleToken } from '../../core/hooks/global_state';
import { usePromise } from '../../core/hooks/promise';

const ConfirmAndUpload: React.FC = () => {
  const token = useGoogleToken()!;
  const events = useCalendarEvents()!;
  const colors = useEventColors()!;

  const [user, done] = usePromise(() => {
    if (token) return getUserInfo(token);
    return null;
  }, [token]);

  return (
    <div className="w-full flex flex-row">
      <div>
        <div className="flex flex-col text-4xl text-primary font-semibold mb-12">
          <h2>Weiter als:</h2>
          {done ? (
            <div className="flex flex-row items-center">
              <img className="inline w-16 h-16 mr-4" src={user?.picture} alt="Profilbild" />
              <span className="text-2xl">{user?.name}</span>
            </div>
          ) : (
            '...'
          )}
        </div>
        <h2 className="text-4xl text-primary font-semibold mb-12">{events.length} Veranstaltungen</h2>
        <div className="flex flex-col text-4xl text-primary font-semibold">
          <h2>Farben:</h2>
          <div className="flex flex-col mr-auto">
            <h3 className="text-2xl flex flex-row items-center justify-between">
              Vorlesungen:{' '}
              <div
                className="inline-block w-8 h-8 rounded-full ml-4"
                style={{ backgroundColor: colors.VO.background }}
              />
            </h3>
            <h3 className="text-2xl flex flex-row items-center justify-between">
              Übungen:{' '}
              <div
                className="inline-block w-8 h-8 rounded-full ml-4"
                style={{ backgroundColor: colors.UE.background }}
              />
            </h3>
            <h3 className="text-2xl flex flex-row items-center justify-between">
              Vorlesung/Übung:{' '}
              <div
                className="inline-block w-8 h-8 rounded-full ml-4"
                style={{ backgroundColor: colors.VU.background }}
              />
            </h3>
          </div>
        </div>
      </div>
      <div className="flex-grow flex justify-end items-center">
        <input
          className="text-4xl font-semibold leading-none bg-primary text-light px-10 py-6 cursor-pointer"
          type="button"
          value="Hochladen!"
          onClick={() => {
            batchCreateEvents(
              events.map((event) => ({
                event,
                color: colors[event.lv_type],
              })),
              token
            );
          }}
        />
      </div>
    </div>
  );
};
export default ConfirmAndUpload;
