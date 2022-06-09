import React, { useEffect, useState, useRef } from 'react';
import { InteractionManager, Text } from 'react-native';
import { LazyScreenPropsType } from './types';

const COMPONENT = {};

const LazyScreen: React.FC<LazyScreenPropsType> = ({
  route,
  fallback = null,
  renderScreenAfterInteraction = false,
  getComponent,
  ...props
}) => {
  const [isExist, setIsExist] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const Component = useRef();

  const getComponentRef = useRef(getComponent);

  useEffect(() => {
    const announceComponent = () => {
      Component.current = COMPONENT[route.name];
      setIsReady(true);
    };

    const prepareComponent = async () => {
      if (typeof getComponentRef.current !== 'function') return setIsExist(false);

      if (COMPONENT[route.name]) return announceComponent();

      const comp = await getComponentRef.current();
      COMPONENT[route.name] = comp.default;
      return announceComponent();
    };

    if (renderScreenAfterInteraction) InteractionManager.runAfterInteractions(prepareComponent);
    else prepareComponent();
  }, [route.name, renderScreenAfterInteraction]);

  if (!isExist) return <Text>Component Not Found</Text>;

  return isReady ? (
    // eslint-disable-next-line react/jsx-pascal-case
    <Component.current route={route} {...props} />
  ) : (
    fallback
  );
};

export default React.memo(LazyScreen, () => true);
