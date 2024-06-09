import { Fragment } from 'react';
import { BellIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const userName = 'John Doe'; // Example user name

  function handleLogOut() {
    setIsLoggedIn(false);
    // invalidate local storage
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">

        {/* logo */}
        <Link to={'/'}>
          <div className="flex items-center space-x-4 my-1">
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"/>
          </div>
        </Link>

        {/* search bar */}
        <div className="absolute w-64 sm:w-96 left-1/2 -translate-x-48">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring
            focus:ring-blue-200 focus:ring-opacity-50"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="size-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="inset-y-0 right-0 flex items-center pr-2 static ">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-black
                    focus:outline-none focus:grey-700 focus:ring-offset-2 "
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-md focus:outline-none
                      focus:ring-2 focus:ring-white focus:ring-offset-2 ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="user profile pic"
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
                            href="/"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                          >
                            Your Profile
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }: { active: boolean }) => (
                          <a
                            href="/"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                          >
                            Settings
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }: { active: boolean }) => (
                          <Link
                            to="/"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                            onClick={handleLogOut}
                          >
                            Sign out
                          </Link>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Link
                to={'/login'}
                className="text-gray-600 hover:text-gray-800"
              >
                Login
              </Link>
              <Link
                to={'/signup'}
                className="text-blue-600 hover:text-blue-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="bg-white border-t border-gray-200 pt-2">
        <div className="container mx-auto px-4 flex space-x-8 justify-center h-10 mt-2">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 hover:border-b-2 border-blue-700 px-2"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-gray-800 hover:border-b-2 border-blue-700 px-2"
          >
            Contact
          </Link>
          <Link
            to="/services"
            className="text-gray-600 hover:text-gray-800 hover:border-b-2 border-blue-700 px-2"
          >
            Services
          </Link>
          <Link
            to="/ticket-form"
            className="text-gray-600 hover:text-gray-800 hover:border-b-2 border-blue-700 px-2"
          >
            Ticket Form
          </Link>
          <Link
            to="/review"
            className="text-gray-600 hover:text-gray-800 hover:border-b-2 border-blue-700 px-2"
          >
            Review
          </Link>

          {/* {isLoggedIn && ()} */}
          <Link
            to="/dashboard"
            className="text-indigo-600 hover:text-gray-800 hover:border-b-2 border-blue-700 px-2"
          >
            Dashboard
          </Link>
        </div>
      </nav>

    </header>
  );
};

export default Navbar;
