import React from "react"
import moment from "moment"
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useAppSelector, useAppDispatch } from "./../hooks"
import { deleteAvailability } from "../slicers/availabilitySlice"


export default function Example() {
  const dispatch = useAppDispatch();
  const availabilityBlocks = useAppSelector(state => state.availability.AvailabilityBlocks);

  interface DeleteEvent extends EventTarget {
    value: number
  }

  interface DeleteMouseEvent extends React.MouseEventHandler<HTMLButtonElement> {
    currentTarget: DeleteEvent
  }

  const deleteBlock = (index: number) => {
    (() => dispatch(deleteAvailability(index)))();
  }

  return (
    <div className="mt-10 lg:mt-0 px-10 bg-white shadow overflow-y-auto h-screen">
      <div className="sticky top-0 z-10 py-5 border-b border-b-gray-100 bg-white text-sm font-semibold leading-6 text-gray-900">
        <h1 className="text-lg font-semibold text-gray-900">Availability</h1>
      </div>
      {/* <h1 className="text-lg font-medium text-gray-900">Availability</h1> */}
      <ul role="list" className="divide-y divide-gray-100">
      {availabilityBlocks.map((timeBlock, index) => (
          <li key={`${timeBlock.date}-${index}`} className="relative flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a>
                    {/* <span className="absolute inset-x-0 -top-px bottom-0" /> */}
                    {moment(timeBlock.date).format('dddd')}
                  </a>
                </p>
                <p className="mt-1 flex text-sm leading-5 text-gray-500">
                  <a>
                    {moment(timeBlock.date).format('MMMM Do YYYY')}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">Recurring</p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500">{timeBlock.recurring}</p>
                  </div>
              </div>
              <button type="button" 
                value={index}
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                onClick={() => deleteBlock(index)}
                >
                <span className="sr-only">Remove</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
        {/* {people.map((person) => (
          <li key={person.email} className="relative flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img alt="" src={person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
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
        ))} */}
      </ul>
    </div>
  )
}

