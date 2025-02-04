import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../hooks/useWallet';
import { Button, TextField, Typography, Card, CardContent, CardActions, CircularProgress } from '@mui/material';
import { TokenMarketplace } from '../../contracts/TokenMarketplace';
import { Chat } from '../chat/Chat';

const MARKETPLACE_ADDRESS = "0x...";

export function TokenTrading() {
  const { walletState } = useWallet();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [p2pTrades, setP2pTrades] = useState([]);
  const [showP2PForm, setShowP2PForm] = useState(false);
  const [p2pDetails, setP2pDetails] = useState({
    tokenAddress: '',
    amount: '',
    price: '',
    counterparty: ''
  });

  useEffect(() => {
    loadListings();
    loadP2PTrades();
  }, [walletState]);

  async function loadListings() {
    if (!walletState.signer) return;
    
    const marketplace = new TokenMarketplace(MARKETPLACE_ADDRESS, walletState.signer);
    const count = await marketplace.listingCount();
    
    const listings = [];
    for (let i = 1; i <= count; i++) {
      const listing = await marketplace.tokenListings(i);
      if (listing.isActive) {
        listings.push({ ...listing, id: i });
      }
    }
    
    setListings(listings);
  }

  async function loadP2PTrades() {
    if (!walletState.signer) return;
    
    const marketplace = new TokenMarketplace(MARKETPLACE_ADDRESS, walletState.signer);
    const count = await marketplace.p2pTradeCount();
    
    const trades = [];
    for (let i = 1; i <= count; i++) {
      const trade = await marketplace.p2pTrades(i);
      if (trade.isActive) {
        trades.push({ ...trade, id: i });
      }
    }
    
    setP2pTrades(trades);
  }

  async function createP2PTrade() {
    setLoading(true);
    try {
      const marketplace = new TokenMarketplace(MARKETPLACE_ADDRESS, walletState.signer);
      const tx = await marketplace.createP2PTrade(
        p2pDetails.tokenAddress,
        ethers.parseUnits(p2pDetails.amount),
        ethers.parseEther(p2pDetails.price),
        p2pDetails.counterparty
      );
      await tx.wait();
      await loadP2PTrades();
      setShowP2PForm(false);
    } catch (error) {
      console.error('Error creating P2P trade:', error);
    }
    setLoading(false);
  }

  async function approveP2PTrade(tradeId, price) {
    setLoading(true);
    try {
      const marketplace = new TokenMarketplace(MARKETPLACE_ADDRESS, walletState.signer);
      const tx = await marketplace.approveP2PTrade(tradeId, { value: ethers.parseEther(price.toString()) });
      await tx.wait();
      await loadP2PTrades();
    } catch (error) {
      console.error('Error approving P2P trade:', error);
    }
    setLoading(false);
  }

  return (
    <div className="flex gap-8">
      <div className="w-2/3">
        <Typography variant="h4" className="mb-8">999leads.com Token Marketplace</Typography>
        
        <Button 
          variant="contained" 
          onClick={() => setShowP2PForm(!showP2PForm)}
          className="mb-4"
        >
          {showP2PForm ? 'Hide P2P Trade Form' : 'Create P2P Trade'}
        </Button>

        {showP2PForm && (
          <Card className="mb-4">
            <CardContent>
              <TextField
                label="Token Address"
                value={p2pDetails.tokenAddress}
                onChange={(e) => setP2pDetails({...p2pDetails, tokenAddress: e.target.value})}
                fullWidth
                className="mb-4"
              />
              <TextField
                label="Amount"
                value={p2pDetails.amount}
                onChange={(e) => setP2pDetails({...p2pDetails, amount: e.target.value})}
                fullWidth
                className="mb-4"
              />
              <TextField
                label="Price (ETH)"
                value={p2pDetails.price}
                onChange={(e) => setP2pDetails({...p2pDetails, price: e.target.value})}
                fullWidth
                className="mb-4"
              />
              <TextField
                label="Counterparty Address"
                value={p2pDetails.counterparty}
                onChange={(e) => setP2pDetails({...p2pDetails, counterparty: e.target.value})}
                fullWidth
                className="mb-4"
              />
              <Button 
                variant="contained" 
                onClick={createP2PTrade}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Trade'}
              </Button>
            </CardContent>
          </Card>
        )}

        <Typography variant="h5" className="mt-8 mb-4">P2P Trades</Typography>
        {p2pTrades.map(trade => (
          <Card key={trade.id} className="mb-4">
            <CardContent>
              <Typography variant="h6">Token: {trade.tokenAddress}</Typography>
              <Typography>Amount: {ethers.formatUnits(trade.amount)}</Typography>
              <Typography>Price: {ethers.formatEther(trade.price)} ETH</Typography>
              <Typography>Status: {trade.initiatorApproved && trade.counterpartyApproved ? 'Completed' : 'Pending'}</Typography>
            </CardContent>
            <CardActions>
              {walletState.address === trade.initiator && !trade.initiatorApproved && (
                <Button 
                  variant="contained" 
                  onClick={() => approveP2PTrade(trade.id, trade.price)}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Approve as Initiator'}
                </Button>
              )}
              {walletState.address === trade.counterparty && !trade.counterpartyApproved && (
                <Button 
                  variant="contained" 
                  onClick={() => approveP2PTrade(trade.id, trade.price)}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Approve as Counterparty'}
                </Button>
              )}
              <Button 
                variant="outlined" 
                onClick={() => setSelectedListing(trade)}
              >
                Chat
              </Button>
            </CardActions>
          </Card>
        ))}

        <Typography variant="h5" className="mt-8 mb-4">Token Listings</Typography>
        {listings.map(listing => (
          <Card key={listing.id} className="mb-4">
            <CardContent>
              <Typography variant="h6">Token: {listing.tokenAddress}</Typography>
              <Typography>Amount: {listing.amount}</Typography>
              <Typography>Price: {listing.price} ETH</Typography>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                onClick={() => buyToken(listing.id, listing.price)}
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
