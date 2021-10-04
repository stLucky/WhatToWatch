type LogoProps = {
  className?: string;
  path?: string;
};

function Logo({ className, path }: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <a href={path} className={`logo__link ${className}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
  );
}

export default Logo;
