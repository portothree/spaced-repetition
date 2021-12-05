# Spaced repetition algorithm

Schedule next due date for flashcards by answering and calculating progress.

```javascript
import Card from '@porto/spaced-repetition';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const today = Math.round(new Date('2000-01-01').getTime() / DAY_IN_MS); // => 10957

const card = new Card(today, 0, [1, 4, 8, 17], [-3, -1, 1]);
const updatedCard = card.review(1, { dueDate: today, progress: 0 }); // => { dueDate: 10958, progress: 1 }
```

