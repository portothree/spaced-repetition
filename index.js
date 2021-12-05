const AGAIN = -3;
const HARD = -1;
const GOOD = 1;
const DEFAULT_INTERVALS = [1, 2, 3, 8, 17];
const DEFAULT_SCORES = [AGAIN, HARD, GOOD];
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default class Card {
	constructor(
		progress = 0,
		dueDate = Math.round(new Date().getTime() / DAY_IN_MS),
		intervals = DEFAULT_INTERVALS,
		scoreToProgressChange = DEFAULT_SCORES
	) {
		this.progress = progress;
		this.dueDate = dueDate;
		this.intervals = intervals;
		this.scoreToProgressChange = scoreToProgressChange;
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
		const newProgress = progress + score;

		return {
			dueDate: newDueDate,
			progress: newProgress < 0 ? 0 : newProgress,
		};
	}
}
