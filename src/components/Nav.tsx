import { FolderIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Presentation', href: '/', icon: FolderIcon, current: false },
  { name: 'Your dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Find jobs', href: '/services', icon: FolderIcon, current: false },
  { name: 'Post a job', href: '/services/create', icon: UsersIcon, current: false },
  { name: 'Find talents', href: '/talents', icon: FolderIcon, current: false },
];

function Nav() {
  return (
    <nav className='space-y-1 px-2'>
      {navigation.map(item => (
        <NavLink
          key={item.name}
          to={item.href}
          end
          className={({ isActive }) =>
            (isActive ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600') +
            ' group flex items-center px-2 py-2 text-base font-medium rounded-md'
          }>
          <item.icon className='mr-3 h-5 w-5 flex-shrink-0 text-indigo-300' aria-hidden='true' />
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
