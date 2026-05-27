import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {RadienceffAncienttalesAppLayout, RadienceffAncienttalesFadeInView, RadienceffAncienttalesScreenHeader} from '../RadienceffAncienttalesComponents';
import {RadienceffAncienttalesArtifactGrid} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesArtifacts';
import {radienceffAncienttalesRelicCatalog} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesData/RadienceffAncienttalesArtifacts';
import type {RadienceffAncienttalesRelicProfile} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesTypes';
import {
  radienceffAncienttalesFormatUnitLabel,
  radienceffAncienttalesFetchInsightBalance,
  radienceffAncienttalesRelicIsAccessible,
} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesLoungeKit';

const RadienceffAncienttalesArtifactsScreen = () => {
  const [radienceffAncienttalesInsightBalance, setRadienceffAncienttalesInsightBalance] = useState(0);

  const refreshSnapshot = useCallback(async () => {
    setRadienceffAncienttalesInsightBalance(await radienceffAncienttalesFetchInsightBalance());
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const {unlocked, locked} = useMemo(() => {
    const unlockedList: RadienceffAncienttalesRelicProfile[] = [];
    const lockedList: RadienceffAncienttalesRelicProfile[] = [];

    radienceffAncienttalesRelicCatalog.forEach(artifact => {
      if (radienceffAncienttalesRelicIsAccessible(artifact, radienceffAncienttalesInsightBalance)) {
        unlockedList.push(artifact);
      } else {
        lockedList.push(artifact);
      }
    });

    return {unlocked: unlockedList, locked: lockedList};
  }, [radienceffAncienttalesInsightBalance]);

  return (
    <RadienceffAncienttalesAppLayout tab>
      <RadienceffAncienttalesScreenHeader
        title="Artifacts"
        subtitle="Your collected artifacts"
        progress={radienceffAncienttalesFormatUnitLabel(
          radienceffAncienttalesInsightBalance,
          'progress point',
          'progress points collected',
        )}
      />
      <RadienceffAncienttalesFadeInView triggerKey={radienceffAncienttalesInsightBalance}>
        <RadienceffAncienttalesArtifactGrid unlocked={unlocked} locked={locked} />
      </RadienceffAncienttalesFadeInView>
    </RadienceffAncienttalesAppLayout>
  );
};

export default RadienceffAncienttalesArtifactsScreen;
