export interface AdventDoor {
  day: number
  title: string
  type: 'game' | 'puzzle' | 'recipe' | 'quote'
  content: GameContent | PuzzleContent | RecipeContent | QuoteContent
  catEmoji: string
}

export interface GameContent {
  type: 'memory' | 'quiz' | 'riddle' | 'hangman' | 'simon' | 'catch' | 'whackamouse' | 'spotdifference' | 'sliderpuzzle' | 'connectpairs'
  data: any
}

export interface PuzzleContent {
  question: string
  answer: string
  hint?: string
}

export interface RecipeContent {
  name: string
  ingredients: string[]
  instructions: string[]
  prepTime: string
  cookTime: string
}

export interface QuoteContent {
  text: string
  author?: string
}

export const adventDoors: AdventDoor[] = [
  {
    day: 1,
    title: 'Weihnachtliches Rätsel',
    type: 'puzzle',
    catEmoji: '🐱',
    content: {
      question: 'Ich bin weiß wie Schnee, falle vom Himmel und schmelze in deiner Hand. Was bin ich?',
      answer: 'Schneeflocke',
      hint: 'Denk an den Winter!'
    } as PuzzleContent
  },
  {
    day: 2,
    title: 'Veganer Kakao',
    type: 'recipe',
    catEmoji: '😺',
    content: {
      name: 'Cremiger veganer Kakao',
      ingredients: [
        '2 Tassen Hafermilch',
        '2 EL Kakaopulver',
        '2 EL Ahornsirup',
        '1 Prise Zimt',
        'Vegane Sahne zum Toppen'
      ],
      instructions: [
        'Hafermilch in einem Topf erwärmen',
        'Kakaopulver und Ahornsirup einrühren',
        'Mit Zimt würzen',
        'In Tassen gießen und mit veganer Sahne toppen'
      ],
      prepTime: '5 Min',
      cookTime: '5 Min'
    } as RecipeContent
  },
  {
    day: 3,
    title: 'Mäusejagd',
    type: 'game',
    catEmoji: '😸',
    content: {
      type: 'whackamouse',
      data: {
        title: 'Hilf der Katze, die Mäuse zu fangen!',
        duration: 30,
        target: 20
      }
    } as GameContent
  },
  {
    day: 4,
    title: 'Sequenz Merken',
    type: 'game',
    catEmoji: '😻',
    content: {
      type: 'simon',
      data: {
        title: 'Die Katze zeigt dir den Weg zum Weihnachtsbaum',
        emojis: ['🎄', '🎁', '⭐', '🔔', '🕯️', '❄️']
      }
    } as GameContent
  },
  {
    day: 5,
    title: 'Zimtsterne',
    type: 'recipe',
    catEmoji: '😽',
    content: {
      name: 'Vegane Zimtsterne',
      ingredients: [
        '200g gemahlene Mandeln',
        '200g Puderzucker',
        '2 TL Zimt',
        '2 EL Aquafaba',
        'Etwas Zitronensaft'
      ],
      instructions: [
        'Mandeln, Puderzucker und Zimt mischen',
        'Aquafaba und Zitronensaft hinzufügen',
        'Teig ausrollen und Sterne ausstechen',
        'Bei 150°C für 15 Minuten backen'
      ],
      prepTime: '20 Min',
      cookTime: '15 Min'
    } as RecipeContent
  },
  {
    day: 6,
    title: 'Katzen-Rätsel',
    type: 'puzzle',
    catEmoji: '🙀',
    content: {
      question: 'Eine Katze sitzt vor zwei Türen. Hinter einer ist ein warmes Zimmer mit Milch, hinter der anderen Schnee. Welche wählt sie?',
      answer: 'Die warme Tür',
      hint: 'Katzen mögen es warm und gemütlich!'
    } as PuzzleContent
  },
  {
    day: 7,
    title: 'Galgenmännchen',
    type: 'game',
    catEmoji: '😿',
    content: {
      type: 'hangman',
      data: {
        word: 'ZUCKERSTANGE',
        hint: 'Eine weihnachtliche Süßigkeit, die oft am Baum hängt',
        maxWrongGuesses: 8
      }
    } as GameContent
  },
  {
    day: 8,
    title: 'Memory-Spiel',
    type: 'game',
    catEmoji: '😹',
    content: {
      type: 'memory',
      data: {
        cards: ['🎄', '⛄', '🎁', '⭐', '🔔', '🕯️']
      }
    } as GameContent
  },
  {
    day: 9,
    title: 'Lebkuchen',
    type: 'recipe',
    catEmoji: '😼',
    content: {
      name: 'Vegane Lebkuchen',
      ingredients: [
        '300g Mehl',
        '100g brauner Zucker',
        '100ml Hafermilch',
        '2 TL Lebkuchengewürz',
        '1 TL Natron'
      ],
      instructions: [
        'Alle trockenen Zutaten mischen',
        'Hafermilch hinzufügen und verkneten',
        'Teig ausrollen und Formen ausstechen',
        'Bei 180°C für 12 Minuten backen'
      ],
      prepTime: '15 Min',
      cookTime: '12 Min'
    } as RecipeContent
  },
  {
    day: 10,
    title: 'Winterrätsel',
    type: 'puzzle',
    catEmoji: '🐱',
    content: {
      question: 'Ich habe viele Nadeln, aber kann nicht nähen. Ich bin im Winter besonders schön. Was bin ich?',
      answer: 'Tannenbaum',
      hint: 'In jedem Wohnzimmer zur Weihnachtszeit!'
    } as PuzzleContent
  },
  {
    day: 11,
    title: 'Katzen-Weihnachtsrätsel',
    type: 'puzzle',
    catEmoji: '😺',
    content: {
      question: 'Eine Katze sitzt vor dem Weihnachtsbaum und zählt: 4 rote Kugeln, 4 goldene Kugeln, 4 silberne Kugeln. Eine Kugel fällt herunter. Wie viele Kugeln kann die Katze jetzt noch zählen?',
      answer: 'Keine - die Katze spielt jetzt mit der heruntergefallenen Kugel!',
      hint: 'Katzen und Weihnachtskugeln...'
    } as PuzzleContent
  },
  {
    day: 12,
    title: 'Schiebepuzzle',
    type: 'game',
    catEmoji: '😸',
    content: {
      type: 'sliderpuzzle',
      data: {}
    } as GameContent
  },
  {
    day: 13,
    title: 'Spekulatius',
    type: 'recipe',
    catEmoji: '😻',
    content: {
      name: 'Vegane Spekulatius',
      ingredients: [
        '250g Mehl',
        '100g Margarine',
        '100g Zucker',
        '2 TL Spekulatiusgewürz',
        '3 EL Hafermilch'
      ],
      instructions: [
        'Margarine mit Zucker cremig rühren',
        'Mehl und Gewürz hinzufügen',
        'Hafermilch unterkneten',
        'Teig ausrollen, ausstechen und bei 180°C 10 Min backen'
      ],
      prepTime: '20 Min',
      cookTime: '10 Min'
    } as RecipeContent
  },
  {
    day: 14,
    title: 'Fang die Schneeflocke',
    type: 'game',
    catEmoji: '😽',
    content: {
      type: 'catch',
      data: {
        title: 'Hilf der Katze Schneeflocken zu fangen!',
        emoji: '❄️',
        duration: 30,
        target: 15
      }
    } as GameContent
  },
  {
    day: 15,
    title: 'Winterfreude',
    type: 'quote',
    catEmoji: '🙀',
    content: {
      text: 'Katzen sind wie Schneeflocken - jede ist einzigartig und wunderschön.',
      author: 'Unbekannt'
    } as QuoteContent
  },
  {
    day: 16,
    title: 'Galgenmännchen',
    type: 'game',
    catEmoji: '😿',
    content: {
      type: 'hangman',
      data: {
        word: 'SCHNURRBART',
        hint: 'Was haben Katzen im Gesicht und macht sie so süß?',
        maxWrongGuesses: 8
      }
    } as GameContent
  },
  {
    day: 17,
    title: 'Bratapfel',
    type: 'recipe',
    catEmoji: '😹',
    content: {
      name: 'Veganer Bratapfel',
      ingredients: [
        '4 Äpfel',
        '50g gehackte Nüsse',
        '50g Rosinen',
        '2 EL Ahornsirup',
        '1 TL Zimt'
      ],
      instructions: [
        'Äpfel aushöhlen',
        'Nüsse, Rosinen, Ahornsirup und Zimt mischen',
        'Äpfel damit füllen',
        'Bei 180°C für 25 Minuten backen'
      ],
      prepTime: '10 Min',
      cookTime: '25 Min'
    } as RecipeContent
  },
  {
    day: 18,
    title: 'Schnurrendes Rätsel',
    type: 'puzzle',
    catEmoji: '😼',
    content: {
      question: 'Drei Katzen sitzen unter dem Weihnachtsbaum. Die erste Katze sagt: "Ich sehe zwei Katzen." Die zweite sagt: "Ich sehe eine Katze." Die dritte sagt: "Ich sehe keine Katze." Wie kann das sein?',
      answer: 'Die dritte Katze hat ihre Augen geschlossen und schläft!',
      hint: 'Katzen schlafen sehr viel...'
    } as PuzzleContent
  },
  {
    day: 19,
    title: 'Innerer Frieden',
    type: 'quote',
    catEmoji: '🐱',
    content: {
      text: 'Die beste Art, Weihnachten zu feiern, ist es, jeden Tag ein bisschen Freundlichkeit zu verschenken.',
      author: 'Unbekannt'
    } as QuoteContent
  },
  {
    day: 20,
    title: 'Suchbild',
    type: 'game',
    catEmoji: '😺',
    content: {
      type: 'spotdifference',
      data: {}
    } as GameContent
  },
  {
    day: 21,
    title: 'Punsch',
    type: 'recipe',
    catEmoji: '😸',
    content: {
      name: 'Veganer Weihnachtspunsch',
      ingredients: [
        '1L Apfelsaft',
        '500ml Orangensaft',
        '2 Zimtstangen',
        '4 Nelken',
        '1 Orange in Scheiben'
      ],
      instructions: [
        'Alle Zutaten in einen Topf geben',
        'Langsam erhitzen, nicht kochen',
        '15 Minuten ziehen lassen',
        'Heiß servieren'
      ],
      prepTime: '5 Min',
      cookTime: '20 Min'
    } as RecipeContent
  },
  {
    day: 22,
    title: 'Galgenmännchen',
    type: 'game',
    catEmoji: '😻',
    content: {
      type: 'hangman',
      data: {
        word: 'CHRISTBAUM',
        hint: 'Was steht geschmückt im Wohnzimmer zu Weihnachten?',
        maxWrongGuesses: 8
      }
    } as GameContent
  },
  {
    day: 23,
    title: 'Paare verbinden',
    type: 'game',
    catEmoji: '😽',
    content: {
      type: 'connectpairs',
      data: {}
    } as GameContent
  },
  {
    day: 24,
    title: 'Heiligabend',
    type: 'quote',
    catEmoji: '🎅',
    content: {
      text: 'Frohe Weihnachten! Mögest du diese besondere Zeit mit deinen Liebsten verbringen, umgeben von Wärme, Liebe und vielleicht einer schnurrenden Katze auf dem Schoß. 🎄✨',
      author: 'Von Herzen'
    } as QuoteContent
  }
]
