import { memo } from 'react';
import {
  PostsPageLinks,
  ProductsPageLinks,
  TodosPageLinks,
  UsersPageLinks
} from '../contexts/RouterContext/router.links';

import { Logo } from '../components/Logo/Logo';
import { NavLink } from 'react-router-dom';

import CashSVG from '../assets/icons/cash.svg';
import ClocheSVG from '../assets/icons/cloche.svg';
import CoinsSVG from '../assets/icons/coins.svg';
import TableSVG from '../assets/icons/table.svg';


// =================================================================

const menuConfig = [
  {
    title: 'Posts',
    icon: ClocheSVG,
    href: PostsPageLinks.main,
  },
  {
    title: 'Todos',
    icon: CoinsSVG,
    href: TodosPageLinks.main,
  },
  {
    title: 'Products',
    icon: CashSVG,
    href: ProductsPageLinks.main,
  },
  {
    title: 'Users',
    icon: TableSVG,
    href: UsersPageLinks.main,
  }
];

// =================================================================

export const Sidebar = memo(() => {
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[360px] border-r-2 border-gray bg-white">
      <div className="p-6">
        <Logo width={152} height={42} />
      </div>
      <ul>
        {menuConfig.map(menu => (
          <li key={menu.href}>
            <NavLink
              to={menu.href}
              className={({ isActive }) =>
                `flex items-center gap-2 px-6 py-4 ${isActive ? 'bg-red-500 text-white' : 'text-black-100'
                }`
              }>
              <img src={`${menu.icon}`} alt="menu.icon" />{ }
              <span className="text-lg">{menu.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
});

