import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {ArtifactGrid, AppLayout, ScreenHeader} from '../components';
import {legendsaventurebkkArtifacts} from '../data/legendsaventurebkkArtifactsData';
import type {LegendsaventurebkkArtifact} from '../types';
import {
  legendsaventurebkkCountLabel,
  legendsaventurebkkGetQuizPoints,
  legendsaventurebkkIsArtifactUnlocked,
} from '../utils';

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
          'Points Obtained',
        )}
      />
      <ArtifactGrid unlocked={unlocked} locked={locked} />
    </AppLayout>
  );
};

export default ArtifactsScreen;
