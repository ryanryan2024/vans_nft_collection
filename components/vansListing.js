import { useEffect, useState } from "react"
import Link from "next/link"
import { useMarketplace, useActiveListings, MediaRenderer, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react"
import {useRouter} from "next/router"
import {Menu, Transition} from '@headlessui/react'
import { Fragment, useRef } from "react";
import Image from "next/image"
import NFTCard from "./NFTCard"

const style = {
    logo: 'flex pl-5',
}

const Listing = () => {
    const marketplace = useMarketplace("0x7a33B2DF646c84bb7e0D5216CbD66edFc7baA584")
    const [listings, setListings] = useState([])

    useEffect(() => {
        getListings()
    }, [])

    const getListings = async () => {
        try {
            const list = await marketplace.getActiveListings()
            setListings(list)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mx-auto grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24 md:grid-cols-2 md:pt-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

            {listings.length > 0 ? (
                <>
                    {listings?.map((listing, index)=> (
                        <Link
                        key = {index}
                        href={`/assets/${listing.assetContractAddress}/${listing.id}`}
                        >
                            <a>
                                <NFTCard listing={listing}/>
                            </a>
                        </Link>
                    ))}
                </>
                ) : (
                    <div>Loading... (may take 10 sec.)</div>
            )}
        </div>
    )

}

export default Listing