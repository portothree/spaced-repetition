import Card from './index';

describe(Card.name, () => {
	test('should review in one day', () => {
		const card = new Card();
		const record = card.getInitialRecord();
		const updatedRecord = card.calculate(1, record);

		expect(updatedRecord).toEqual(
			expect.objectContaining({
				dueDate: expect.any(Number),
				interval: 1,
			})
		);
	});
});
