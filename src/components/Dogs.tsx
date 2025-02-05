"use client"
import { fetchDogs, findMatch } from '@/utils/Function';
import { Avatar, Button, Card, CardBody, CardHeader, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react'

const Dogs = ({
    dogs,
    next,
    breads
}: {
    dogs: any,
    next: any,
    breads: any
}) => {
    const [dogsList, setDogsList] = React.useState(dogs);
    const [nextPagination, setNext] = React.useState(next);
    const [prevPagination, setPrev] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [values, setValues] = React.useState(new Set([]));
    const [order, setOrder] = React.useState("asc");
    const [favouriteList, setFavouriteList] = React.useState<any>([]);


    const handleNext = async (e: any) => {
        setIsLoading(true);
        const data: any = await fetchDogs(nextPagination);
        if (data) {
            if (data.next) {
                setNext(data.next);
            } else {
                setNext(null)
            }
            if (data.prev) {
                setPrev(data.prev)
            } else {
                setPrev(null)
            }
            setDogsList(data.data);
        }
        setIsLoading(false);
    }
    const handlePrevious = async (e: any) => {
        setIsLoading(true);
        const data: any = await fetchDogs(prevPagination);
        if (data) {
            if (data.next) {
                setNext(data.next);
            } else {
                setNext(null)
            }
            if (data.prev) {
                setPrev(data.prev)
            } else {
                setPrev(null)
            }
            setDogsList(data.data);
        }
        setIsLoading(false);
    }
    const updateFilter = async (changedValues: any) => {
        setValues(changedValues);
        setIsLoading(true);

        const data: any = await fetchDogs(`/dogs/search?size=20&from=0&sort=breed:${order}${Array.from(changedValues).length > 0 ? `&breeds=${Array.from(changedValues).join("&")}` : ''}`);
        if (data) {
            if (data.next) {
                setNext(data.next);
            } else {
                setNext(null)
            }
            if (data.prev) {
                setPrev(data.prev)
            } else {
                setPrev(null)
            }
            setDogsList(data.data);
        }
        setIsLoading(false);

    }
    const updateSorting = async (e: any) => {
        setOrder(e.target.value);
        setIsLoading(true);

        const data: any = await fetchDogs(`/dogs/search?size=20&from=0&sort=breed:${e.target.value}${Array.from(values).length > 0 ? `&breeds=${Array.from(values).join("&")} ` : ''}`);
        if (data) {
            if (data.next) {
                setNext(data.next);
            } else {
                setNext(null)
            }
            if (data.prev) {
                setPrev(data.prev)
            } else {
                setPrev(null)
            }
            setDogsList(data.data);
        }
        setIsLoading(false);

    }

    const addToFavourite = (id: string) => {
        setFavouriteList([
            ...favouriteList,
            id
        ])
    }
    const removeFromFavourite = (id: string) => {
        setFavouriteList([
            ...favouriteList.filter((item : string) => item !== id)
        ])
    }
    const router = useRouter();
    const findDogMatch = async  () => {
        if(favouriteList.length == 0){
            alert("Please select a dog to find a match");
            return;
        }
        const match : any = await findMatch(favouriteList);
        if(match?.match){
            router.push(`/dashboard/dog/${match.match}`)
        }
    }

    return (
        <div className='max-w-6xl px-3 mx-auto'>
            <div className="flex flex-wrap -mx-1 lg:-mx-2 mt-4 gap-4">
                <Select
                    className="max-w-xs"
                    label="Select an Bread"
                    placeholder="Select an Bread"
                    selectedKeys={values}
                    selectionMode="multiple"
                    size='sm'
                    //@ts-ignore
                    onSelectionChange={updateFilter}
                >
                    {breads.map((bread: string) => (
                        <SelectItem key={bread}>{bread}</SelectItem>
                    ))}
                </Select>
                <Select
                    className="max-w-xs"
                    label="Bread Order"
                    placeholder="Bread Order"
                    defaultSelectedKeys={['asc']}
                    size='sm'
                    //@ts-ignore
                    onChange={updateSorting}
                >

                    <SelectItem key={"asc"}>Asscending</SelectItem>
                    <SelectItem key={"desc"}>Descending</SelectItem>

                </Select>
                <Button color='primary' onPress={findDogMatch}>
                    Find Match
                </Button>
            </div>
            {isLoading ? (
                <div className='w-full min-h-[400px] flex justify-center items-center'>
                    <Spinner size='lg' />
                </div>
            ) : (
                <div className='grid md:grid-cols-2 gap-3'>
                    {dogsList?.map((dog: any) => (
                        <Card className='mt-5' key={dog.id}>
                            <CardHeader>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Name : {dog.name}
                                </h2>
                                <Button
                                    size='sm'
                                    className='ml-auto'
                                    color={favouriteList?.find((item : string) => item == dog.id) ? "danger" : "primary"}
                                    onPress={() => favouriteList?.find((item : string) => item == dog.id) ? removeFromFavourite(dog.id) : addToFavourite(dog.id)}
                                >
                                    {favouriteList?.find((item : string) => item == dog.id) ? "Remove from Favourite" : "Add to Favourite"}
                                </Button>
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
                    ))}
                </div>
            )}
            <div className='py-3 flex justify-between'>
                <Button disabled={nextPagination ? true : false} onPress={handlePrevious}>
                    {prevPagination ? `Prev` : `No prev`}
                </Button>
                <Button disabled={nextPagination ? true : false} color='primary' onPress={handleNext}>
                    {nextPagination ? `Next` : `No next`}
                </Button>
            </div>
        </div>
    )
}
export default Dogs;