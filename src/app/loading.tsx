"use client"
import { Spinner } from '@heroui/react'
import React from 'react'

export default function loading() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <Spinner size='lg' />
    </div>
  )
}
