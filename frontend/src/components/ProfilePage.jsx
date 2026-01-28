// import React from "react"
// import UserProfile from "../components/User/UserProfileEdit"
// import TwoFASettings from "./Settings/twoFASettings"

// export default function ProfilePage() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center ">
//         Your Profile
//       </h1>
//       <UserProfile />
//       <TwoFASettings />
//     </div>
//   )
// }

import React from "react"
import UserProfile from "../components/User/UserProfileEdit"
import TwoFASettings from "./Settings/twoFASettings"
import { ShieldCheck, UserCircle } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12 selection:bg-[#f1d1d1]">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <header className="mb-20">
          <div className="flex items-center gap-3 text-[#f1d1d1] mb-4">
            <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Preferences</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic leading-tight">
            Account <span className="font-sans not-italic font-light">Settings</span>
          </h1>
          <p className="mt-4 text-[#494040]/50 font-light text-sm max-w-md italic font-serif">
            Manage your personal identity and digital security protocols within the BagBelle.
          </p>
        </header>

        <div className="space-y-24">
          
          {/* Profile Section */}
          <section className="relative">
            <div className="absolute -left-6 top-0 hidden lg:block">
               <div className="rotate-90 origin-left text-[9px] font-bold tracking-[0.5em] uppercase text-[#f1d1d1]">
                 Identity
               </div>
            </div>
            <UserProfile />
          </section>

          {/* Elegant Divider */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-[#f1d1d1]/30"></div>
            <ShieldCheck className="text-[#f1d1d1] w-5 h-5" strokeWidth={1} />
            <div className="h-[1px] flex-1 bg-[#f1d1d1]/30"></div>
          </div>

          {/* Security Section */}
          <section className="relative pb-20">
            <div className="absolute -left-6 top-0 hidden lg:block">
               <div className="rotate-90 origin-left text-[9px] font-bold tracking-[0.5em] uppercase text-[#f1d1d1]">
                 Security
               </div>
            </div>
            
            <div className="mb-10">
               <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#494040]/80 flex items-center gap-3">
                 Access Control
               </h3>
            </div>
            
            <TwoFASettings />
          </section>

        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="fixed top-0 right-0 -z-10 opacity-[0.03] pointer-events-none p-12">
        <UserCircle size={600} strokeWidth={0.5} />
      </div>
    </div>
  )
}