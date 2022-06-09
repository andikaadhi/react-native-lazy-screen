import React from 'react';

export interface createLazyScreenModuleParamsType {
  defaultFallback?: React.ReactNode;
}

export interface renderLazyScreenParamsType {
  fallback?: React.ReactNode;
  getComponent: () => Promise<any>;
}

export type renderLazyScreenReturnType = (params: renderLazyScreenParamsType) => React.ReactNode;
