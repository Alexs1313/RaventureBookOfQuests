import React, {useCallback, useMemo, useState} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {jokeCategories, resolveJokeCategory} from '../ExplorerMytthofData/ExplorerMytthofJokes';
import {CategoryCard, JokeCard} from '../ExplorerMytthofComponents/ExplorerMytthofJokes';
import {
  AppLayout,
  BackButton,
  FadeInView,
  ScreenHeader,
  StaggerItem,
} from '../ExplorerMytthofComponents';
import type {JokesPhase, MythLocale} from '../ExplorerMytthofTypes';
import {
  composeJokeShare,
  discardJoke,
  loadSavedJokeKeys,
  persistJoke,
} from '../ExplorerMytthofLoungeKit';

const JokesScreen = () => {
  const [explorerMytthofScreenPhase, setExplorerMytthofScreenPhase] =
    useState<JokesPhase>('catalog');
  const [explorerMytthofActiveLocale, setExplorerMytthofActiveLocale] =
    useState<MythLocale | null>(null);
  const [explorerMytthofSavedKeys, setExplorerMytthofSavedKeys] = useState<
    Set<string>
  >(new Set());

  const explorerMytthofRefreshSavedKeys = useCallback(async () => {
    const keys = await loadSavedJokeKeys();
    setExplorerMytthofSavedKeys(new Set(keys));
  }, []);

  useFocusEffect(
    useCallback(() => {
      void explorerMytthofRefreshSavedKeys();
    }, [explorerMytthofRefreshSavedKeys]),
  );

  const explorerMytthofActiveCategory = useMemo(
    () =>
      explorerMytthofActiveLocale
        ? resolveJokeCategory(explorerMytthofActiveLocale)
        : undefined,
    [explorerMytthofActiveLocale],
  );

  const explorerMytthofOpenCategory = useCallback((localeTag: MythLocale) => {
    setExplorerMytthofActiveLocale(localeTag);
    setExplorerMytthofScreenPhase('detail');
  }, []);

  const explorerMytthofReturnToCatalog = useCallback(() => {
    setExplorerMytthofScreenPhase('catalog');
    setExplorerMytthofActiveLocale(null);
  }, []);

  const explorerMytthofEmitJokeShare = useCallback(
    async (localeTag: MythLocale, body: string) => {
      await Share.share({
        message: composeJokeShare(localeTag, body),
      });
    },
    [],
  );

  const explorerMytthofToggleJokeSave = useCallback(
    async (jokeKey: string) => {
      if (explorerMytthofSavedKeys.has(jokeKey)) {
        await discardJoke(jokeKey);
      } else {
        await persistJoke(jokeKey);
      }
      await explorerMytthofRefreshSavedKeys();
    },
    [explorerMytthofRefreshSavedKeys, explorerMytthofSavedKeys],
  );

  if (
    explorerMytthofScreenPhase === 'detail' &&
    explorerMytthofActiveCategory
  ) {
    return (
      <AppLayout tab>
        <View style={explorerMytthofStyles.explorerMytthofDetailHeader}>
          <BackButton onPress={explorerMytthofReturnToCatalog} />
        </View>
        <ScreenHeader
          title={explorerMytthofActiveCategory.localeTag}
          subtitle="Mythology humor"
          compact
        />
        <View style={explorerMytthofStyles.explorerMytthofJokeStack}>
          {explorerMytthofActiveCategory.jokes.map((joke, index) => (
            <StaggerItem key={joke.jokeKey} index={index}>
              <JokeCard
                joke={joke}
                isSaved={explorerMytthofSavedKeys.has(joke.jokeKey)}
                onShare={() =>
                  void explorerMytthofEmitJokeShare(joke.localeTag, joke.body)
                }
                onToggleSave={() =>
                  void explorerMytthofToggleJokeSave(joke.jokeKey)
                }
              />
            </StaggerItem>
          ))}
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout tab>
      <ScreenHeader
        title="Jokes"
        subtitle="Laugh through four ancient kingdoms"
        compact
      />
      {jokeCategories.map((category, index) => (
        <FadeInView key={category.localeTag} delay={index * 80}>
          <CategoryCard
            category={category}
            onOpen={() => explorerMytthofOpenCategory(category.localeTag)}
          />
        </FadeInView>
      ))}
    </AppLayout>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofDetailHeader: {
    marginTop: 50.5,
    marginBottom: 8.3,
  },
  explorerMytthofJokeStack: {
    gap: 16.1,
    paddingBottom: 16.2,
  },
});

export default JokesScreen;
