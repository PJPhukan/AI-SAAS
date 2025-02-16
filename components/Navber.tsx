'use client'
import MobileSidebar from "@/components/Mobile-sidebar";

import { UserButton } from "@clerk/nextjs";

const Navber = () => {
  return (
    <div className="flex items-center p-4">
        
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
};

export default Navber;
