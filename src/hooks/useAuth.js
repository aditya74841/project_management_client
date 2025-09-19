// hooks/useAuth.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile, refreshAccessToken } from '@/redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, profile, accessToken, error, tokenRefreshing } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    // Only fetch profile if logged in but no profile data
    if (isLoggedIn && accessToken && !profile && !tokenRefreshing) {
      dispatch(userProfile());
    }
  }, [isLoggedIn, accessToken, profile, tokenRefreshing, dispatch]);

  const handleRetryProfile = () => {
    if (isLoggedIn && accessToken) {
      dispatch(userProfile());
    }
  };

  const handleRefreshToken = () => {
    // dispatch(refreshAccessToken());
  };

  return {
    isLoggedIn,
    profile,
    error,
    tokenRefreshing,
    handleRetryProfile,
    handleRefreshToken,
  };
};
