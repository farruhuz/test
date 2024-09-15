import { memo, useState, useMemo, useCallback } from 'react';

import { IClassName } from '@/types/common.types';

import { Button } from '@/components/Button';
import { OrderDetailsCard } from '@/components/OrderDetailsCard';
import {
  PaymentForm,
  PaymentFormValues,
  PaymentMethodsType,
} from '@/components/OrderInfoModal/PaymentForm';

import { ReactComponent as CreditCardSVG } from '@/assets/icons/credit-card.svg';
import { ReactComponent as MoneySVG } from '@/assets/icons/money.svg';

// =================================================================

const cardList: Readonly<
  Array<{
    id: number;
    title: string;
    type: PaymentMethodsType;
    icon: JSX.Element;
  }>
> = [
  {
    id: 1,
    title: 'Наличные',
    type: 'cash',
    icon: <MoneySVG />,
  },
  {
    id: 2,
    title: 'P2P оплата',
    type: 'P2P_payment',
    icon: <MoneySVG />,
  },
  {
    id: 3,
    title: 'Банковская карта',
    type: 'bank_card',
    icon: <CreditCardSVG />,
  },
  {
    id: 4,
    title: 'Через приложения',
    type: 'apps',
    icon: <MoneySVG />,
  },
] as const;

// =================================================================

export const PaymentType = memo((props: IClassName) => {
  const { className } = props;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodsType>('cash');

  const handleSubmit = useCallback(
    (params: PaymentFormValues) => {
      console.log(params, paymentMethod);
    },
    [paymentMethod],
  );

  const views: Record<PaymentMethodsType, JSX.Element> = useMemo(() => {
    return {
      cash: <PaymentForm key="cash" paymentMethod="cash" handleSubmit={handleSubmit} />,
      P2P_payment: (
        <PaymentForm
          key="P2P_payment"
          paymentMethod="P2P_payment"
          handleSubmit={handleSubmit}
          hasReminder={false}
        />
      ),
      bank_card: (
        <PaymentForm key="bank_card" paymentMethod="bank_card" handleSubmit={handleSubmit} />
      ),
      apps: <PaymentForm key="apps" paymentMethod="apps" handleSubmit={handleSubmit} />,
    };
  }, [handleSubmit]);

  return (
    <div className={className}>
      <OrderDetailsCard.Title className="mb-4">Выберите тип оплаты</OrderDetailsCard.Title>
      <div className="mb-8 grid h-[136px] grid-cols-4 grid-rows-1 gap-4">
        {cardList.map(card => (
          <Button
            key={card.id}
            variant={card.type === paymentMethod ? 'primary' : 'neutral'}
            onClick={() => setPaymentMethod(card.type)}
            className="flex h-full w-full flex-col items-start justify-between p-4"
          >
            <span className="text-left text-lg font-medium leading-6">{card.title}</span>
            {card.icon}
          </Button>
        ))}
      </div>
      {views[paymentMethod]}
    </div>
  );
});

// =================================================================

if (process.env.NODE_ENV !== 'production') {
  PaymentType.displayName = 'PaymentType';
}
