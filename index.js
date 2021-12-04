const DEFAULT_INTERVALS = [1, 2, 3, 8, 17];
const DEFAULT_SCORE = [-3, -1, 1];
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default class Card {
	constructor(
		intervals = DEFAULT_INTERVALS,
		scroreToProgressChange = DEFAULT_SCORE
	) {
		this.intervals = intervals;
		this.scroreToProgressChange = scroreToProgressChange;
	}

	get maxProgress() {
		return this.intervals.length;
	}

	get correctScore() {
		return this.scroreToProgressChange.length - 1;
	}

	calculate(score, { progress, dueDate }) {
		const now = Math.round(new Date().getTime() / DAY_IN_MS);
		const correct = score === this.scroreToProgressChange.length - 1;
		const newProgress = progress + this.scroreToProgressChange[score];
		const dueDate =
			correct && progress < this.maxProgress
				? (dueDate = now + this.intervals[progress])
				: now + 1;

		return {
			dueDate,
			progress: newProgress < 0 ? 0 : newProgress,
		};
	}

	getInitialRecord(now) {
		return {
			progress: 0,
			dueDate: now,
		};
	}
}
