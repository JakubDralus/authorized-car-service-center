import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';
import { SiOnlyfans } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className='max-w-7xl mx-auto py-10 px-2 pt-24 overflow-hidden sm:px-6 lg:px-20'>

      <div className="px-10">
        <nav className="-my-2 flex justify-evenly">
          <div className="px-5 py-2 flex flex-col">
            <h2 className="text-white">Solutions</h2>
            <ul className="mt-4 space-y-4 ">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Marketing</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Analytics</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Commerce</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Insights</a>
              </li>
            </ul>
          </div>
          <div className="px-5 py-2 flex flex-col">
            <h2 className="text-white">Support</h2>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Pricing</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Documentation</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Guides</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">API Status</a>
              </li>
            </ul>
          </div>
          <div className="px-5 py-2 flex flex-col">
            <h2 className="text-white">Company</h2>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">About</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Jobs</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Press</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Partners</a>
              </li>
            </ul>
          </div>
          <div className="px-5 py-2 flex flex-col">
            <h2 className="text-white">Legal</h2>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Claim</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Privacy</a>
              </li>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Terms</a>
              </li>
            </ul>
          </div>
        </nav>
        </div>
        <hr className='mt-10 mb-8 border-0 h-px bg-gray-700' />

        <div className='flex justify-between'>
          <p className="text-center text-gray-400 flex text-sm">&copy; 2020 Your Company, Inc. All rights reserved.</p>

          <div className="flex justify-center space-x-6 mb-8 h-fit">
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <SiOnlyfans size={20} />
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <FaFacebook size={20} />
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <FaInstagram size={20} />
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <FaTwitter size={20} />
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <FaGithub size={20} />
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
