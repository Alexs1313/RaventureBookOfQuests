import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {AppLayout, FadeInView, ScreenHeader} from '../../shared/components';
import {ArtifactGrid} from './components';
import {ravenQuestArtifacts} from '../../../content/artifacts';
import type {RavenQuestArtifact} from '../../shared/types';
import {
  ravenQuestCountLabel,
  ravenQuestGetQuizPoints,
  ravenQuestIsArtifactUnlocked,
} from '../../shared/lib';

const ArtifactsScreen = () => {
  const [ravenQuestPoints, setRavenQuestPoints] = useState(0);

  const ravenQuestReload = useCallback(async () => {
    setRavenQuestPoints(await ravenQuestGetQuizPoints());
  }, []);

  useFocusEffect(
    useCallback(() => {
      ravenQuestReload();
    }, [ravenQuestReload]),
  );

  const {unlocked, locked} = useMemo(() => {
    const unlockedList: RavenQuestArtifact[] = [];
    const lockedList: RavenQuestArtifact[] = [];

    ravenQuestArtifacts.forEach(artifact => {
      if (ravenQuestIsArtifactUnlocked(artifact, ravenQuestPoints)) {
        unlockedList.push(artifact);
      } else {
        lockedList.push(artifact);
      }
    });

    return {unlocked: unlockedList, locked: lockedList};
  }, [ravenQuestPoints]);

  return (
    <AppLayout tab>
      <ScreenHeader
        title="Artifacts"
        subtitle="Your collected treasures"
        progress={ravenQuestCountLabel(
          ravenQuestPoints,
          'Point Obtained',
          'Insights Collected',
        )}
      />
      <FadeInView triggerKey={ravenQuestPoints}>
        <ArtifactGrid unlocked={unlocked} locked={locked} />
      </FadeInView>
    </AppLayout>
  );
};

export default ArtifactsScreen;
