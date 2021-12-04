const AGAIN = -3;
const HARD = -1;
const GOOD = 1;
const DEFAULT_INTERVALS = [1, 2, 3, 8, 17];
const DEFAULT_SCORE = [AGAIN, HARD, GOOD];
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default class Card {
	constructor(
		intervals = DEFAULT_INTERVALS,
		scoreToIntervalChange = DEFAULT_SCORE
	) {
		this.intervals = intervals;
		this.scoreToIntervalChange = scoreToIntervalChange;
	}

	get maxInterval() {
		return this.intervals[this.intervals.length];
	}

	calculate(score, { interval, dueDate }) {
		const now = Math.round(new Date().getTime() / DAY_IN_MS);
		const correct = score === GOOD;
		const nextIntervalIndex =
			this.intervals.findIndex((i) => i === interval) + 1;
		const newInterval = this.intervals[nextIntervalIndex];
		const newDueDate =
			correct && interval < this.maxInterval
				? now + newInterval 
				: now + 1;

		return {
			dueDate: newDueDate,
			interval: newInterval ?? 0,
		};
	}

	getInitialRecord() {
		const now = Math.round(new Date().getTime() / DAY_IN_MS);

		return {
			interval: 0,
			dueDate: now,
		};
	}
}
