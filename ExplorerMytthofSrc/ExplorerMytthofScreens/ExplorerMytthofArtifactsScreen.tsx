import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {AppLayout, FadeInView, ScreenHeader} from '../ExplorerMytthofComponents';
import {ArtifactGrid} from '../ExplorerMytthofComponents/ExplorerMytthofArtifacts';
import {relicCatalog} from '../ExplorerMytthofData/ExplorerMytthofArtifacts';
import type {RelicProfile} from '../ExplorerMytthofTypes';
import {
  formatUnitLabel,
  fetchInsightBalance,
  relicIsAccessible,
} from '../ExplorerMytthofLoungeKit';

const ArtifactsScreen = () => {
  const [explorerMytthofInsightBalance, setExplorerMytthofInsightBalance] = useState(0);

  const refreshSnapshot = useCallback(async () => {
    setExplorerMytthofInsightBalance(await fetchInsightBalance());
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
      if (relicIsAccessible(artifact, explorerMytthofInsightBalance)) {
        unlockedList.push(artifact);
      } else {
        lockedList.push(artifact);
      }
    });

    return {unlocked: unlockedList, locked: lockedList};
  }, [explorerMytthofInsightBalance]);

  return (
    <AppLayout tab>
      <ScreenHeader
        title="Artifacts"
        subtitle="Your collected artifacts"
        progress={formatUnitLabel(
          explorerMytthofInsightBalance,
          'Point Obtained',
          'Insights Collected',
        )}
      />
      <FadeInView triggerKey={explorerMytthofInsightBalance}>
        <ArtifactGrid unlocked={unlocked} locked={locked} />
      </FadeInView>
    </AppLayout>
  );
};

export default ArtifactsScreen;
