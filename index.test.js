import Card from './index';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const lastDueDate = Math.round(new Date('2000-01-01').getTime() / DAY_IN_MS);

describe(Card.name, () => {
	test.each([
		[{ progress: 0, dueDate: lastDueDate }, 1],
		[{ progress: 1, dueDate: lastDueDate }, 2],
		[{ progress: 2, dueDate: lastDueDate }, 3],
		[{ progress: 3, dueDate: lastDueDate }, 8],
		[{ progress: 4, dueDate: lastDueDate }, 17],
	])('GOOD - record: %O, nextInterval: %i', (record, nextInterval) => {
		const score = 1;
		const card = new Card(record.progress, record.dueDate);
		const updatedRecord = card.calculate(score, record);

		expect(updatedRecord).toEqual(
			expect.objectContaining({
				dueDate: record.dueDate + nextInterval,
				progress: record.progress,
			})
		);
	});
});
