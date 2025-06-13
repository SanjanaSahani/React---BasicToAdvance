import { useState } from 'react'
import './App.css'
import { links, social } from './data';
import { TiThMenu } from "react-icons/ti";

function App() {


  return (
    <>
      <div className='lg:flex md:flex lg:gap-[10%] bg-white lg:w-full md:w-fit'>
        <span className='flex text-4xl p-6 lg:text-3xl font-bold font-serif lg:pl-28 lg:pr-10 lg:py-2'>Coding <span className='text-blue-400'>Addict</span><span className='lg:hidden md:hidden'><TiThMenu /></span></span>
        
        <span className='lg:flex md:flex md:gap-8 md:px-10 md:py-4 lg:gap-9 font-serif lg:px-10 lg:py-4 text-md text-gray-400' >
          {links.map((link) => (
            <a className='gap-4 uppercase  hover:text-gray-500' key={link.id} href={link.url}>{link.text}</a>
          ))}
        </span>

        <span className='invisible lg:flex lg:gap-6 lg:text-blue-400 lg:px-10 lg:py-4 lg:visible md:visible' >
          {social.map(({ id, url, icon: Icon }) => (
            <a className=' hover:text-blue-500' key={id} href={url}>
              <Icon />
            </a>
          ))}
        </span>
      </div>
    </>
  )
}

export default App
