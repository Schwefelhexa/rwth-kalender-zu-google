import { spawn } from 'child_process';
import Link from 'next/link';
import React, { useState } from 'react';
import Spinner from './Spinner';

// No spaces so tailwind intellisense and purge trigger
// prettier-ignore
const className='text-4xl font-semibold leading-none text-light px-10 py-6 cursor-pointer';

interface BaseProps {
  children: string;
  danger?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
}
export const LinkButton: React.FC<LinkProps> = ({ children, href, danger = false }) => (
  <Link href={href}>
    <span className={`${className} ${danger ? 'bg-danger' : 'bg-primary'}`}>{children}</span>
  </Link>
);

interface ButtonProps extends BaseProps {
  loading?: boolean;
  onClick: () => void | Promise<any>;
}
const Button: React.FC<ButtonProps> = ({ children, onClick, danger = false }) => {
  const [loading, setLoading] = useState(false);

  const isPromise = (res: void | Promise<any>): res is Promise<any> => (res as Promise<any>)?.then !== undefined;

  return (
    <button
      className={`${className} ${danger ? 'bg-danger' : 'bg-primary'}`}
      onClick={() => {
        const res = onClick();
        if (isPromise(res)) {
          setLoading(true);
          res.then(() => setLoading(false));
        }
      }}
    >
      <div className="flex flex-row items-center">
        <span>{children}</span>
        <div className={`transition-all ease-in-out duration-150 h-12 ${loading ? 'ml-4 w-12' : 'w-0'}`}>
          {loading && <Spinner />}
        </div>
      </div>
    </button>
  );
};
export default Button;
