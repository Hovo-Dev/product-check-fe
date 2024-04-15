import React from "react";

interface Props {
  children: React.ReactNode
}

const UserLayout = ({children}: Props) => {
  return (
    <main className='w-screen h-screen pt-14 px-52 flex flex-col space-y-14 items-center'>
      {children}
    </main>
  );
};

export default UserLayout;