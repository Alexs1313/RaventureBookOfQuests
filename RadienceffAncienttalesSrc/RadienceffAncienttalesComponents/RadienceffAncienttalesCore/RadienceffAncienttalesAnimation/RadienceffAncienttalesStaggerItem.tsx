import React from 'react';
import {type StyleProp, type ViewStyle} from 'react-native';

import {radienceffAncienttalesStaggerDelay} from '../RadienceffAncienttalesLoungeKit/RadienceffAncienttalesAnimations';
import RadienceffAncienttalesFadeInView from './RadienceffAncienttalesFadeInView';

type RadienceffAncienttalesStaggerItemProps = {
  children: React.ReactNode;
  index: number;
  style?: StyleProp<ViewStyle>;
};

const RadienceffAncienttalesStaggerItem = ({children, index, style}: RadienceffAncienttalesStaggerItemProps) => (
  <RadienceffAncienttalesFadeInView delay={radienceffAncienttalesStaggerDelay(index)} style={style}>
    {children}
  </RadienceffAncienttalesFadeInView>
);

export default RadienceffAncienttalesStaggerItem;
