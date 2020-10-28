import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useUrlFragment } from '../core/hooks/route';
import UploadCalender from '../components/steps/UploadCalendar';
import SetColors from '../components/steps/SetColors';
import StepTracker from '../components/StepTracker';

interface Step {
  title: string;
  Component: React.ComponentType<{ onComplete: () => void }>;
}
const steps: Step[] = [
  {
    title: 'Kalender hochladen',
    Component: UploadCalender,
  },
  {
    title: 'Farben einstellen',
    Component: SetColors,
  },
  {
    title: '',
    Component: () => null,
  },
];

const Home: React.FC = () => {
  const router = useRouter();
  const [fragment, loaded] = useUrlFragment() as [
    {
      access_token: string;
      token_type: string;
      expires_in: string;
      scope: string;
    },
    boolean
  ];
  useEffect(() => {
    if (loaded && !fragment.access_token) router.replace('/');
  }, [router, fragment, loaded]);

  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  return (
    <>
      <div className="text-center w-full">
        <h1 className="text-primary text-6xl font-semibold leading-none mb-8">{currentStep.title}</h1>
        <StepTracker value={step} steps={3} />
      </div>
      <div className="w-full">
        <currentStep.Component onComplete={() => setStep((step) => step + 1)} />
      </div>
      <div></div>
    </>
  );
};
export default Home;
