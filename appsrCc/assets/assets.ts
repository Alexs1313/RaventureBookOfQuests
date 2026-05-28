export const mediaRegistry = {
  backgrounds: {
    app: require('../../elements/images/backgrounds/appBackground.png'),
    loader: require('../../elements/images/backgrounds/loaderBackground.png'),
  },
  icons: {
    back: require('../../elements/images/icons/backIcon.png'),
    share: require('../../elements/images/icons/shareIcon.png'),
    shareButton: require('../../elements/images/icons/shareButtonIcon.png'),
    delete: require('../../elements/images/icons/deleteIcon.png'),
    close: require('../../elements/images/icons/closeIcon.png'),
    lock: require('../../elements/images/icons/lockIcon.png'),
  },
  tabs: {
    tales: require('../../elements/images/tabs/tabTales.png'),
    saved: require('../../elements/images/tabs/tabSaved.png'),
    quiz: require('../../elements/images/tabs/tabQuiz.png'),
    characters: require('../../elements/images/tabs/tabCharacters.png'),
    artifacts: require('../../elements/images/tabs/tabArtifacts.png'),
  },
  saved: {
    empty: require('../../elements/images/saved/savedEmpty.png'),
  },
  quiz: {
    complete: require('../../elements/images/quiz/quizComplete.png'),
    hero: require('../../elements/images/quiz/quizHero.png'),
  },
} as const;
