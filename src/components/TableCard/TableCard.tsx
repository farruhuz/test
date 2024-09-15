import { Fragment, memo } from 'react';

import { twMerge } from 'tailwind-merge';

import { ReactComponent as UsersSVG } from '../../assets/icons/users.svg';

// =================================================================

const badgeClassName = (isActive: boolean) =>
  twMerge('absolute h-2 w-1/2 min-w-28 rounded-2xl bg-gray-300', isActive && 'bg-red-100');

// =================================================================

interface TableCardProps {
  isActive: boolean;
  className?: string;
  personCount?: number;
}

// =================================================================

export const TableCard = memo((props: TableCardProps) => {
  const { isActive, className, personCount } = props;

  return (
    <div
      className={twMerge(
        'relative flex h-52 w-full min-w-52 items-center justify-center p-4',
        className,
      )}
    >
      <span className={twMerge(badgeClassName(isActive), 'left-1/2 top-0 -translate-x-1/2')} />
      <span className={twMerge(badgeClassName(isActive), 'bottom-0 left-1/2 -translate-x-1/2')} />
      <span
        className={twMerge(
          badgeClassName(isActive),
          'left-0 top-1/2 min-h-28 w-2 min-w-2 -translate-y-1/2',
        )}
      />
      <span
        className={twMerge(
          badgeClassName(isActive),
          'right-0 top-1/2 h-1/2 min-h-28 w-2 min-w-2 -translate-y-1/2',
        )}
      />
      <div
        className={twMerge(
          'flex h-full w-full flex-col justify-between rounded-2xl bg-gray-300 p-4 text-black',
          isActive && 'bg-primary text-white',
        )}
      >
        <p className="text-right text-4xl font-semibold">2B</p>
        <div className="flex items-center gap-2 text-left text-lg font-medium">
          {personCount && isActive ? (
            <Fragment>
              <UsersSVG width={24} height={24} />
              <span>{personCount} человек</span>
            </Fragment>
          ) : (
            <span>Свободень</span>
          )}
        </div>
      </div>
    </div>
  );
});

