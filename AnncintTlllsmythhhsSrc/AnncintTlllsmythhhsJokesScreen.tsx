import React, {useCallback, useMemo, useState} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {anncintTlllsmythhhsJokeCategories, anncintTlllsmythhhsResolveJokeCategory} from './AnncintTlllsmythhhsCore';
import {AnncintTlllsmythhhsCategoryCard, AnncintTlllsmythhhsJokeCard} from './AnncintTlllsmythhhsUi';
import {
  AnncintTlllsmythhhsAppLayout,
  AnncintTlllsmythhhsBackButton,
  AnncintTlllsmythhhsFadeInView,
  AnncintTlllsmythhhsScreenHeader,
  AnncintTlllsmythhhsStaggerItem,
} from './AnncintTlllsmythhhsUi';
import type {AnncintTlllsmythhhsJokesPhase, AnncintTlllsmythhhsMythLocale} from './AnncintTlllsmythhhsCore';
import {
  anncintTlllsmythhhsComposeJokeShare,
  anncintTlllsmythhhsDiscardJoke,
  anncintTlllsmythhhsLoadSavedJokeKeys,
  anncintTlllsmythhhsPersistJoke,
} from './AnncintTlllsmythhhsCore';

const AnncintTlllsmythhhsJokesScreen = () => {
  const [anncintTlllsmythhhsScreenPhase, setAnncintTlllsmythhhsScreenPhase] =
    useState<AnncintTlllsmythhhsJokesPhase>('catalog');
  const [anncintTlllsmythhhsActiveLocale, setAnncintTlllsmythhhsActiveLocale] =
    useState<AnncintTlllsmythhhsMythLocale | null>(null);
  const [anncintTlllsmythhhsSavedKeys, setAnncintTlllsmythhhsSavedKeys] = useState<
    Set<string>
  >(new Set());

  const anncintTlllsmythhhsRefreshSavedKeys = useCallback(async () => {
    const keys = await anncintTlllsmythhhsLoadSavedJokeKeys();
    setAnncintTlllsmythhhsSavedKeys(new Set(keys));
  }, []);

  useFocusEffect(
    useCallback(() => {
      void anncintTlllsmythhhsRefreshSavedKeys();
    }, [anncintTlllsmythhhsRefreshSavedKeys]),
  );

  const anncintTlllsmythhhsActiveCategory = useMemo(
    () =>
      anncintTlllsmythhhsActiveLocale
        ? anncintTlllsmythhhsResolveJokeCategory(anncintTlllsmythhhsActiveLocale)
        : undefined,
    [anncintTlllsmythhhsActiveLocale],
  );

  const anncintTlllsmythhhsOpenCategory = useCallback((localeTag: AnncintTlllsmythhhsMythLocale) => {
    setAnncintTlllsmythhhsActiveLocale(localeTag);
    setAnncintTlllsmythhhsScreenPhase('detail');
  }, []);

  const anncintTlllsmythhhsReturnToCatalog = useCallback(() => {
    setAnncintTlllsmythhhsScreenPhase('catalog');
    setAnncintTlllsmythhhsActiveLocale(null);
  }, []);

  const anncintTlllsmythhhsEmitJokeShare = useCallback(
    async (localeTag: AnncintTlllsmythhhsMythLocale, body: string) => {
      await Share.share({
        message: anncintTlllsmythhhsComposeJokeShare(localeTag, body),
      });
    },
    [],
  );

  const anncintTlllsmythhhsToggleJokeSave = useCallback(
    async (jokeKey: string) => {
      if (anncintTlllsmythhhsSavedKeys.has(jokeKey)) {
        await anncintTlllsmythhhsDiscardJoke(jokeKey);
      } else {
        await anncintTlllsmythhhsPersistJoke(jokeKey);
      }
      await anncintTlllsmythhhsRefreshSavedKeys();
    },
    [anncintTlllsmythhhsRefreshSavedKeys, anncintTlllsmythhhsSavedKeys],
  );

  if (
    anncintTlllsmythhhsScreenPhase === 'detail' &&
    anncintTlllsmythhhsActiveCategory
  ) {
    return (
      <AnncintTlllsmythhhsAppLayout tab>
        <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsDetailHeader}>
          <AnncintTlllsmythhhsBackButton onPress={anncintTlllsmythhhsReturnToCatalog} />
        </View>
        <AnncintTlllsmythhhsScreenHeader
          title={anncintTlllsmythhhsActiveCategory.localeTag}
          subtitle="Mythology humor"
          compact
        />
        <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsJokeStack}>
          {anncintTlllsmythhhsActiveCategory.jokes.map((joke, index) => (
            <AnncintTlllsmythhhsStaggerItem key={joke.jokeKey} index={index}>
              <AnncintTlllsmythhhsJokeCard
                joke={joke}
                isSaved={anncintTlllsmythhhsSavedKeys.has(joke.jokeKey)}
                onShare={() =>
                  void anncintTlllsmythhhsEmitJokeShare(joke.localeTag, joke.body)
                }
                onToggleSave={() =>
                  void anncintTlllsmythhhsToggleJokeSave(joke.jokeKey)
                }
              />
            </AnncintTlllsmythhhsStaggerItem>
          ))}
        </View>
      </AnncintTlllsmythhhsAppLayout>
    );
  }

  return (
    <AnncintTlllsmythhhsAppLayout tab>
      <AnncintTlllsmythhhsScreenHeader
        title="Jokes"
        subtitle="Laugh through four ancient kingdoms"
        compact
      />
      {anncintTlllsmythhhsJokeCategories.map((category, index) => (
        <AnncintTlllsmythhhsFadeInView key={category.localeTag} delay={index * 80}>
          <AnncintTlllsmythhhsCategoryCard
            category={category}
            onOpen={() => anncintTlllsmythhhsOpenCategory(category.localeTag)}
          />
        </AnncintTlllsmythhhsFadeInView>
      ))}
    </AnncintTlllsmythhhsAppLayout>
  );
};

const anncintTlllsmythhhsStyles = StyleSheet.create({
  anncintTlllsmythhhsDetailHeader: {
    marginTop: 50,
    marginBottom: 8,
  },
  anncintTlllsmythhhsJokeStack: {
    gap: 16,
    paddingBottom: 16,
  },
});

export default AnncintTlllsmythhhsJokesScreen;
