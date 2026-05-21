import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {AppLayout, ScreenHeader} from '../../shared/components';
import {ArtifactGrid} from './components';
import {legendsaventurebkkArtifacts} from '../../content/artifacts';
import type {LegendsaventurebkkArtifact} from '../../shared/types';
import {
  legendsaventurebkkCountLabel,
  legendsaventurebkkGetQuizPoints,
  legendsaventurebkkIsArtifactUnlocked,
} from '../../shared/lib';

const ArtifactsScreen = () => {
  const [legendsaventurebkkPoints, setLegendsaventurebkkPoints] = useState(0);

  const legendsaventurebkkReload = useCallback(async () => {
    setLegendsaventurebkkPoints(await legendsaventurebkkGetQuizPoints());
  }, []);

  useFocusEffect(
    useCallback(() => {
      legendsaventurebkkReload();
    }, [legendsaventurebkkReload]),
  );

  const {unlocked, locked} = useMemo(() => {
    const unlockedList: LegendsaventurebkkArtifact[] = [];
    const lockedList: LegendsaventurebkkArtifact[] = [];

    legendsaventurebkkArtifacts.forEach(artifact => {
      if (legendsaventurebkkIsArtifactUnlocked(artifact, legendsaventurebkkPoints)) {
        unlockedList.push(artifact);
      } else {
        lockedList.push(artifact);
      }
    });

    return {unlocked: unlockedList, locked: lockedList};
  }, [legendsaventurebkkPoints]);

  return (
    <AppLayout tab>
      <ScreenHeader
        title="Artifacts"
        subtitle="Your collected treasures"
        progress={legendsaventurebkkCountLabel(
          legendsaventurebkkPoints,
          'Point Obtained',
          'Insights Collected',
        )}
      />
      <ArtifactGrid unlocked={unlocked} locked={locked} />
    </AppLayout>
  );
};

export default ArtifactsScreen;
