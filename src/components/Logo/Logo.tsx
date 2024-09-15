import { twMerge } from 'tailwind-merge';
import LogoSVG from '../../assets/icons/logo.svg';
import { IClassName } from '../../types/common.types';

// =================================================================

interface LogoProps extends IClassName {
  height?: number;
  width?: number;
}

// =================================================================

export const Logo = (props: LogoProps) => {
  const { className, height = 64, width = 214 } = props;

  return (
    <div className={twMerge('inline-block', className)}>
      <img src={LogoSVG} alt="" />
    </div>
  );
};
