import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {colors, spacing} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

type AppLayoutProps = {
  children: React.ReactNode;
  bounce?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  tab?: boolean;
};

const AppLayout = ({
  children,
  bounce = true,
  contentStyle,
  tab = false,
}: AppLayoutProps) => (
  <LinearGradient
    colors={['rgb(153, 83, 3)', 'rgb(31, 17, 1)']}
    style={styles.bg}>
    <View style={styles.overlay} />
    <ScrollView
      bounces={bounce}
      contentContainerStyle={[
        tab ? styles.scrollTab : styles.scroll,
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.layoutPaddingX,
    paddingTop: spacing.layoutPaddingTop,
    paddingBottom: spacing.layoutPaddingBottom,
  },
  scrollTab: {
    flexGrow: 1,
    paddingHorizontal: spacing.layoutPaddingX,
    paddingTop: spacing.tabPaddingTop,
    paddingBottom: spacing.tabPaddingBottom,
  },
});

export default AppLayout;
