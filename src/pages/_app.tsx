import React from 'react';
import { AppProps } from 'next/app';

import '../styles/tailwind.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <div className="w-8/12 h-screen mx-auto bg-light flex flex-col justify-between items-center py-16">
    <Component {...pageProps} />
  </div>
);

export default MyApp;
