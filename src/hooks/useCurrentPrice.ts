import {useEffect, useState} from 'react';
import {Amount} from '~/lib/numberUtils';
import {getCurrentPrice} from '~/lib/uniswap';

export const useCurrentPrice = () => {
  const [currentPrice, setCurrentPrice] = useState<Amount>();

  useEffect(() => {
    const fetchCurrentPrice = async () => {
      const price = await getCurrentPrice();
      setCurrentPrice(price);
    };
    void fetchCurrentPrice();
  }, []);

  return currentPrice;
};
