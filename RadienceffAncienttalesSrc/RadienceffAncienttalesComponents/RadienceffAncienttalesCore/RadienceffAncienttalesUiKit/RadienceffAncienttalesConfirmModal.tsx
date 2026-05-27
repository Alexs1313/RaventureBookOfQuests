import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {radienceffAncienttalesAnimationDurations} from '../RadienceffAncienttalesLoungeKit/RadienceffAncienttalesAnimations';
import {radienceffAncienttalesMediaRegistry} from '../RadienceffAncienttalesAssets';
import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesGradientAxis} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesConfirmModalProps = {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  showClose?: boolean;
};

const RadienceffAncienttalesConfirmModal = ({
  visible,
  title,
  body,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  showClose,
}: RadienceffAncienttalesConfirmModalProps) => {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.92)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: radienceffAncienttalesAnimationDurations.fast,
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
          duration: radienceffAncienttalesAnimationDurations.normal,
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
      <Animated.View style={[radienceffAncienttalesStyles.radienceffAncienttalesOverlay, {opacity: overlayOpacity}]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <Animated.View
          style={[
            radienceffAncienttalesStyles.radienceffAncienttalesModal,
            {
              opacity: modalOpacity,
              transform: [{scale: modalScale}],
            },
          ]}>
          {showClose ? (
            <Pressable onPress={onCancel} style={radienceffAncienttalesStyles.radienceffAncienttalesClose}>
              <Image source={radienceffAncienttalesMediaRegistry.icons.close} />
            </Pressable>
          ) : null}
          <Text style={[radienceffAncienttalesStyles.radienceffAncienttalesTitle, showClose && radienceffAncienttalesStyles.radienceffAncienttalesTitleWithClose]}>
            {title}
          </Text>
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesBody}>{body}</Text>
          <Pressable
            onPress={onConfirm}
            style={({pressed}) => [
              radienceffAncienttalesStyles.radienceffAncienttalesConfirmPress,
              pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressed,
            ]}>
            <LinearGradient
              colors={radienceffAncienttalesGradients.danger}
              start={radienceffAncienttalesGradientAxis.horizontal.start}
              end={radienceffAncienttalesGradientAxis.horizontal.end}
              style={radienceffAncienttalesStyles.radienceffAncienttalesConfirmBtn}>
              <Text style={radienceffAncienttalesStyles.radienceffAncienttalesConfirmText}>{confirmLabel}</Text>
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={onCancel}
            style={({pressed}) => [
              radienceffAncienttalesStyles.radienceffAncienttalesCancelBtn,
              pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressed,
            ]}>
            <Text style={radienceffAncienttalesStyles.radienceffAncienttalesCancelText}>{cancelLabel}</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesOverlay: {
    flex: 1,
    backgroundColor: radienceffAncienttalesColors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.3,
  },
  radienceffAncienttalesModal: {
    width: '100%',
    maxWidth: 361.2,
    borderRadius: 16.4,
    borderWidth: 1.3,
    borderColor: radienceffAncienttalesColors.borderMedium,
    backgroundColor: radienceffAncienttalesColors.surface,
    paddingHorizontal: 24.3,
    paddingTop: 24.4,
    paddingBottom: 24.2,
    gap: 12.4,
  },
  radienceffAncienttalesClose: {
    position: 'absolute',
    top: 16.2,
    right: 16.3,
    width: 24.2,
    height: 24.4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  radienceffAncienttalesTitle: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 18.3,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4.2,
  },
  radienceffAncienttalesTitleWithClose: {
    marginTop: 8.3,
  },
  radienceffAncienttalesBody: {
    color: radienceffAncienttalesColors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 24.3,
    textAlign: 'center',
    marginBottom: 8.2,
  },
  radienceffAncienttalesConfirmPress: {
    borderRadius: 14.3,
    overflow: 'hidden',
  },
  radienceffAncienttalesConfirmBtn: {
    minHeight: 36.4,
    borderRadius: 14.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8.3,
  },
  radienceffAncienttalesConfirmText: {
    color: radienceffAncienttalesColors.text,
    fontSize: 14.3,
    fontWeight: '500',
  },
  radienceffAncienttalesCancelBtn: {
    minHeight: 38.2,
    borderRadius: 14.4,
    borderWidth: 1.2,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.2,
  },
  radienceffAncienttalesCancelText: {
    color: radienceffAncienttalesColors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  radienceffAncienttalesPressed: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesConfirmModal;
