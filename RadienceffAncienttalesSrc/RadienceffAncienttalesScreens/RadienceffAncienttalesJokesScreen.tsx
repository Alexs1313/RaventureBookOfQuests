import React, {useCallback, useMemo, useState} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {radienceffAncienttalesJokeCategories, radienceffAncienttalesResolveJokeCategory} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesData/RadienceffAncienttalesJokes';
import {RadienceffAncienttalesCategoryCard, RadienceffAncienttalesJokeCard} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesJokes';
import {
  RadienceffAncienttalesAppLayout,
  RadienceffAncienttalesBackButton,
  RadienceffAncienttalesFadeInView,
  RadienceffAncienttalesScreenHeader,
  RadienceffAncienttalesStaggerItem,
} from '../RadienceffAncienttalesComponents';
import type {RadienceffAncienttalesJokesPhase, RadienceffAncienttalesMythLocale} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesTypes';
import {
  radienceffAncienttalesComposeJokeShare,
  radienceffAncienttalesDiscardJoke,
  radienceffAncienttalesLoadSavedJokeKeys,
  radienceffAncienttalesPersistJoke,
} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesLoungeKit';

const RadienceffAncienttalesJokesScreen = () => {
  const [radienceffAncienttalesScreenPhase, setRadienceffAncienttalesScreenPhase] =
    useState<RadienceffAncienttalesJokesPhase>('catalog');
  const [radienceffAncienttalesActiveLocale, setRadienceffAncienttalesActiveLocale] =
    useState<RadienceffAncienttalesMythLocale | null>(null);
  const [radienceffAncienttalesSavedKeys, setRadienceffAncienttalesSavedKeys] = useState<
    Set<string>
  >(new Set());

  const radienceffAncienttalesRefreshSavedKeys = useCallback(async () => {
    const keys = await radienceffAncienttalesLoadSavedJokeKeys();
    setRadienceffAncienttalesSavedKeys(new Set(keys));
  }, []);

  useFocusEffect(
    useCallback(() => {
      void radienceffAncienttalesRefreshSavedKeys();
    }, [radienceffAncienttalesRefreshSavedKeys]),
  );

  const radienceffAncienttalesActiveCategory = useMemo(
    () =>
      radienceffAncienttalesActiveLocale
        ? radienceffAncienttalesResolveJokeCategory(radienceffAncienttalesActiveLocale)
        : undefined,
    [radienceffAncienttalesActiveLocale],
  );

  const radienceffAncienttalesOpenCategory = useCallback((localeTag: RadienceffAncienttalesMythLocale) => {
    setRadienceffAncienttalesActiveLocale(localeTag);
    setRadienceffAncienttalesScreenPhase('detail');
  }, []);

  const radienceffAncienttalesReturnToCatalog = useCallback(() => {
    setRadienceffAncienttalesScreenPhase('catalog');
    setRadienceffAncienttalesActiveLocale(null);
  }, []);

  const radienceffAncienttalesEmitJokeShare = useCallback(
    async (localeTag: RadienceffAncienttalesMythLocale, body: string) => {
      await Share.share({
        message: radienceffAncienttalesComposeJokeShare(localeTag, body),
      });
    },
    [],
  );

  const radienceffAncienttalesToggleJokeSave = useCallback(
    async (jokeKey: string) => {
      if (radienceffAncienttalesSavedKeys.has(jokeKey)) {
        await radienceffAncienttalesDiscardJoke(jokeKey);
      } else {
        await radienceffAncienttalesPersistJoke(jokeKey);
      }
      await radienceffAncienttalesRefreshSavedKeys();
    },
    [radienceffAncienttalesRefreshSavedKeys, radienceffAncienttalesSavedKeys],
  );

  if (
    radienceffAncienttalesScreenPhase === 'detail' &&
    radienceffAncienttalesActiveCategory
  ) {
    return (
      <RadienceffAncienttalesAppLayout tab>
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesDetailHeader}>
          <RadienceffAncienttalesBackButton onPress={radienceffAncienttalesReturnToCatalog} />
        </View>
        <RadienceffAncienttalesScreenHeader
          title={radienceffAncienttalesActiveCategory.localeTag}
          subtitle="Mythology humor"
          compact
        />
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesJokeStack}>
          {radienceffAncienttalesActiveCategory.jokes.map((joke, index) => (
            <RadienceffAncienttalesStaggerItem key={joke.jokeKey} index={index}>
              <RadienceffAncienttalesJokeCard
                joke={joke}
                isSaved={radienceffAncienttalesSavedKeys.has(joke.jokeKey)}
                onShare={() =>
                  void radienceffAncienttalesEmitJokeShare(joke.localeTag, joke.body)
                }
                onToggleSave={() =>
                  void radienceffAncienttalesToggleJokeSave(joke.jokeKey)
                }
              />
            </RadienceffAncienttalesStaggerItem>
          ))}
        </View>
      </RadienceffAncienttalesAppLayout>
    );
  }

  return (
    <RadienceffAncienttalesAppLayout tab>
      <RadienceffAncienttalesScreenHeader
        title="Jokes"
        subtitle="Laugh through four ancient kingdoms"
        compact
      />
      {radienceffAncienttalesJokeCategories.map((category, index) => (
        <RadienceffAncienttalesFadeInView key={category.localeTag} delay={index * 80}>
          <RadienceffAncienttalesCategoryCard
            category={category}
            onOpen={() => radienceffAncienttalesOpenCategory(category.localeTag)}
          />
        </RadienceffAncienttalesFadeInView>
      ))}
    </RadienceffAncienttalesAppLayout>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesDetailHeader: {
    marginTop: 50.5,
    marginBottom: 8.3,
  },
  radienceffAncienttalesJokeStack: {
    gap: 16.1,
    paddingBottom: 16.2,
  },
});

export default RadienceffAncienttalesJokesScreen;
