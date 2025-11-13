import Header from "@/components/header"
import Hero from "@/components/hero"
import WhyUs from "@/components/why-us"
import WhatWeOffer from "@/components/whatweoffer"

import CallToAction from "@/components/CallToAction";


import Footer from "@/components/footer"




export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      
      <WhyUs />
      <WhatWeOffer />
       {/* 👈 Add this line here */}
         
         <CallToAction />

         
      <Footer />
    </main>
  )
}

