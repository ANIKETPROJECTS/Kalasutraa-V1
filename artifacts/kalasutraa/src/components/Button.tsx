import { Link } from 'wouter';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  href,
  onClick,
  disabled,
  type = 'button',
  ...props 
}: { 
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'luxury';
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}) {
  const baseClasses = "inline-flex items-center justify-center tracking-widest uppercase text-xs font-semibold rounded transition-all duration-500 px-8 py-4 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-[#9c5517] hover:shadow-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-[#d6cdba] hover:shadow-md",
    outline: "border border-accent text-foreground hover:bg-accent hover:text-white",
    ghost: "bg-transparent text-foreground hover:text-primary",
    luxury: "bg-espresso text-white hover:bg-black hover:shadow-lg border border-transparent hover:border-accent",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}
