import { memo, Fragment } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';

import { IClassName } from '@/types/common.types';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Inputs/TextInput';

import { ReactComponent as CreditCardSVG } from '@/assets/icons/credit-card.svg';

// =================================================================

export type PaymentMethodsType = 'cash' | 'P2P_payment' | 'bank_card' | 'apps';

type PaymentApp = 'payme' | 'click' | 'uzum';

export type PaymentFormValues = {
  summ: string;
  reminder?: string;
  app?: PaymentApp;
};

interface PaymentFormProps extends IClassName {
  handleSubmit?: (params: PaymentFormValues) => void;
  hasReminder?: boolean;
  paymentMethod: PaymentMethodsType;
}

// =================================================================

const clickAppList: Array<{
  title: string;
  app: PaymentApp;
}> = [
  { title: 'Payme', app: 'payme' },
  { title: 'Uzum', app: 'uzum' },
  { title: 'Clickup', app: 'click' },
];

// =================================================================

export const PaymentForm = memo((props: PaymentFormProps) => {
  const { handleSubmit, className, paymentMethod, hasReminder = true } = props;

  const {
    control,
    handleSubmit: formSubmit,
    setValue,
    watch,
  } = useForm<PaymentFormValues>({
    defaultValues: {
      summ: '',
      reminder: '',
    },
  });

  const onSubmit: SubmitHandler<PaymentFormValues> = data => {
    const { reminder, summ, app } = data;
    handleSubmit?.({ summ, reminder, app });
  };

  return (
    <form onSubmit={formSubmit(onSubmit)} className={twMerge('w-full', className)}>
      {paymentMethod === 'apps' && (
        <Fragment>
          <p className="mb-2 text-lg leading-6">Выберите приложения</p>
          <div className="mb-8 grid h-28 grid-cols-3 items-center gap-4">
            {clickAppList.map(item => (
              <Button
                key={item.app}
                variant={watch('app') === item.app ? 'primary' : 'neutral'}
                onClick={() => setValue('app', item.app)}
                className="flex h-full w-full flex-col items-start justify-between p-4"
              >
                <span className="text-left text-lg font-medium leading-6">{item.title}</span>
                <CreditCardSVG />
              </Button>
            ))}
          </div>
        </Fragment>
      )}
      <div className="flex items-center gap-4">
        <Controller
          name="summ"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <TextInput
                label="Полученная сумма (сум)"
                placeholder="Введите сумму"
                wrapperClassName="flex-1"
                labelClassName="text-black"
                {...field}
              />
            );
          }}
        />
        {hasReminder && (
          <Controller
            name="reminder"
            control={control}
            rules={{ required: hasReminder }}
            render={({ field }) => {
              return (
                <TextInput
                  label="Сдача"
                  placeholder="0 сум"
                  wrapperClassName="flex-1"
                  labelClassName="text-black"
                  {...field}
                />
              );
            }}
          />
        )}
      </div>
      <div className="mt-8 flex justify-end">
        <Button type="submit" variant="primary" className="px-10">
          Распечатать чек
        </Button>
      </div>
    </form>
  );
});

// =================================================================

if (process.env.NODE_ENV !== 'production') {
  PaymentForm.displayName = 'PaymentForm';
}
