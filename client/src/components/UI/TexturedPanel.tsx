import { ReactNode } from 'react';
import clsx from 'clsx';

interface TexturedPanelProps {
  children: ReactNode;
  className?: string;
  variant?: 'brass' | 'paper' | 'dark';
}

export function TexturedPanel({ children, className, variant = 'brass' }: TexturedPanelProps) {
  return (
    <div
      className={clsx(
        'rounded-lg p-6 shadow-lg',
        {
          'brass-panel text-aged-paper': variant === 'brass',
          'aged-paper': variant === 'paper',
          'bg-dark-leather text-aged-paper border-2 border-darker-brass': variant === 'dark',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
