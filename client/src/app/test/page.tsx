"use client"

import { FC } from 'react';

interface pageProps {

};

const page: FC<pageProps> = ({ }) => {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('e:', e);
    e.target.reset()
  }


  console.log('clicked outside:')

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="" id="" />
        <button type='submit'>
          submit
        </button>
      </form>
    </div>
  );
};

export default page;