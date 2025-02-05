"use client"
import { Card, CardBody, CardHeader } from '@heroui/react'
import Image from 'next/image'
import React from 'react'

export default function DogDetail({
    dog
}: {
    dog: any
}) {
    return (
        <div className='max-w-6xl px-3 mx-auto'>
            <h1
            className='text-3xl font-bold text-gray-900 my-4 text-center'>
                Your Best Match
            </h1>
            <Card className='mt-5' key={dog.id}>
                <CardHeader>
                    <h2 className="text-lg font-bold text-gray-900">
                        Name : {dog.name}
                    </h2>

                </CardHeader>
                <CardBody>

                    <div className='grid md:grid-cols-3 gap-3'>
                        <div>
                            <Image
                                src={dog.img}
                                alt={dog.name}
                                className='rounded-lg w-[150px] h-[120px] object-cover'
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className='md:col-span-2'>
                            <div className="grid grid-cols-2 gap-2 gap-y-3">
                                <div className="text-lg text-gray-900">Breed:</div>
                                <div className="text-lg text-gray-900">{dog.breed}</div>
                                <div className="text-lg text-gray-900">Age:</div>
                                <div className="text-lg text-gray-900">{dog.age}</div>
                                <div className="text-lg text-gray-900">Zip Code:</div>
                                <div className="text-lg text-gray-900">{dog.zip_code}</div>

                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
