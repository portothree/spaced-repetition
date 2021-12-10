# Spaced repetition algorithm

Schedule next due date for flashcards by answering and calculating progress.

```javascript
import Record from '@porto/spaced-repetition';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const today = Math.round(new Date('2000-01-01').getTime() / DAY_IN_MS); // => 10957

const card = new Record(0, today, [1, 4, 8, 17], [-3, -1, 1]);

/* GOOD */
card.review(1); // => { dueDate: 10958, progress: 1 }

/* GOOD */
card.review(1); // => { dueDate: 10962, progress: 2 }

/* AGAIN */
card.review(-3); // => { dueDate: 10958, progress: 0 }
```
