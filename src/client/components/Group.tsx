import { ChevronRightIcon } from '@heroicons/react/20/solid'
import React from 'react';
import Naj from '../assets/Naj.png';
import Brendan from '../assets/Brendan.png';
import Jay from '../assets/Jay.png';
import Dylan from '../assets/Dylan.png';

interface Person {
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
  src?: string;
  href: string;
  lastSeen: string | null; // lastSeen can be either a string or null
  lastSeenDateTime?: string; // Optional, since not all persons might have this
}

const people: Person[] = [
  {
    name: 'Brendan Lam',
    email: 'lbrendan440@gmail.com',
    role: 'System Design Guru',
    src: Brendan,
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Najm Safar',
    email: 'najmsafarjalani@gmail.com',
    role: 'Cyber Security Expert and Pen Tester',
    src: Naj,
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dylan Carothers',
    email: 'dcarothers16@gmail.com',
    role: 'SQL Master',
    src: Dylan,
    href: '#',
    lastSeen: null,
  },
  {
    name: 'Jay Hoogheem',
    email: 'jayh1186@gmail.com',
    role: 'Google Calendar API Pro',
    src: Jay,
    href: '#',
    lastSeen: null,
  },
];

const Group: React.FC = () => {
  return (
    
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      <h1 className='dark:text-white text-3xl font-bold tracking-right text-gray-900 sm:text-4xl p-2'>Group Members</h1>
      {people.map((person) => (
        <li key={person.email} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            <img alt="" src={person.src ? person.src : person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <a href={person.href}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {person.name}
                </a>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                  {person.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Group;
