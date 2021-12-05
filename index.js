const AGAIN = -3;
const HARD = -1;
const GOOD = 1;
const INTERVALS = [1, 2, 3, 8, 17];
const SCORES = [AGAIN, HARD, GOOD];
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default class Card {
	constructor(
		progress = 0,
		dueDate = Math.round(new Date().getTime() / DAY_IN_MS)
	) {
		this.progress = progress;
		this.dueDate = dueDate;
		this.intervals = INTERVALS;
		this.scoreToProgressChange = SCORES;
	}

	get maxProgress() {
		return this.intervals.length;
	}

	calculate(score, { progress, dueDate }) {
		const correct = score === GOOD;
		const newDueDate =
			correct && progress < this.maxProgress
				? dueDate + this.intervals[progress]
				: dueDate + 1;

		return {
			dueDate: newDueDate,
			progress: progress++ ?? 0,
		};
	}
}
