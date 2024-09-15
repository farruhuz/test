import { ReactNode, memo } from 'react';

import { twMerge } from 'tailwind-merge';

import { ReactComponent as DocumentSVG } from '@/assets/icons/document.svg';

// =================================================================

interface DetailsCardProps {
  children: ReactNode;
  className?: string;
}

// =================================================================

const DetailsTitle = memo((props: DetailsCardProps) => {
  const { children, className } = props;

  return <h3 className={twMerge('text-2xl font-semibold', className)}>{children}</h3>;
});

// =================================================================

const DetailsDesc = memo((props: DetailsCardProps) => {
  const { children, className } = props;

  return <p className={twMerge('relative text-lg font-normal leading-6', className)}>{children}</p>;
});

// =================================================================

interface TableInfoProps {
  title: string;
  time: string;
  desc: string;
  isLast?: boolean;
}

const TableInfo = memo((props: TableInfoProps) => {
  const { desc, time, title, isLast = false } = props;

  return (
    <div
      className={twMerge(
        'relative grid grid-cols-[40px_auto] gap-2 pb-6',
        !isLast &&
          "before:absolute before:left-5 before:top-0 before:-z-10 before:h-full before:w-0.5 before:bg-gray before:content-['']",
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
        <DocumentSVG />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <OrderDetailsCard.Title>{title}</OrderDetailsCard.Title>
          <OrderDetailsCard.Desc>{time}</OrderDetailsCard.Desc>
        </div>
        <OrderDetailsCard.Desc>{desc}</OrderDetailsCard.Desc>
      </div>
    </div>
  );
});

// =================================================================

interface OrderPriceProps {
  leftText: string;
  rightText: string;
  className?: string;
}

const OrderPrice = memo((props: OrderPriceProps) => {
  const { leftText, rightText, className } = props;

  return (
    <div
      className={twMerge(
        'flex items-end justify-between border-b border-dashed border-gray',
        className,
      )}
    >
      <DetailsDesc className="after:absolute after:-bottom-1 after:left-0 after:z-10 after:h-1 after:w-full after:bg-white after:content-['']">
        {leftText}
      </DetailsDesc>
      <DetailsDesc className="after:absolute after:-bottom-1 after:left-0 after:z-10 after:h-1 after:w-full after:bg-white after:content-['']">
        {rightText}
      </DetailsDesc>
    </div>
  );
});

// =================================================================

export const OrderDetailsCard = (props: DetailsCardProps) => {
  const { children, className } = props;

  return <div className={twMerge('rounded-2xl border border-gray p-8', className)}>{children}</div>;
};

OrderDetailsCard.Title = DetailsTitle;
OrderDetailsCard.Desc = DetailsDesc;
OrderDetailsCard.Price = OrderPrice;
OrderDetailsCard.TableInfo = TableInfo;

// =================================================================

if (process.env.NODE_ENV !== 'production') {
  DetailsTitle.displayName = 'DetailsTitle';
  DetailsDesc.displayName = 'DetailsDesc';
  OrderPrice.displayName = 'OrderPrice';
  TableInfo.displayName = 'TableInfo';
}
