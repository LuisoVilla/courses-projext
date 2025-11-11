import React from 'react';

export const mockedNavigate = jest.fn();

export const useNavigate = () => mockedNavigate;

export const BrowserRouter = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const Routes = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const Route = ({ element }: { element?: React.ReactNode }) => (
  <div>{element}</div>
);

export const Navigate = ({ to }: { to: string }) => {
  React.useEffect(() => {
    mockedNavigate(to);
  }, [to]);
  return null;
};
