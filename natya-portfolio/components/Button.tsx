import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', href, ...props }) => {
  const baseClasses = "font-bold py-3 px-6 rounded-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-light dark:focus:ring-offset-bg-dark motion-safe:hover:scale-105";

  const variantClasses = {
    primary: "bg-accent text-white hover:bg-opacity-90 focus:ring-accent",
    secondary: "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border border-text-light/10 dark:border-text-dark/10 hover:bg-text-light/5 dark:hover:bg-text-dark/5 focus:ring-accent-2"
  };

  const className = `${baseClasses} ${variantClasses[variant]} ${props.className || ''}`;

  if (href) {
    const isInternal = href.startsWith('#');
    return (
      <a
        href={href}
        className={className}
        {...(!isInternal && { target: '_blank', rel: 'noopener noreferrer' })}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;