import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {AppLayout, FadeInView, ScreenHeader} from '../components';
import {ArtifactGrid} from '../components/artifacts';
import {relicCatalog} from '../data/artifacts';
import type {RelicProfile} from '../types';
import {
  formatUnitLabel,
  fetchInsightBalance,
  relicIsAccessible,
} from '../loungeKit';

const ArtifactsScreen = () => {
  const [insightBalance, setInsightBalance] = useState(0);

  const refreshSnapshot = useCallback(async () => {
    setInsightBalance(await fetchInsightBalance());
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const {unlocked, locked} = useMemo(() => {
    const unlockedList: RelicProfile[] = [];
    const lockedList: RelicProfile[] = [];

    relicCatalog.forEach(artifact => {
      if (relicIsAccessible(artifact, insightBalance)) {
        unlockedList.push(artifact);
      } else {
        lockedList.push(artifact);
      }
    });

    return {unlocked: unlockedList, locked: lockedList};
  }, [insightBalance]);

  return (
    <AppLayout tab>
      <ScreenHeader
        title="Artifacts"
        subtitle="Your collected artifacts"
        progress={formatUnitLabel(
          insightBalance,
          'Point Obtained',
          'Insights Collected',
        )}
      />
      <FadeInView triggerKey={insightBalance}>
        <ArtifactGrid unlocked={unlocked} locked={locked} />
      </FadeInView>
    </AppLayout>
  );
};

export default ArtifactsScreen;
