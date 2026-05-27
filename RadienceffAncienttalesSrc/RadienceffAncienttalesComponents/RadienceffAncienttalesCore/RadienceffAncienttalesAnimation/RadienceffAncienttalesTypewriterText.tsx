import React, {useEffect} from 'react';
import {Text, type StyleProp, type TextStyle} from 'react-native';

type RadienceffAncienttalesTypewriterTextProps = {
  text: string;
  style?: StyleProp<TextStyle>;
  charDelayMs?: number;
  delayMs?: number;
  triggerKey?: string | number;
  showCursor?: boolean;
  onComplete?: () => void;
};

const RadienceffAncienttalesTypewriterText = ({text, style, onComplete}: RadienceffAncienttalesTypewriterTextProps) => {
  useEffect(() => {
    onComplete?.();
  }, [onComplete, text]);

  return <Text style={style}>{text}</Text>;
};

export default RadienceffAncienttalesTypewriterText;
