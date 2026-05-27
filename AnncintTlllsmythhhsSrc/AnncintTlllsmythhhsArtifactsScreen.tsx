import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {AnncintTlllsmythhhsAppLayout, AnncintTlllsmythhhsFadeInView, AnncintTlllsmythhhsScreenHeader} from './AnncintTlllsmythhhsUi';
import {AnncintTlllsmythhhsArtifactGrid} from './AnncintTlllsmythhhsUi';
import {anncintTlllsmythhhsRelicCatalog} from './AnncintTlllsmythhhsCore';
import type {AnncintTlllsmythhhsRelicProfile} from './AnncintTlllsmythhhsCore';
import {
  anncintTlllsmythhhsFormatUnitLabel,
  anncintTlllsmythhhsFetchInsightBalance,
  anncintTlllsmythhhsRelicIsAccessible,
} from './AnncintTlllsmythhhsCore';

const AnncintTlllsmythhhsArtifactsScreen = () => {
  const [anncintTlllsmythhhsInsightBalance, setAnncintTlllsmythhhsInsightBalance] = useState(0);

  const refreshSnapshot = useCallback(async () => {
    setAnncintTlllsmythhhsInsightBalance(await anncintTlllsmythhhsFetchInsightBalance());
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const {unlocked, locked} = useMemo(() => {
    const unlockedList: AnncintTlllsmythhhsRelicProfile[] = [];
    const lockedList: AnncintTlllsmythhhsRelicProfile[] = [];

    anncintTlllsmythhhsRelicCatalog.forEach(artifact => {
      if (anncintTlllsmythhhsRelicIsAccessible(artifact, anncintTlllsmythhhsInsightBalance)) {
        unlockedList.push(artifact);
      } else {
        lockedList.push(artifact);
      }
    });

    return {unlocked: unlockedList, locked: lockedList};
  }, [anncintTlllsmythhhsInsightBalance]);

  return (
    <AnncintTlllsmythhhsAppLayout tab>
      <AnncintTlllsmythhhsScreenHeader
        title="Artifacts"
        subtitle="Your collected artifacts"
        progress={anncintTlllsmythhhsFormatUnitLabel(
          anncintTlllsmythhhsInsightBalance,
          'progress point',
          'progress points collected',
        )}
      />
      <AnncintTlllsmythhhsFadeInView triggerKey={anncintTlllsmythhhsInsightBalance}>
        <AnncintTlllsmythhhsArtifactGrid unlocked={unlocked} locked={locked} />
      </AnncintTlllsmythhhsFadeInView>
    </AnncintTlllsmythhhsAppLayout>
  );
};

export default AnncintTlllsmythhhsArtifactsScreen;
