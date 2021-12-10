const AGAIN = -3;
const HARD = -1;
const GOOD = 1;
const DEFAULT_INTERVALS = [1, 2, 3, 8, 17];
const DEFAULT_SCORES = [AGAIN, HARD, GOOD];
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default class Record {
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

	get againDueDate() {
		// Tomorrow
		return Math.round(new Date().getTime() / DAY_IN_MS) + 1;
	}

	review(score) {
		const correct = score === GOOD;
		const newDueDate =
			correct && this.progress < this.maxProgress
				? this.dueDate + this.intervals[this.progress]
				: this.againDueDate;
		const newProgress = this.progress + score;

		this.dueDate = newDueDate;
		this.progress = newProgress < 0 ? 0 : newProgress;

		return {
			dueDate: this.dueDate,
			progress: this.progress,
		};
	}
}
