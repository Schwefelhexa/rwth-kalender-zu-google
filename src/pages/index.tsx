import React from 'react';
import Link from 'next/link';
import { setQueryParameters } from '../core/util/route';
import { LinkButton } from '../components/Button';

const Home: React.FC = () => {
  // Generate link URL
  const client_id = '686614162232-to5sfvc1qeh3l6fj28mmnqkn3kth0q29.apps.googleusercontent.com';
  const redirect_uri = `${
    process.env.NODE_ENV === 'production' ? 'https://rwthkalender.baronalexander.com' : 'http://localhost:8080'
  }/authcallback`;
  const response_type = 'token';
  const scope = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events',
    'profile',
    'openid',
    'email',
  ].join(' ');
  const auth_url = setQueryParameters('https://accounts.google.com/o/oauth2/v2/auth', {
    client_id,
    redirect_uri,
    response_type,
    scope,
  });

  return (
    <>
      <h1 className="text-primary text-6xl font-semibold leading-none">RWTH Kalender zu Google</h1>
      <LinkButton href={auth_url}>Mit Google anmelden</LinkButton>
      <div></div>
    </>
  );
};
export default Home;
