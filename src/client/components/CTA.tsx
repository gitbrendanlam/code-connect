import { useGoogleLogin } from '@react-oauth/google';
import { GoogleAuthResponse, TokenResponse } from '../../common/Interface/auth';

import React from 'react';

const googleLogin = useGoogleLogin({
  onSuccess: async ({ code }: GoogleAuthResponse) => {
    try {
      const response = await fetch('http://localhost:3001/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for tokens');
      }

      const tokens: TokenResponse = await response.json();
      console.log(tokens);
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
    }
  },
  flow: 'auth-code',
});

const CTA: React.FC = () => {
  return (
    <div className='bg-white dark:bg-slate-800'>
      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
        <h2 className='dark:text-white text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Connect with other Developers, be well prepared for your next move.
          <br />
          Start using our app today.
        </h2>
        <div className='mt-10 flex items-center gap-x-6'>
          <a
            href='#'
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Signup
          </a>
          <a href='#' className='text-sm font-semibold leading-6 text-gray-900'>
            Login <span aria-hidden='true'>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;
