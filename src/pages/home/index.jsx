import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (

    <div className="container">

      <img src="/HomePage.jpg" alt="Home Page Background Image"/>

      <div className="buttons-container">

        <Link href="/login" className='homelogin'>LOGIN</Link>
        <Link href="/signupx" className='homesignup'>SIGN UP</Link>

      </div>

    </div>
    
  );
}
