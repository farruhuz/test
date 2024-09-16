import { twMerge } from 'tailwind-merge';
import { IClassName } from '../../types/common.types';
import LogoSVG from '../../assets/icons/logo.svg';

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
      <img src={LogoSVG} alt="LogoSVG" style={{ height: height, width: width }} />
    </div>
  );
};
