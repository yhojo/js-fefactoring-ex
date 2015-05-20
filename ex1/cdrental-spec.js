
describe('簡単なテスト', function() {
    it('CdRentalにアクセスする', function() {
	expect(CdRental).toBeTruthy();
    });
    it('テストシナリオ', function() {
	var bob = new CdRental.Customer('bob');
	bob.addRental(new CdRental.Rental(
	    new CdRental.Movie('Star WardsIV', CdRental.Movie.REGULAR), 4));
	bob.addRental(new CdRental.Rental(
	    new CdRental.Movie('Giant Panda', CdRental.Movie.CHILDRENS), 4));
	bob.addRental(new CdRental.Rental(
	    new CdRental.Movie('E.T. V', CdRental.Movie.NEW_RELEASE), 4));
	var result = bob.statment();
	expect(result).toEqual('Rental Record for bob\n' + 
			       '\tStar WardsIV\t5\n' +
			       '\tGiant Panda\t3\n' +
			       '\tE.T. V\t4\n' +
			       'Amount owed is 12\n' +
			       'You earned 4 frequent renter points');
    });
});
