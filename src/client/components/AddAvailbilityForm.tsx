import React, { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import moment = require('moment');
import { useAppDispatch } from '../hooks'
import { addAvailability } from '../slicers/availabilitySlice'

export default function AddAvailabilityForm({ open, setOpen } : { open: boolean, setOpen: any }) {
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>(moment().format('h:mm a').split(':')[0].concat(':00 PM'));
  const [recurring, setRecurring] = useState<string>('none');

  const times = ['12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM']

  const save = () => {
    // Validate input formats
    console.log(date, time, recurring);
    if (moment(date).format('MM-DD-YYYY') !== date) {
      alert('Date should be in MM-DD-YYYY format!');
    } else {
      (() => dispatch(addAvailability({
        week_of: moment(date).add(0 - moment(date).day(), 'days').format('MM-DD-YYYY'),
        date: date,
        week_day: moment(date).day() + 1,
        start_time: time,
        recurring,
      })))();

      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                <div className="h-0 flex-1 overflow-y-auto">
                  <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold leading-6 text-white">Add Availility</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-indigo-300">
                        Fill in the below information to add availability to your personal calendar.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="space-y-6 pb-5 pt-6">
                        <div>
                          <label htmlFor="availability-date" className="block text-sm font-medium leading-6 text-gray-900">
                            Date
                          </label>
                          <div className="mt-2">
                            <input
                              id="project-name"
                              name="project-name"
                              type="text"
                              placeholder='MM-DD-YYYY'
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={e => setDate(e.target.value)}
                            />
                          </div>
                        </div>
                        <Listbox value={time} onChange={setTime}>
                          <Label className="block text-sm font-medium leading-6 text-gray-900">Start Time</Label>
                          <div className="mt-2">
                            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <span className="block truncate">{time}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                              </span>
                            </ListboxButton>
                            <ListboxOptions
                              transition
                              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                            >
                              {times.map((time) => (
                                <ListboxOption
                                  key={time}
                                  value={time}
                                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                >
                                  <span className="block truncate font-normal group-data-[selected]:font-semibold">{time}</span>

                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                  </span>
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">Recurring</legend>
                          <p className="mt-1 text-sm leading-6 text-gray-600">How often will this availability repeat?</p>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center">
                              <input
                                defaultChecked={true}
                                id='recurring-none'
                                name="recurring"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onChange={e => {
                                  if(e.target.checked === true || e.target.defaultChecked === true) setRecurring('none')}}
                              />
                              <label htmlFor='recurring-none' className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                None
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id='recurring-weekly'
                                name="recurring"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onChange={e => {if(e.target.checked === true) setRecurring('weekly')}}
                              />
                              <label htmlFor='recurring-weekly' className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                Weekly
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id='recurring-monthly'
                                name="recurring"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onChange={e => {if(e.target.checked === true) setRecurring('monthly')}}
                              />
                              <label htmlFor='recurring-monthly' className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                Monthly
                              </label>
                            </div>
                          </div>
                        </fieldset>
                        {/* <div>
                          <label htmlFor="project-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Recurring
                          </label>
                          <div className="relative flex items-start">
                            <div className="absolute flex h-6 items-center">
                              <input
                                id="recurring-none"
                                name="none"
                                type="radio"
                                aria-describedby="recurring-none-for-single-time-block"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onClick={e => setRecurring('none')}
                              />
                            </div>
                            <div className="pl-7 text-sm leading-6">
                              <label htmlFor="recurring-none" className="font-medium text-gray-900">
                                None
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="absolute flex h-6 items-center">
                              <input
                                id="recurring-weekly"
                                name="weekly"
                                type="radio"
                                aria-describedby="recurring-weekly-to-repeat-avalabilty-weekly"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onClick={e => setRecurring('weekly')}
                              />
                            </div>
                            <div className="pl-7 text-sm leading-6">
                              <label htmlFor="recurring-weekly" className="font-medium text-gray-900">
                                Weekly
                              </label>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="absolute flex h-6 items-center">
                              <input
                                id="recurring-monthly"
                                name="monthly"
                                type="radio"
                                aria-describedby="recurring-monthly-to-repeat-avalabilty-monthly"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onClick={e => setRecurring('monthly')}
                              />
                            </div>
                            <div className="pl-7 text-sm leading-6">
                              <label htmlFor="privacy-private" className="font-medium text-gray-900">
                                Monthly
                              </label>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-shrink-0 justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={save}
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
