"use client"
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FetchDatafromAPIClass } from '@/app/domain/interfaces/fectUserData';
import { apiUser } from '@/lib';

export const useWhatsappData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
   
    
    try {
      const response = await axios.get<FetchDatafromAPIClass[]>(apiUser!);
     //console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  }, [forceRefresh]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = () => {
    setForceRefresh(true);
    fetchData().finally(() => setForceRefresh(false));
  };

  return { data, loading, error, setData, refreshData };
};