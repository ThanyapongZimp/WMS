import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import './ScannerButton.css';

export type ScannerButtonProps = {
  /** Intent: primary = the one main action, danger = destructive or exception. */
  variant?: 'primary' | 'secondary' | 'danger';
  /** `scanner` = 64px primary PDA action, `lg` = 56px PDA control. */
  size?: 'lg' | 'scanner';
  /** In-flight action. Keeps full strength and announces busy. */
  isLoading?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

export const ScannerButton = forwardRef<HTMLButtonElement, ScannerButtonProps>(function ScannerButton(
  { variant = 'primary', size = 'scanner', isLoading = false, isDisabled = false, children, type = 'button', onClick, ...rest },
  ref,
) {
  // While loading, swallow the click so a submit button cannot post the form twice.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      ref={ref}
      type={type}
      className="wms-scanner-button"
      data-variant={variant}
      data-size={size}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {isLoading && (
        <svg className="wms-scanner-button__spinner" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      <span className="wms-scanner-button__label" data-part="label">{children}</span>
    </button>
  );
});
