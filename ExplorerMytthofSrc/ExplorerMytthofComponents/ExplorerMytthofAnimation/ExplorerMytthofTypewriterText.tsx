import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
} from 'react-native';

import {typewriterCharDelay} from '../../ExplorerMytthofLoungeKit/ExplorerMytthofTypewriter';
import {colors} from '../../ExplorerMytthofPalette';

type TypewriterTextProps = {
  text: string;
  style?: StyleProp<TextStyle>;
  /** Override adaptive speed (ms per character). */
  charDelayMs?: number;
  /** Wait before typing starts. */
  delayMs?: number;
  /** Restart typing when this changes. */
  triggerKey?: string | number;
  showCursor?: boolean;
  onComplete?: () => void;
};

const TypewriterText = ({
  text,
  style,
  charDelayMs,
  delayMs = 0,
  triggerKey,
  showCursor = true,
  onComplete,
}: TypewriterTextProps) => {
  const [explorerMytthofVisibleCount, setExplorerMytthofVisibleCount] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const delay = useMemo(
    () => charDelayMs ?? typewriterCharDelay(text.length),
    [charDelayMs, text.length],
  );

  useEffect(() => {
    setExplorerMytthofVisibleCount(0);

    if (!text.length) {
      onCompleteRef.current?.();
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setExplorerMytthofVisibleCount(index);
        if (index >= text.length) {
          if (interval) {
            clearInterval(interval);
          }
          onCompleteRef.current?.();
        }
      }, delay);
    }, delayMs);

    return () => {
      clearTimeout(startTimer);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [delay, delayMs, text, triggerKey]);

  const showCaret =
    showCursor &&
    explorerMytthofVisibleCount > 0 &&
    explorerMytthofVisibleCount < text.length;

  return (
    <Text style={style}>
      {text.slice(0, explorerMytthofVisibleCount)}
      {showCaret ? (
        <Text style={[style, explorerMytthofStyles.explorerMytthofCursor]}>|</Text>
      ) : null}
    </Text>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofCursor: {
    color: colors.accentLight,
    opacity: 0.85,
  },
});

export default TypewriterText;
