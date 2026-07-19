import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

/**
 * A reusable, accessible button component.
 * Supports 'primary' and 'outline' visual variants via CSS Modules.
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