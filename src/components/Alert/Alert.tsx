import { twMerge } from 'tailwind-merge';

type AlertType = 'info' | 'warning' | 'success' | 'error';

// ----------------------------------------------------------------

interface AlertPorps {
  message: string;
  type?: AlertType;
  className?: string;
}

// ----------------------------------------------------------------

const alertType: Record<AlertType, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

// ----------------------------------------------------------------

export const Alert = (props: AlertPorps) => {
  const { message, type, className } = props;

  return (
    <div role="alert" className={twMerge('alert text-white', className, type && alertType[type])}>
      {message}
    </div>
  );
};
