import React from 'react';
import Link from 'next/link';
import { setQueryParameters } from '../core/util/route';

const Home: React.FC = () => {
  // Generate link URL
  const client_id = '686614162232-to5sfvc1qeh3l6fj28mmnqkn3kth0q29.apps.googleusercontent.com';
  const redirect_uri = `${
    process.env.NODE_ENV === 'production' ? 'https://rwth-kalender-zu-google.vercel.app' : 'http://localhost:8080'
  }/authcallback`;
  const response_type = 'token';
  const scope = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events',
  ].join(' ');
  const auth_url = setQueryParameters('https://accounts.google.com/o/oauth2/v2/auth', {
    client_id,
    redirect_uri,
    response_type,
    scope,
  });

  return <Link href={auth_url}>Google login</Link>;
};
export default Home;
