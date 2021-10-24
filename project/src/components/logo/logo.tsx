import { Link } from 'react-router-dom';
import {AppRoute} from '../../const';

type LogoProps = {
  className?: string;
  onMain: boolean
};

function Logo({ className, onMain }: LogoProps): JSX.Element {
  const getInnerContent = () => (
    <>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </>
  );

  const getLogo = () => {
    if (onMain) {
      return (
        <span className={`logo__link ${className}`}>
          {getInnerContent()}
        </span>
      );
    }

    return (
      <Link to={AppRoute.Root} className={`logo__link ${className}`}>
        {getInnerContent()}
      </Link>
    );
  };

  return (
    <div className="logo">
      {getLogo()}
    </div>
  );
}

export default Logo;
