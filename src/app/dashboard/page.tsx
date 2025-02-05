
import Dogs from '@/components/Dogs';
import { fetchBreads, fetchDogs } from '@/utils/Function';
import React from 'react'
// Opt out of static generation
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export default async function page() {
    const dogs = await fetchDogs("/dogs/search?size=20&from=0&sort=breed:asc");
    const breads = await fetchBreads();
    return (
        <div>
            <Dogs
                next={dogs?.next}
                dogs={dogs?.data}
                breads={breads}
            />

        </div>
    )
}
