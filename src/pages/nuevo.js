import { getSession, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

export default function Nuevo() {
    

    const {data, status} = useSession()
  console.log(data, status);
    return (
    <div>nuevo</div>
  )
}
