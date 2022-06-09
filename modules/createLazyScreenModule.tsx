import React from 'react';
import { Platform } from 'react-native';
import LazyScreen from '../components/LazyScreen';
import { createLazyScreenModuleParamsType } from '../types';

const createLazyScreenmodule = ({ defaultFallback }: createLazyScreenModuleParamsType = {}) => {
  const renderLazyScreen = ({ getComponent, fallback = defaultFallback }) => {
    const renderComponent = (props) => (
      // render lazy screen after animating in ios because bug with scrollview handle bar
      <LazyScreen
        renderScreenAfterInteraction={Platform.OS === 'ios'}
        fallback={fallback}
        getComponent={getComponent}
        {...props}
      />
    );

    return renderComponent;
  };

  return { renderLazyScreen };
};

export default createLazyScreenmodule;
