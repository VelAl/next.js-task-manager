'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

type T_Props = React.ComponentProps<typeof NextThemesProvider>;

export const AppThemeProvider = ({ children, ...props }: T_Props) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);
