import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'brass-panel vintage-text font-semibold transition-all duration-200',
        'hover:brightness-110 active:brightness-90',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'px-4 py-2 text-sm': size === 'small',
          'px-6 py-3 text-base': size === 'medium',
          'px-8 py-4 text-lg': size === 'large',
          'bg-gradient-to-br from-dark-brass to-darker-brass text-aged-paper': variant === 'primary',
          'bg-gradient-to-br from-oxidized-copper to-dark-brass text-aged-paper': variant === 'secondary',
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
