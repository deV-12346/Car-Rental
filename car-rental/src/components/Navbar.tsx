import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div>
            <Image src="/logo.jpg"   alt="Car Rental Logo" width={250}  height={180} />
      </div>
    </div>
  )
}

export default Navbar