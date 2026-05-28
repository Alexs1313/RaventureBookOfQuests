import React from 'react';
import {type StyleProp, type ViewStyle} from 'react-native';

import {staggerDelay} from '../../lnggkiiT/animations';
import FadeInView from './FadeInView';

type StaggerItemProps = {
  children: React.ReactNode;
  index: number;
  style?: StyleProp<ViewStyle>;
};

const StaggerItem = ({children, index, style}: StaggerItemProps) => (
  <FadeInView delay={staggerDelay(index)} style={style}>
    {children}
  </FadeInView>
);

export default StaggerItem;
