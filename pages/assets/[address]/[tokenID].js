import { MediaRenderer, useMarketplace, useActiveListings, useAddress } from "@thirdweb-dev/react"
import { useRouter } from "next/router"
import { BigNumber } from "ethers"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

const NFT = () => {
    const [listing, setListing] = useState()
    const [loading, setLoading] = useState(false)
    const marketplace = useMarketplace("0x7a33B2DF646c84bb7e0D5216CbD66edFc7baA584")
    const address = useAddress()
    const router = useRouter()
    const {tokenID} = router.query

    useEffect(() => {
        getListing()
    }, [])

    const getListing = async () => {
        try {
            setLoading(true)
            const listing = await marketplace.getListing(BigNumber.from(tokenID))

            setListing(listing)
            setLoading(false)
        } 

        catch(error) {
            console.log(error)
        }
    }

    const buyNFT = async () => {
        try {
            await marketplace.buyoutListing(tokenID, 1)
            alert("NFT bought successfully! You may go back to the previous page.")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Head>
                <title>Purchase | MVRNFT</title>
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
            </Head>

            {loading ? (
                <div className="flex justify-center py-96">Loading... (may take 3 sec.)</div>
            ) : (
                <div>
                    <div className="py-24 px-12">
                            <div className="hover:underline">
                                <Link href="/">Back</Link>
                            </div>
                    </div>
                    <div className="py-24">
                        <div className="flex justify-center">
                            <button className="border-2 border-black text-black p-3 rounded-3xl hover:text-white hover:bg-black" onClick={buyNFT}>
                                Review Order: {listing?.asset?.name} NFT
                            </button>
                        </div>
                        <div className="flex justify-center p-5">
                            Prior To Purchasing: Ensure you have connected your wallet prior to reviewing.
                        </div>
                        <div className="flex justify-center p-5">
                            Purchasing: Click button once, may take 10 seconds for the response.
                        </div>
                        <div className="flex justify-center p-5">
                            After Purchasing: Wait 25 seconds for a nonification confirming your ownership and purchase.
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NFT