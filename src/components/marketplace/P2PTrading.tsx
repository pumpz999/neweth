import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../hooks/useWallet';
import { Button, TextField, Typography, Card, CardContent, CardActions, CircularProgress, Dialog, DialogTitle
