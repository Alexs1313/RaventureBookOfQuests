import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {legendsaventurebkkAssets} from '../../constants';
import {colors, gradients, gradientAxis} from '../../theme';

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  showClose?: boolean;
};

const ConfirmModal = ({
  visible,
  title,
  body,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  showClose,
}: ConfirmModalProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onCancel}>
    <Pressable style={styles.overlay} onPress={onCancel}>
      <Pressable style={styles.modal} onPress={e => e.stopPropagation()}>
        {showClose ? (
          <Pressable onPress={onCancel} style={styles.close}>
            <Image source={legendsaventurebkkAssets.icons.close} />
          </Pressable>
        ) : null}
        <Text style={[styles.title, showClose && styles.titleWithClose]}>
          {title}
        </Text>
        <Text style={styles.body}>{body}</Text>
        <Pressable
          onPress={onConfirm}
          style={({pressed}) => [
            styles.confirmPress,
            pressed && styles.pressed,
          ]}>
          <LinearGradient
            colors={gradients.danger}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={styles.confirmBtn}>
            <Text style={styles.confirmText}>{confirmLabel}</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={onCancel}
          style={({pressed}) => [
            styles.cancelBtn,
            pressed && styles.pressed,
          ]}>
          <Text style={styles.cancelText}>{cancelLabel}</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.3,
  },
  modal: {
    width: '100%',
    maxWidth: 361.2,
    borderRadius: 16.4,
    borderWidth: 1.3,
    borderColor: colors.borderMedium,
    backgroundColor: colors.surface,
    paddingHorizontal: 24.3,
    paddingTop: 24.4,
    paddingBottom: 24.2,
    gap: 12.4,
  },
  close: {
    position: 'absolute',
    top: 16.2,
    right: 16.3,
    width: 24.2,
    height: 24.4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    color: colors.gold,
    fontSize: 18.3,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4.2,
  },
  titleWithClose: {
    marginTop: 8.3,
  },
  body: {
    color: colors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 24.3,
    textAlign: 'center',
    marginBottom: 8.2,
  },
  confirmPress: {
    borderRadius: 14.3,
    overflow: 'hidden',
  },
  confirmBtn: {
    minHeight: 36.4,
    borderRadius: 14.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8.3,
  },
  confirmText: {
    color: colors.text,
    fontSize: 14.3,
    fontWeight: '500',
  },
  cancelBtn: {
    minHeight: 38.2,
    borderRadius: 14.4,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.2,
  },
  cancelText: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.85,
  },
});

export default ConfirmModal;
