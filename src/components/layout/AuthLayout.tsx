import React from "react";

interface Props {
  children: React.ReactNode
}

const AuthLayout = ({children}: Props) => {
  return (
    <main className='w-screen h-screen pt-24'>
      {children}
    </main>
  );
};

export default AuthLayout;