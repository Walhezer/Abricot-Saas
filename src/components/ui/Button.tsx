import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

/**
 * Button component using CSS Modules for styling.
 */
const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const variantClass = variant === 'outline' ? styles.outline : styles.button;
  
  return (
    <button 
      className={`${variantClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
