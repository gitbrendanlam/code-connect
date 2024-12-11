import React from "react"
import moment from "moment"
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useAppSelector, useAppDispatch } from "./../hooks"
import { deleteAvailability } from "../slicers/availabilitySlice"

export default function AvailabilityList(setSelectBlockIndex: any) {
  const dispatch = useAppDispatch();
  const availabilityBlocks = useAppSelector(state => state.availability.AvailabilityBlocks);

  const deleteBlock = (index: number) => {
    (() => dispatch(deleteAvailability(index)))();
  }

  const selectBlock = (index: number) => {
    setSelectBlockIndex(index);
  }

  return (
    <div className="mt-10 lg:mt-0 px-10 bg-white shadow overflow-y-auto h-screen">
      <div className="sticky top-0 z-10 py-5 border-b border-b-gray-100 bg-white text-sm font-semibold leading-6 text-gray-900">
        <h1 className="text-lg font-semibold text-gray-900">Availability</h1>
      </div>
      {/* <h1 className="text-lg font-medium text-gray-900">Availability</h1> */}
      <ul role="list" className="divide-y divide-gray-100">
      {availabilityBlocks.length > 0 ? (availabilityBlocks.map((timeBlock, index) => (
          <li 
            key={`${timeBlock.date}-${index}`} 
            className="relative flex justify-between gap-x-6 py-5"
            // onClick={() => selectBlock(index)}
            >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a>
                    {/* <span className="absolute inset-x-0 -top-px bottom-0" /> */}
                    {moment(timeBlock.date).format('dddd')} {timeBlock.start_time}
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
                    <p className="text-sm leading-5 text-gray-500">{timeBlock.recurring}</p>
                  </div>
              </div>
              <button type="button" 
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                onClick={() => deleteBlock(index)}
                >
                <span className="sr-only">Remove</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))) : 
        <div className="py-6">
          <p className="text-sm font-solid leading-6 text-gray-400">
            <a>
              No availability added
            </a>
          </p>
        </div>}
      </ul>
    </div>
  )
}
