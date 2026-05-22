import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
} from 'react-native';

import {typewriterCharDelay} from '../../lib/typewriter';
import {colors} from '../../theme';

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
  const [visibleCount, setVisibleCount] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const delay = useMemo(
    () => charDelayMs ?? typewriterCharDelay(text.length),
    [charDelayMs, text.length],
  );

  useEffect(() => {
    setVisibleCount(0);

    if (!text.length) {
      onCompleteRef.current?.();
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setVisibleCount(index);
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
    visibleCount > 0 &&
    visibleCount < text.length;

  return (
    <Text style={style}>
      {text.slice(0, visibleCount)}
      {showCaret ? (
        <Text style={[style, styles.cursor]}>|</Text>
      ) : null}
    </Text>
  );
};

const styles = StyleSheet.create({
  cursor: {
    color: colors.accentLight,
    opacity: 0.85,
  },
});

export default TypewriterText;
