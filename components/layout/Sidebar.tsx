import React from 'react'
import {BsBellFill, BsHouseFill} from 'react-icons/bs';
import {FaUser} from 'react-icons/fa';

import {BiLogOut} from 'react-icons/bi';


import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut, useSession } from 'next-auth/react';


const Sidebar = () => {

  const {data: currentUser} = useCurrentUser();
  const mysession = useSession();
  console.log(mysession?.data?.user);
  console.log(currentUser);


  const navItems = [
    {
      id: 1,
      label : "Home",
      href: '/',
      icon: BsHouseFill
    },
    {
      id: 2,
      label : "Notifications",
      href: '/notifications',
      icon: BsBellFill,
      auth: true
      
    },
    {
      id: 3,
      label : "Profile",
      href: `/user/${currentUser?.id}`,
      icon: FaUser,
      auth: true
    },
  ]


  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {navItems.map(item => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          {
            currentUser && (
              <SidebarItem onClick={signOut} icon={BiLogOut} label={"Logout"} />
            )
          }
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar