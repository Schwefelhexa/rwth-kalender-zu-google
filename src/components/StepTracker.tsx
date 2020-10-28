import { spawn } from 'child_process';
import React from 'react';

interface Props {
  value: number;
  steps: number;

  onSet?: (value: number) => void;
}
const StepTracker: React.FC<Props> = ({ value, steps, onSet }) => (
  <div className="w-full flex flex-row justify-between">
    {[...new Array(steps)].map((_, index) => (
      <React.Fragment key={index}>
        <span
          className={`w-24 h-24 rounded-full text-3xl font-semibold leading-none flex justify-center items-center ${
            index === value ? 'bg-primary text-light' : 'border-primary border-solid border-4 text-primary'
          }`}
        >
          {index + 1}
        </span>
        {index + 1 < steps && <div className="flex-grow h-1 my-auto mx-3 bg-primary" />}
      </React.Fragment>
    ))}
  </div>
);
export default StepTracker;
