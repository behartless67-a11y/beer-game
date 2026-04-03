import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className, onClick, hoverable = false }: CardProps) {
  return (
    <div
      className={clsx(
        'aged-paper rounded-lg p-4 shadow-md border-2 border-darker-brass',
        {
          'cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200': hoverable || onClick,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
