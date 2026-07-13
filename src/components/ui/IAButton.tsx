import styles from './IAButton.module.css';
import SparklesIcon from './SparklesIcon';
import { SVGProps } from 'react';

const Sparkles = SparklesIcon as React.ComponentType<SVGProps<SVGSVGElement>>;

interface IAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function IAButton({ isLoading, className, ...props }: IAButtonProps) {
  return (
    <button
      className={`${styles.iaButton} ${className || ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loadingText}>...</span>
      ) : (
        <Sparkles className={styles.icon} />
      )}
    </button>
  );
}