import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

const RaventreBookqueslayout = ({
  children,
  bounce = true,
  contentStyle,
  raventreBookquesttsTab = false,
}: {
  children: React.ReactNode;
  bounce?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  raventreBookquesttsTab?: boolean;
}) => {
  return (
    <ImageBackground
      source={require('../../assets/img/raventrebooappbk.png')}
      style={styles.raventreBookqueslayoutBg}>
      <View style={styles.raventreBookqueslayoutOverlay} />
      <ScrollView
        bounces={bounce}
        contentContainerStyle={[
          raventreBookquesttsTab
            ? styles.raventreBookqueslayoutScrollTab
            : styles.raventreBookqueslayoutScroll,
          contentStyle,
        ]}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  raventreBookqueslayoutBg: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  raventreBookqueslayoutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  raventreBookqueslayoutScroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 32,
  },
  raventreBookqueslayoutScrollTab: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100,
  },
});

export default RaventreBookqueslayout;
