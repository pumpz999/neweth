import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../hooks/useWallet';
import { Button, TextField, Typography, Card, CardContent, CardActions, CircularProgress } from '@mui/material';
import { TokenMarketplace } from '../../contracts/TokenMarketplace';
import { Chat } from '../chat/Chat';
import { ThreeScene } from '../three/ThreeScene';

const MARKETPLACE_ADDRESS = "0x...";

export function NFTTrading() {
  const { walletState } = useWallet();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    loadListings();
  }, [walletState]);

  async function loadListings() {
    if (!walletState.signer) return;
    
    const marketplace = new TokenMarketplace(MARKETPLACE_ADDRESS, walletState.signer);
    const count = await marketplace.nftListingCount();
    
    const listings = [];
    for (let i = 1; i <= count; i++) {
      const listing = await marketplace.nftListings(i);
      if (listing.isActive) {
        listings.push({ ...listing, id: i });
      }
    }
    
    setListings(listings);
  }

  async function buyNFT(listingId, price) {
    setLoading(true);
    try {
      const marketplace = new TokenMarketplace(MARKETPLACE_ADDRESS, walletState.signer);
      const tx = await marketplace.buyNFT(listingId, { value: ethers.parseEther(price.toString()) });
      await tx.wait();
      await loadListings();
    } catch (error) {
      console.error('Error buying NFT:', error);
    }
    setLoading(false);
  }

  return (
    <div className="flex gap-8">
      <div className="w-2/3">
        <Typography variant="h4" className="mb-8">NFT Marketplace</Typography>
        
        {listings.map(listing => (
          <Card key={listing.id} className="mb-4">
            <CardContent>
              <Typography variant="h6">NFT: {listing.nftAddress}</Typography>
              <Typography>Token ID: {listing.tokenId}</Typography>
              <Typography>Price: {listing.price} ETH</Typography>
              <ThreeScene tokenId={listing.tokenId} />
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                onClick={() => buyNFT(listing.id, listing.price)}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Buy'}
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => setSelectedListing(listing)}
              >
                Chat
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      
      <div className="w-1/3">
        {selectedListing && (
          <Chat 
            listingId={selectedListing.id}
            userAddress={walletState.address}
          />
        )}
      </div>
    </div>
  );
}
