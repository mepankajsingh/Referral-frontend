import React from 'react';

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
}

export default function LoadingState({ isLoading, children, skeleton }: LoadingStateProps) {
  return (
    <>
      {isLoading ? skeleton : children}
    </>
  );
}
