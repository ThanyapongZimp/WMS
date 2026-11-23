export declare const DEFAULT_PRIMARY: string;
export interface TenantPrimaryFamily {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  ring: string;
  accent: string;
  accentForeground: string;
  adjusted: boolean;
}
export declare function deriveTenantPrimary(input: string | null | undefined): TenantPrimaryFamily;
export declare function applyTenantPrimary(el: HTMLElement, input: string): boolean;
