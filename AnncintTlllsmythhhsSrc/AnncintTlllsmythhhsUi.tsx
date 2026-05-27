import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  anncintTlllsmythhhsAnimationDurations,
  anncintTlllsmythhhsAnimationEasing,
  anncintTlllsmythhhsGradients,
  anncintTlllsmythhhsGradientAxis,
  anncintTlllsmythhhsMediaRegistry,
  anncintTlllsmythhhsSpacing,
  anncintTlllsmythhhsStaggerDelay,
  type AnncintTlllsmythhhsChronicleEntry,
  type AnncintTlllsmythhhsJokeCategory,
  type AnncintTlllsmythhhsJokeEntry,
  type AnncintTlllsmythhhsRelicProfile,
} from './AnncintTlllsmythhhsCore';

type AnncintTlllsmythhhsAnimatedProgressBarProps = {
  progress: number;
};

const AnncintTlllsmythhhsAnimatedProgressBar = ({progress}: AnncintTlllsmythhhsAnimatedProgressBarProps) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const clamped = Math.min(Math.max(progress, 0), 1);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: clamped,
      duration: anncintTlllsmythhhsAnimationDurations.normal,
      easing: anncintTlllsmythhhsAnimationEasing.inOut,
      useNativeDriver: false,
    }).start();
  }, [clamped, widthAnim]);

  const width = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['4%', '100%'],
  });

  return (
    <View style={anncintTlllsmythhhsAnimatedProgressBarStyles.anncintTlllsmythhhsTrack}>
      <Animated.View style={[anncintTlllsmythhhsAnimatedProgressBarStyles.anncintTlllsmythhhsFillWrap, {width}]}>
        <LinearGradient
          colors={anncintTlllsmythhhsGradients.primary}
          start={anncintTlllsmythhhsGradientAxis.horizontal.start}
          end={anncintTlllsmythhhsGradientAxis.horizontal.end}
          style={anncintTlllsmythhhsAnimatedProgressBarStyles.anncintTlllsmythhhsFill}
        />
      </Animated.View>
    </View>
  );
};

const anncintTlllsmythhhsAnimatedProgressBarStyles = StyleSheet.create({
  anncintTlllsmythhhsTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    overflow: 'hidden',
    marginBottom: 16,
  },
  anncintTlllsmythhhsFillWrap: {
    height: '100%',
    minWidth: 4,
  },
  anncintTlllsmythhhsFill: {
    flex: 1,
    borderRadius: 4,
  },
});

const PAGE_COUNT = 5;

const AnncintTlllsmythhhsBookPageLoader = () => {
  const flip = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(flip, {
        toValue: PAGE_COUNT,
        duration: 2800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [flip]);

  return (
    <View style={anncintTlllsmythhhsBookPageLoaderStyles.anncintTlllsmythhhsWrap}>
      <View style={anncintTlllsmythhhsBookPageLoaderStyles.anncintTlllsmythhhsBook}>
        {Array.from({length: PAGE_COUNT}, (_, index) => {
          const inputRange = [index - 1, index, index + 1];
          const rotateY = flip.interpolate({
            inputRange,
            outputRange: ['0deg', '-72deg', '-72deg'],
            extrapolate: 'clamp',
          });
          const opacity = flip.interpolate({
            inputRange,
            outputRange: [1, 0.35, 0.35],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                anncintTlllsmythhhsBookPageLoaderStyles.anncintTlllsmythhhsPage,
                {
                  zIndex: PAGE_COUNT - index,
                  opacity,
                  transform: [
                    {perspective: 800},
                    {rotateY},
                    {translateX: index * 2},
                  ],
                },
              ]}
            />
          );
        })}
        <View style={anncintTlllsmythhhsBookPageLoaderStyles.anncintTlllsmythhhsSpine} />
      </View>
      <Text style={anncintTlllsmythhhsBookPageLoaderStyles.anncintTlllsmythhhsCaption}>Opening the book…</Text>
    </View>
  );
};

const anncintTlllsmythhhsBookPageLoaderStyles = StyleSheet.create({
  anncintTlllsmythhhsWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  anncintTlllsmythhhsBook: {
    width: 112,
    height: 84,
    borderRadius: 10,
    backgroundColor: '#D4763E',
    overflow: 'hidden',
    shadowColor: '#5A3A24',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  anncintTlllsmythhhsPage: {
    position: 'absolute',
    left: 8,
    top: 6,
    width: 88,
    height: 72,
    borderRadius: 4,
    backgroundColor: '#2A1810',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    transformOrigin: 'left center',
  },
  anncintTlllsmythhhsSpine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 10,
    backgroundColor: '#5A3A24',
    opacity: 0.85,
  },
  anncintTlllsmythhhsCaption: {
    marginTop: 18,
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(212, 165, 116, 0.7)',
    letterSpacing: 0.3,
  },
});

type AnncintTlllsmythhhsFadeInViewProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  offsetY?: number;
  style?: StyleProp<ViewStyle>;

  triggerKey?: string | number;
};

const AnncintTlllsmythhhsFadeInView = ({
  children,
  delay = 0,
  duration = anncintTlllsmythhhsAnimationDurations.normal,
  offsetY = 14,
  style,
  triggerKey,
}: AnncintTlllsmythhhsFadeInViewProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(offsetY)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(offsetY);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: anncintTlllsmythhhsAnimationEasing.out,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        speed: 14,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, duration, offsetY, opacity, translateY, triggerKey]);

  return (
    <Animated.View style={[style, {opacity, transform: [{translateY}]}]}>
      {children}
    </Animated.View>
  );
};

type AnncintTlllsmythhhsStaggerItemProps = {
  children: React.ReactNode;
  index: number;
  style?: StyleProp<ViewStyle>;
};

const AnncintTlllsmythhhsStaggerItem = ({children, index, style}: AnncintTlllsmythhhsStaggerItemProps) => (
  <AnncintTlllsmythhhsFadeInView delay={anncintTlllsmythhhsStaggerDelay(index)} style={style}>
    {children}
  </AnncintTlllsmythhhsFadeInView>
);

type AnncintTlllsmythhhsTypewriterTextProps = {
  text: string;
  style?: StyleProp<TextStyle>;
  charDelayMs?: number;
  delayMs?: number;
  triggerKey?: string | number;
  showCursor?: boolean;
  onComplete?: () => void;
};

const AnncintTlllsmythhhsTypewriterText = ({text, style, onComplete}: AnncintTlllsmythhhsTypewriterTextProps) => {
  useEffect(() => {
    onComplete?.();
  }, [onComplete, text]);

  return <Text style={style}>{text}</Text>;
};

type AnncintTlllsmythhhsBackButtonProps = {
  onPress: () => void;
};

const AnncintTlllsmythhhsBackButton = ({onPress}: AnncintTlllsmythhhsBackButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [anncintTlllsmythhhsBackButtonStyles.anncintTlllsmythhhsBtn, pressed && anncintTlllsmythhhsBackButtonStyles.anncintTlllsmythhhsPressed]}>
    <Image source={anncintTlllsmythhhsMediaRegistry.icons.back} />
  </Pressable>
);

const anncintTlllsmythhhsBackButtonStyles = StyleSheet.create({
  anncintTlllsmythhhsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsPressed: {
    opacity: 0.85,
  },
});

type AnncintTlllsmythhhsConfirmModalProps = {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  showClose?: boolean;
};

const AnncintTlllsmythhhsConfirmModal = ({
  visible,
  title,
  body,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  showClose,
}: AnncintTlllsmythhhsConfirmModalProps) => {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.92)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: anncintTlllsmythhhsAnimationDurations.fast,
          useNativeDriver: true,
        }),
        Animated.spring(modalScale, {
          toValue: 1,
          speed: 14,
          bounciness: 6,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: anncintTlllsmythhhsAnimationDurations.normal,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      overlayOpacity.setValue(0);
      modalScale.setValue(0.92);
      modalOpacity.setValue(0);
    }
  }, [visible, overlayOpacity, modalScale, modalOpacity]);

  return (
    <Modal
      visible={visible}
      statusBarTranslucent={Platform.OS === 'android'}
      transparent
      animationType="none"
      onRequestClose={onCancel}>
      <Animated.View style={[anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsOverlay, {opacity: overlayOpacity}]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <Animated.View
          style={[
            anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsModal,
            {
              opacity: modalOpacity,
              transform: [{scale: modalScale}],
            },
          ]}>
          {showClose ? (
            <Pressable onPress={onCancel} style={anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsClose}>
              <Image source={anncintTlllsmythhhsMediaRegistry.icons.close} />
            </Pressable>
          ) : null}
          <Text style={[anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsTitle, showClose && anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsTitleWithClose]}>
            {title}
          </Text>
          <Text style={anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsBody}>{body}</Text>
          <Pressable
            onPress={onConfirm}
            style={({pressed}) => [
              anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsConfirmPress,
              pressed && anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsPressed,
            ]}>
            <LinearGradient
              colors={anncintTlllsmythhhsGradients.danger}
              start={anncintTlllsmythhhsGradientAxis.horizontal.start}
              end={anncintTlllsmythhhsGradientAxis.horizontal.end}
              style={anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsConfirmBtn}>
              <Text style={anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsConfirmText}>{confirmLabel}</Text>
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={onCancel}
            style={({pressed}) => [
              anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsCancelBtn,
              pressed && anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsPressed,
            ]}>
            <Text style={anncintTlllsmythhhsConfirmModalStyles.anncintTlllsmythhhsCancelText}>{cancelLabel}</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const anncintTlllsmythhhsConfirmModalStyles = StyleSheet.create({
  anncintTlllsmythhhsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  anncintTlllsmythhhsModal: {
    width: '100%',
    maxWidth: 361,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.3)',
    backgroundColor: '#2A1810',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 12,
  },
  anncintTlllsmythhhsClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  anncintTlllsmythhhsTitle: {
    color: '#DAA520',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  anncintTlllsmythhhsTitleWithClose: {
    marginTop: 8,
  },
  anncintTlllsmythhhsBody: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  anncintTlllsmythhhsConfirmPress: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  anncintTlllsmythhhsConfirmBtn: {
    minHeight: 36,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  anncintTlllsmythhhsConfirmText: {
    color: '#D4A574',
    fontSize: 14,
    fontWeight: '500',
  },
  anncintTlllsmythhhsCancelBtn: {
    minHeight: 38,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
  },
  anncintTlllsmythhhsCancelText: {
    color: '#D4A574',
    fontSize: 14,
    fontWeight: '500',
  },
  anncintTlllsmythhhsPressed: {
    opacity: 0.85,
  },
});

type AnncintTlllsmythhhsGradientButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  icon?: ImageSourcePropType;
  tall?: boolean;
  flex?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnncintTlllsmythhhsGradientButton = ({
  label,
  onPress,
  style,
  disabled,
  icon,
  tall,
  flex,
}: AnncintTlllsmythhhsGradientButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 28,
      bounciness: value < 1 ? 0 : 6,
    }).start();
  };

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => !disabled && animateTo(0.96)}
      onPressOut={() => animateTo(1)}
      style={[
        anncintTlllsmythhhsGradientButtonStyles.anncintTlllsmythhhsPress,
        flex && anncintTlllsmythhhsGradientButtonStyles.anncintTlllsmythhhsFlex,
        disabled && anncintTlllsmythhhsGradientButtonStyles.anncintTlllsmythhhsDisabled,
        {transform: [{scale}]},
      ]}>
      <LinearGradient
        colors={anncintTlllsmythhhsGradients.primary}
        start={anncintTlllsmythhhsGradientAxis.horizontal.start}
        end={anncintTlllsmythhhsGradientAxis.horizontal.end}
        style={[anncintTlllsmythhhsGradientButtonStyles.anncintTlllsmythhhsBtn, tall && anncintTlllsmythhhsGradientButtonStyles.anncintTlllsmythhhsTall, style]}>
        {icon ? (
          <View style={anncintTlllsmythhhsGradientButtonStyles.anncintTlllsmythhhsIconRow}>
            <Image source={icon} />
            <Text style={anncintTlllsmythhhsGradientButtonStyles.anncintTlllsmythhhsText}>{label}</Text>
          </View>
        ) : (
          <Text style={anncintTlllsmythhhsGradientButtonStyles.anncintTlllsmythhhsText}>{label}</Text>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
};

const anncintTlllsmythhhsGradientButtonStyles = StyleSheet.create({
  anncintTlllsmythhhsPress: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  anncintTlllsmythhhsFlex: {
    flex: 1,
  },
  anncintTlllsmythhhsBtn: {
    minHeight: 48,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsTall: {
    minHeight: 80,
  },
  anncintTlllsmythhhsIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  anncintTlllsmythhhsText: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsDisabled: {
    opacity: 0.45,
  },
});

type AnncintTlllsmythhhsIconButtonProps = {
  source: ImageSourcePropType;
  onPress: () => void;
  variant: 'delete' | 'share';
};

const AnncintTlllsmythhhsIconButton = ({source, onPress, variant}: AnncintTlllsmythhhsIconButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      variant === 'delete' ? anncintTlllsmythhhsIconButtonStyles.anncintTlllsmythhhsDelete : anncintTlllsmythhhsIconButtonStyles.anncintTlllsmythhhsShare,
      pressed && anncintTlllsmythhhsIconButtonStyles.anncintTlllsmythhhsPressed,
    ]}>
    <Image source={source} />
  </Pressable>
);

const anncintTlllsmythhhsIconButtonStyles = StyleSheet.create({
  anncintTlllsmythhhsDelete: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 26, 26, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(139, 26, 26, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsShare: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1,
    borderColor: '#FA9A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsPressed: {
    opacity: 0.85,
  },
});

const AnncintTlllsmythhhsJourneyBadge = () => (
  <View style={anncintTlllsmythhhsJourneyBadgeStyles.anncintTlllsmythhhsWrap}>
    <Text style={anncintTlllsmythhhsJourneyBadgeStyles.anncintTlllsmythhhsText}>Journey Complete</Text>
  </View>
);

const anncintTlllsmythhhsJourneyBadgeStyles = StyleSheet.create({
  anncintTlllsmythhhsWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(218, 165, 32, 0.3)',
    backgroundColor: 'rgba(218, 165, 32, 0.15)',
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  anncintTlllsmythhhsText: {
    color: '#DAA520',
    fontSize: 18,
    lineHeight: 28,
  },
});

type AnncintTlllsmythhhsOutlineButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const AnncintTlllsmythhhsOutlineAnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnncintTlllsmythhhsOutlineButton = ({label, onPress, style}: AnncintTlllsmythhhsOutlineButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <AnncintTlllsmythhhsOutlineAnimatedPressable
      onPress={onPress}
      onPressIn={() =>
        Animated.spring(scale, {
          toValue: 0.97,
          useNativeDriver: true,
          speed: 28,
          bounciness: 0,
        }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 6,
        }).start()
      }
      style={[anncintTlllsmythhhsOutlineButtonStyles.anncintTlllsmythhhsBtn, style, {transform: [{scale}]}]}>
      <Text style={anncintTlllsmythhhsOutlineButtonStyles.anncintTlllsmythhhsText}>{label}</Text>
    </AnncintTlllsmythhhsOutlineAnimatedPressable>
  );
};

const anncintTlllsmythhhsOutlineButtonStyles = StyleSheet.create({
  anncintTlllsmythhhsBtn: {
    width: '100%',
    minHeight: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  anncintTlllsmythhhsText: {
    color: '#D4A574',
    fontSize: 16,
    fontWeight: '500',
  },
});

type AnncintTlllsmythhhsRegionBadgeProps = {
  region: string;
  muted?: boolean;
  style?: StyleProp<ViewStyle>;
};

const AnncintTlllsmythhhsRegionBadge = ({region, muted, style}: AnncintTlllsmythhhsRegionBadgeProps) => (
  <View style={[muted ? anncintTlllsmythhhsRegionBadgeStyles.anncintTlllsmythhhsMuted : anncintTlllsmythhhsRegionBadgeStyles.anncintTlllsmythhhsBadge, style]}>
    <Text style={muted ? anncintTlllsmythhhsRegionBadgeStyles.anncintTlllsmythhhsMutedText : anncintTlllsmythhhsRegionBadgeStyles.anncintTlllsmythhhsText}>{region}</Text>
  </View>
);

const anncintTlllsmythhhsRegionBadgeStyles = StyleSheet.create({
  anncintTlllsmythhhsBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  anncintTlllsmythhhsMuted: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  anncintTlllsmythhhsText: {
    color: '#0F0804',
    fontSize: 14,
  },
  anncintTlllsmythhhsMutedText: {
    fontSize: 14,
    color: 'rgba(212, 165, 116, 0.6)',
  },
});

type AnncintTlllsmythhhsScreenHeaderProps = {
  title: string;
  subtitle?: string;
  progress?: string;
  compact?: boolean;
};

const AnncintTlllsmythhhsScreenHeader = ({
  title,
  subtitle,
  progress,
  compact,
}: AnncintTlllsmythhhsScreenHeaderProps) => (
  <AnncintTlllsmythhhsFadeInView>
    <View>
      <Text style={compact ? anncintTlllsmythhhsScreenHeaderStyles.anncintTlllsmythhhsTitleCompact : anncintTlllsmythhhsScreenHeaderStyles.anncintTlllsmythhhsTitle}>{title}</Text>
      {subtitle ? <Text style={anncintTlllsmythhhsScreenHeaderStyles.anncintTlllsmythhhsSubtitle}>{subtitle}</Text> : null}
      {progress ? <Text style={anncintTlllsmythhhsScreenHeaderStyles.anncintTlllsmythhhsProgress}>{progress}</Text> : null}
    </View>
  </AnncintTlllsmythhhsFadeInView>
);

const anncintTlllsmythhhsScreenHeaderStyles = StyleSheet.create({
  anncintTlllsmythhhsTitle: {
    color: '#DAA520',
    fontSize: 48,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 25,
  },
  anncintTlllsmythhhsTitleCompact: {
    color: '#DAA520',
    fontSize: 46,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 26,
  },
  anncintTlllsmythhhsSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 16,
  },
  anncintTlllsmythhhsProgress: {
    color: '#D4763E',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
  },
});

type AnncintTlllsmythhhsTextCardProps = {
  children: string;
};

const AnncintTlllsmythhhsTextCard = ({children}: AnncintTlllsmythhhsTextCardProps) => (
  <View style={anncintTlllsmythhhsTextCardStyles.anncintTlllsmythhhsCard}>
    <Text style={anncintTlllsmythhhsTextCardStyles.anncintTlllsmythhhsBody}>{children}</Text>
  </View>
);

const anncintTlllsmythhhsTextCardStyles = StyleSheet.create({
  anncintTlllsmythhhsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  anncintTlllsmythhhsBody: {
    fontSize: 16,
    lineHeight: 27,
    color: '#D4A574',
  },
});

type AnncintTlllsmythhhsStoryListCardProps = {
  story: AnncintTlllsmythhhsChronicleEntry;
  onOpen: () => void;
};

const AnncintTlllsmythhhsStoryListCard = ({story, onOpen}: AnncintTlllsmythhhsStoryListCardProps) => (
  <View style={anncintTlllsmythhhsStoryListCardStyles.anncintTlllsmythhhsCard}>
    <View style={anncintTlllsmythhhsStoryListCardStyles.anncintTlllsmythhhsImageWrap}>
      <ImageBackground
        source={story.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={anncintTlllsmythhhsGradients.storyCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <AnncintTlllsmythhhsRegionBadge region={story.localeTag} style={anncintTlllsmythhhsStoryListCardStyles.anncintTlllsmythhhsBadgePos} />
    </View>
    <View style={anncintTlllsmythhhsStoryListCardStyles.anncintTlllsmythhhsBody}>
      <Text style={anncintTlllsmythhhsStoryListCardStyles.anncintTlllsmythhhsTitle}>{story.headline}</Text>
      <Text style={anncintTlllsmythhhsStoryListCardStyles.anncintTlllsmythhhsDesc}>{story.synopsis}</Text>
      <AnncintTlllsmythhhsGradientButton label="Open" onPress={onOpen} flex />
    </View>
  </View>
);

const anncintTlllsmythhhsStoryListCardStyles = StyleSheet.create({
  anncintTlllsmythhhsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    marginBottom: 16,
  },
  anncintTlllsmythhhsImageWrap: {
    height: 192,
    position: 'relative',
  },
  anncintTlllsmythhhsBadgePos: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  anncintTlllsmythhhsBody: {
    padding: 24,
    gap: 12,
  },
  anncintTlllsmythhhsTitle: {
    color: '#DAA520',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  anncintTlllsmythhhsDesc: {
        color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 27,
    marginBottom: 4,
  },
});

type AnncintTlllsmythhhsCategoryCardProps = {
  category: AnncintTlllsmythhhsJokeCategory;
  onOpen: () => void;
};

const AnncintTlllsmythhhsCategoryCard = ({category, onOpen}: AnncintTlllsmythhhsCategoryCardProps) => (
  <View style={anncintTlllsmythhhsCategoryCardStyles.anncintTlllsmythhhsCard}>
    <View style={anncintTlllsmythhhsCategoryCardStyles.anncintTlllsmythhhsImageWrap}>
      <ImageBackground
        source={category.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={anncintTlllsmythhhsGradients.storyCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <AnncintTlllsmythhhsRegionBadge
        region={category.localeTag}
        style={anncintTlllsmythhhsCategoryCardStyles.anncintTlllsmythhhsBadgePos}
      />
    </View>
    <View style={anncintTlllsmythhhsCategoryCardStyles.anncintTlllsmythhhsBody}>
      <Text style={anncintTlllsmythhhsCategoryCardStyles.anncintTlllsmythhhsTitle}>
        {category.localeTag}
      </Text>
      <Text style={anncintTlllsmythhhsCategoryCardStyles.anncintTlllsmythhhsDesc}>
        {category.teaser}
      </Text>
      <Text style={anncintTlllsmythhhsCategoryCardStyles.anncintTlllsmythhhsCount}>
        {category.jokes.length} jokes
      </Text>
      <AnncintTlllsmythhhsGradientButton label="Open" onPress={onOpen} flex />
    </View>
  </View>
);

const anncintTlllsmythhhsCategoryCardStyles = StyleSheet.create({
  anncintTlllsmythhhsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    marginBottom: 16,
  },
  anncintTlllsmythhhsImageWrap: {
    height: 192,
    position: 'relative',
  },
  anncintTlllsmythhhsBadgePos: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  anncintTlllsmythhhsBody: {
    padding: 24,
    gap: 8,
  },
  anncintTlllsmythhhsTitle: {
    color: '#DAA520',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  anncintTlllsmythhhsDesc: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 27,
  },
  anncintTlllsmythhhsCount: {
    fontSize: 16,
    lineHeight: 27,
    color: 'rgba(212, 165, 116, 0.7)',
    marginBottom: 4,
  },
});

const SaveActionControl = ({
  anncintTlllsmythhhsIsSaved,
  onActivate,
}: {
  anncintTlllsmythhhsIsSaved: boolean;
  onActivate: () => void;
}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsSavePressable,
      pressed && anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsPressedState,
    ]}>
    {anncintTlllsmythhhsIsSaved ? (
      <View style={anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsSaveSurfaceSaved}>
        <Text style={anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsSaveLabelSaved}>
          Saved
        </Text>
      </View>
    ) : (
      <LinearGradient
        colors={anncintTlllsmythhhsGradients.primary}
        start={anncintTlllsmythhhsGradientAxis.horizontal.start}
        end={anncintTlllsmythhhsGradientAxis.horizontal.end}
        style={anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsSaveSurface}>
        <Text style={anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsSaveLabel}>Save</Text>
      </LinearGradient>
    )}
  </Pressable>
);

const ShareActionControl = ({onActivate}: {onActivate: () => void}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsEmitSurface,
      pressed && anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsPressedState,
    ]}>
    <Image source={anncintTlllsmythhhsMediaRegistry.icons.shareButton} />
  </Pressable>
);

type AnncintTlllsmythhhsJokeCardProps = {
  joke: AnncintTlllsmythhhsJokeEntry;
  isSaved: boolean;
  onShare: () => void;
  onToggleSave: () => void;
};

const AnncintTlllsmythhhsJokeCard = ({joke, isSaved, onShare, onToggleSave}: AnncintTlllsmythhhsJokeCardProps) => (
  <View
    style={[
      anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsCard,
      isSaved && anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsCardSaved,
    ]}>
    <Text style={anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsBody}>{joke.body}</Text>
    <View style={anncintTlllsmythhhsJokeCardStyles.anncintTlllsmythhhsToolbar}>
      <SaveActionControl
        anncintTlllsmythhhsIsSaved={isSaved}
        onActivate={onToggleSave}
      />
      <ShareActionControl onActivate={onShare} />
    </View>
  </View>
);

const anncintTlllsmythhhsJokeCardStyles = StyleSheet.create({
  anncintTlllsmythhhsCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    padding: 24,
    gap: 16,
  },
  anncintTlllsmythhhsCardSaved: {
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.3)',
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
  },
  anncintTlllsmythhhsBody: {
    color: '#D4A574',
    fontSize: 16,
    lineHeight: 26,
  },
  anncintTlllsmythhhsToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  anncintTlllsmythhhsSavePressable: {
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
  anncintTlllsmythhhsSaveSurface: {
    minHeight: 48,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsSaveSurfaceSaved: {
    minHeight: 48,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.3)',
  },
  anncintTlllsmythhhsSaveLabel: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsSaveLabelSaved: {
    color: '#DAA520',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsEmitSurface: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 2,
    borderColor: '#FA9A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsPressedState: {
    opacity: 0.85,
  },
});

type AnncintTlllsmythhhsArtifactCardProps = {
  artifact: AnncintTlllsmythhhsRelicProfile;
  width: number;
};

const AnncintTlllsmythhhsArtifactCard = ({artifact, width}: AnncintTlllsmythhhsArtifactCardProps) => (
  <View style={[anncintTlllsmythhhsArtifactCardStyles.anncintTlllsmythhhsCard, {width}]}>
    <View style={anncintTlllsmythhhsArtifactCardStyles.anncintTlllsmythhhsImageWrap}>
      <Image
        source={artifact.coverVisual}
        style={anncintTlllsmythhhsArtifactCardStyles.anncintTlllsmythhhsImage}
        resizeMode="contain"
      />
      <AnncintTlllsmythhhsRegionBadge
        region={artifact.localeTag}
        style={anncintTlllsmythhhsArtifactCardStyles.anncintTlllsmythhhsBadgePos}
      />
    </View>
    <View style={anncintTlllsmythhhsArtifactCardStyles.anncintTlllsmythhhsBody}>
      <Text style={anncintTlllsmythhhsArtifactCardStyles.anncintTlllsmythhhsName}>{artifact.displayName}</Text>
      <Text style={anncintTlllsmythhhsArtifactCardStyles.anncintTlllsmythhhsDesc}>{artifact.synopsis}</Text>
    </View>
  </View>
);

const anncintTlllsmythhhsArtifactCardStyles = StyleSheet.create({
  anncintTlllsmythhhsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    marginBottom: 4,
  },
  anncintTlllsmythhhsImageWrap: {
    height: 148,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  anncintTlllsmythhhsImage: {
    width: '72%',
    height: '88%',
    marginTop: 25,
  },
  anncintTlllsmythhhsBadgePos: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  anncintTlllsmythhhsBody: {
    paddingHorizontal: 12,
    paddingBottom: 14,
    paddingTop: 10,
    gap: 6,
  },
  anncintTlllsmythhhsName: {
    color: '#DAA520',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  anncintTlllsmythhhsDesc: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 10,
    lineHeight: 14,
  },
});

const tileSpan =
  (Dimensions.get('window').width - 48.2 - 12.3) / 2;

type AnncintTlllsmythhhsArtifactGridProps = {
  unlocked: AnncintTlllsmythhhsRelicProfile[];
  locked: AnncintTlllsmythhhsRelicProfile[];
};

const AnncintTlllsmythhhsArtifactGrid = ({unlocked, locked}: AnncintTlllsmythhhsArtifactGridProps) => (
  <>
    {unlocked.length > 0 && (
      <View style={anncintTlllsmythhhsArtifactGridStyles.anncintTlllsmythhhsSection}>
        <Text style={anncintTlllsmythhhsArtifactGridStyles.anncintTlllsmythhhsSectionTitle}>Unlocked</Text>
        <View style={anncintTlllsmythhhsArtifactGridStyles.anncintTlllsmythhhsGrid}>
          {unlocked.map((artifact, index) => (
            <AnncintTlllsmythhhsStaggerItem key={artifact.entryKey} index={index}>
              <AnncintTlllsmythhhsArtifactCard
                artifact={artifact}
                width={tileSpan}
              />
            </AnncintTlllsmythhhsStaggerItem>
          ))}
        </View>
      </View>
    )}
    {locked.length > 0 && (
      <View style={anncintTlllsmythhhsArtifactGridStyles.anncintTlllsmythhhsSection}>
        <Text style={anncintTlllsmythhhsArtifactGridStyles.anncintTlllsmythhhsSectionTitleMuted}>Locked</Text>
        <View style={anncintTlllsmythhhsArtifactGridStyles.anncintTlllsmythhhsGrid}>
          {locked.map((artifact, index) => (
            <AnncintTlllsmythhhsStaggerItem
              key={artifact.entryKey}
              index={unlocked.length + index}>
              <AnncintTlllsmythhhsLockedArtifactCard
                artifact={artifact}
                width={tileSpan}
              />
            </AnncintTlllsmythhhsStaggerItem>
          ))}
        </View>
      </View>
    )}
  </>
);

const anncintTlllsmythhhsArtifactGridStyles = StyleSheet.create({
  anncintTlllsmythhhsSection: {
    marginBottom: 24,
  },
  anncintTlllsmythhhsSectionTitle: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    marginBottom: 16,
  },
  anncintTlllsmythhhsSectionTitleMuted: {
    color: 'rgba(212, 165, 116, 0.5)',
    fontSize: 25,
    fontWeight: '500',
    lineHeight: 32,
    marginBottom: 16,
  },
  anncintTlllsmythhhsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

type AnncintTlllsmythhhsLockedArtifactCardProps = {
  artifact: AnncintTlllsmythhhsRelicProfile;
  width: number;
};

const AnncintTlllsmythhhsLockedArtifactCard = ({artifact, width}: AnncintTlllsmythhhsLockedArtifactCardProps) => (
  <View style={[anncintTlllsmythhhsLockedArtifactCardStyles.anncintTlllsmythhhsCard, {width}]}>
    <View style={anncintTlllsmythhhsLockedArtifactCardStyles.anncintTlllsmythhhsImageWrap}>
      <Image
        source={artifact.coverVisual}
        style={anncintTlllsmythhhsLockedArtifactCardStyles.anncintTlllsmythhhsImage}
        resizeMode="cover"
      />
      <View style={anncintTlllsmythhhsLockedArtifactCardStyles.anncintTlllsmythhhsOverlay}>
        <Image source={anncintTlllsmythhhsMediaRegistry.icons.lock} />
      </View>
      <AnncintTlllsmythhhsRegionBadge
        region={artifact.localeTag}
        muted
        style={anncintTlllsmythhhsLockedArtifactCardStyles.anncintTlllsmythhhsBadgePos}
      />
    </View>
    <View style={anncintTlllsmythhhsLockedArtifactCardStyles.anncintTlllsmythhhsBody}>
      <Text style={anncintTlllsmythhhsLockedArtifactCardStyles.anncintTlllsmythhhsName}>{artifact.displayName}</Text>
      <Text style={anncintTlllsmythhhsLockedArtifactCardStyles.anncintTlllsmythhhsHint}>
        {artifact.insightsThreshold} more progress needed
      </Text>
    </View>
  </View>
);

const anncintTlllsmythhhsLockedArtifactCardStyles = StyleSheet.create({
  anncintTlllsmythhhsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.2)',
    opacity: 0.6,
    marginBottom: 4,
  },
  anncintTlllsmythhhsImageWrap: {
    height: 128,
    position: 'relative',
  },
  anncintTlllsmythhhsImage: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  anncintTlllsmythhhsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsBadgePos: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  anncintTlllsmythhhsBody: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 4,
  },
  anncintTlllsmythhhsName: {
    color: 'rgba(212, 165, 116, 0.4)',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  anncintTlllsmythhhsHint: {
    color: 'rgba(212, 165, 116, 0.4)',
    fontSize: 12,
    lineHeight: 16,
  },
});

type AnncintTlllsmythhhsAppLayoutProps = {
  children: React.ReactNode;
  bounce?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  tab?: boolean;
};

const AnncintTlllsmythhhsAppLayout = ({
  children,
  bounce = true,
  contentStyle,
  tab = false,
}: AnncintTlllsmythhhsAppLayoutProps) => (
  <ImageBackground
    source={anncintTlllsmythhhsMediaRegistry.backgrounds.app}
    style={anncintTlllsmythhhsAppLayoutStyles.anncintTlllsmythhhsBg}>
    <View style={anncintTlllsmythhhsAppLayoutStyles.anncintTlllsmythhhsOverlay} />
    <ScrollView
      bounces={bounce}
      contentContainerStyle={[
        tab ? anncintTlllsmythhhsAppLayoutStyles.anncintTlllsmythhhsScrollTab : anncintTlllsmythhhsAppLayoutStyles.anncintTlllsmythhhsScroll,
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </ImageBackground>
);

const anncintTlllsmythhhsAppLayoutStyles = StyleSheet.create({
  anncintTlllsmythhhsBg: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  anncintTlllsmythhhsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  anncintTlllsmythhhsScroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 32,
  },
  anncintTlllsmythhhsScrollTab: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 33,
    paddingBottom: 100,
  },
});

export {
  AnncintTlllsmythhhsAnimatedProgressBar,
  AnncintTlllsmythhhsBookPageLoader,
  AnncintTlllsmythhhsFadeInView,
  AnncintTlllsmythhhsStaggerItem,
  AnncintTlllsmythhhsTypewriterText,
  AnncintTlllsmythhhsBackButton,
  AnncintTlllsmythhhsConfirmModal,
  AnncintTlllsmythhhsGradientButton,
  AnncintTlllsmythhhsIconButton,
  AnncintTlllsmythhhsJourneyBadge,
  AnncintTlllsmythhhsOutlineButton,
  AnncintTlllsmythhhsRegionBadge,
  AnncintTlllsmythhhsScreenHeader,
  AnncintTlllsmythhhsTextCard,
  AnncintTlllsmythhhsStoryListCard,
  AnncintTlllsmythhhsCategoryCard,
  AnncintTlllsmythhhsJokeCard,
  AnncintTlllsmythhhsArtifactCard,
  AnncintTlllsmythhhsArtifactGrid,
  AnncintTlllsmythhhsLockedArtifactCard,
  AnncintTlllsmythhhsAppLayout,
};
export default AnncintTlllsmythhhsAppLayout;
