import styles from './loading-screen.module.scss';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.wrap}>
      <svg
        className={styles.loader}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width="40"
        height="40"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        >
        </circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        >
        </path>
      </svg>
    </div>
  );
}

export default LoadingScreen;
