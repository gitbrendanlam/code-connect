import React from 'react';

const groups = [
  {
    name: 'PTRI12',
    email: 'leslie.alexander@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '/groupdetail',
  },
  {
    name: 'PTRI13',
    email: 'michael.foster@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '/groupdetail',
  },
  {
    name: 'PTRI14',
    email: 'michael.foster@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '/groupdetail',
  },
];
const ListNotification: React.FC = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <p className='text-lg p-2 font-bold'>My Groups</p>
        <a
          href='#'
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Create Group
        </a>
      </div>
      <ul role='list' className='divide-y divide-gray-100 px-8'>
        {groups.map((group) => (
          <li
            key={group.email}
            className='flex items-center justify-between gap-x-6 py-2'
          >
            <div className='flex min-w-0 gap-x-4'>
              <img
                alt=''
                src={group.imageUrl}
                className='h-12 w-12 flex-none rounded-full bg-gray-50'
              />
              <div className='min-w-0 flex-auto'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {group.name}
                </p>
                <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                  {group.email}
                </p>
              </div>
            </div>
            <a
              href={group.href}
              className='rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            >
              View
            </a>
          </li>
        ))}
      </ul>
      <a
        href='#'
        className='flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0'
      >
        View all
      </a>
    </div>
  );
};

export default ListNotification;
