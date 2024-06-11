/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardNavbar() {

  const location = useLocation().pathname;

  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-0 px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400
                 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? ( <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link 
                    to={'/'}
                    >
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"/>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      to={''}
                      className={classNames( location === '/dashboard' ? 'bg-gray-900 text-white':
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium no-underline',
                      )}
                    >
                      Dasboard
                    </Link>
                    <Link
                      to={'assign-tasks'}
                      className={classNames(location === '/dashboard/assign-tasks' ? 'bg-gray-900 text-white':
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium no-underline'
                      )}
                    >
                      Assign tasks
                    </Link>
                    <Link
                      to={'mechanic-tasks'}
                      className={classNames(location === '/dashboard/mechanic-tasks' ? 'bg-gray-900 text-white':
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium no-underline'
                      )}
                    >
                      Mechanic Tasks
                    </Link>
                    <Link
                      to={'invoices'}
                      className={classNames(location === '/dashboard/invoices' ? 'bg-gray-900 text-white':
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium no-underline'
                      )}
                    >
                      Invoices
                    </Link>
                    <Link
                      to={'/'}
                      className={classNames(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium no-underline'
                      )}
                    >
                      Home
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg
                     ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }: { active: boolean }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                          >
                            Your Profile
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }: { active: boolean }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                          >
                            Settings
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }: { active: boolean }) => (
                          <a
                            href="/"
                            onClick={() => localStorage.clear()}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <DisclosureButton
                as={Link}
                to={''}
                className={classNames(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium no-underline'
                )}
              >
                Dasboard
              </DisclosureButton>
              <DisclosureButton
                as={Link}
                to={''}
                className={classNames(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium no-underline'
                )}
              >
                Assign tasks
              </DisclosureButton>
              <DisclosureButton
                as={Link}
                to={'/'}
                className={classNames(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium no-underline'
                )}
              >
                Home
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
