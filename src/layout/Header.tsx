import { forwardRef } from 'react';
import { useAuthMethods, useAuthState } from '../contexts/AuthContext/AuthContext';
import { Button } from '../components/Button/Button';

export const Header = forwardRef<HTMLHeadElement, React.ComponentProps<'header'>>((props, ref) => {
  const { userCredentials } = useAuthState();
  const { logout } = useAuthMethods();

  return (
    <header
      ref={ref}
      {...props}
      className="fixed left-0 top-0 z-10 flex h-24 w-full items-center justify-between border-b-2 border-gray bg-white py-6 pl-[384px] pr-6"
    >
      <div>search</div>
      <div className="flex items-center gap-2">
        <div>Russian</div>
        <div className="dropdown dropdown-end border-none">
          <Button variant="ghost" className="rounded-full">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-primary">
              <img src={userCredentials.photo} alt={userCredentials.name} />
            </span>
            <div className="flex flex-col text-left">
              <p className="text-lg leading-6">{userCredentials.name}</p>
              <span className="text-black-200 text-sm font-normal">{userCredentials.role}</span>
            </div>
          </Button>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-md z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 text-black shadow"
          >
            <li>
              <button onClick={logout} className="font-medium">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
});

