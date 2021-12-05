import Card from './index';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const lastDueDate = Math.round(new Date('2000-01-01').getTime() / DAY_IN_MS);

describe(Card.name, () => {
	test.each([
		[{ progress: 0, dueDate: lastDueDate }],
		[{ progress: 1, dueDate: lastDueDate }],
		[{ progress: 2, dueDate: lastDueDate }],
		[{ progress: 3, dueDate: lastDueDate }],
		[{ progress: 4, dueDate: lastDueDate }],
	])('HARD - record: %O', (record) => {
		const score = -1;
		const card = new Card(record.progress, record.dueDate);
		const updatedRecord = card.calculate(score, record);

		expect(updatedRecord).toEqual(
			expect.objectContaining({
				dueDate: record.dueDate + 1,
				progress: record.progress + score,
			})
		);
	});

	test.each([
		[{ progress: 0, dueDate: lastDueDate }, lastDueDate + 1],
		[{ progress: 1, dueDate: lastDueDate }, lastDueDate + 2],
		[{ progress: 2, dueDate: lastDueDate }, lastDueDate + 3],
		[{ progress: 3, dueDate: lastDueDate }, lastDueDate + 8],
		[{ progress: 4, dueDate: lastDueDate }, lastDueDate + 17],
	])('GOOD - record: %O, nextDueDate: %i', (record, nextDueDate) => {
		const score = 1;
		const card = new Card(record.progress, record.dueDate);
		const updatedRecord = card.calculate(score, record);

		expect(updatedRecord).toEqual(
			expect.objectContaining({
				dueDate: nextDueDate,
				progress: record.progress + score,
			})
		);
	});
});
