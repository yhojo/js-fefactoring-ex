
var CdRental = (function() {
    var module = {};

    module.Movie = (function(){
	var Movie = function(title, priceCode) {
	    this.title = title;
	    this.priceCode = priceCode;
	};
	Movie.CHILDRENS = 2;
	Movie.REGULAR = 0;
	Movie.NEW_RELEASE = 1;
	return Movie;
    })();

    module.Rental = (function() {
	var Rental = function(movie, daysRented) {
	    this.movie = movie;
	    this.daysRented = daysRented;
	};
	return Rental;
    })();

    module.Customer = (function() {
	var Customer = function(name) {
	    this.name = name;
	    this.rentals = [];
	};
	Customer.prototype.addRental = function(rental) {
	    this.rentals.push(rental);
	};
	Customer.prototype.statment = function() {
	    var totalAmount = 0;
	    var frequentRenterPoints = 0;
	    var result = 'Rental Record for ' + this.name + '\n';
	    for (var i = 0; i < this.rentals.length; i++) {
		var thisAmount = 0;
		var rental = this.rentals[i];
		// 一行毎に金額を計算
		switch (rental.movie.priceCode) {
		case CdRental.Movie.REGULAR:
		    thisAmount += 2;
		    if (rental.daysRented > 2)
			thisAmount += (rental.daysRented - 2) * 1.5;
		    break;
		case CdRental.Movie.NEW_RELEASE:
		    thisAmount += rental.daysRented;
		    break;
		case CdRental.Movie.CHILDRENS:
		    thisAmount += 1.5;
		    if (rental.daysRented > 3)
			thisAmount += (rental.daysRented - 3) * 1.5;
		    break;
		}
		// レンタルポイントを加算
		frequentRenterPoints++;
		// 新作を二日以上借りた場合はボーナスポイント
		if (rental.movie.priceCode == CdRental.Movie.NEW_RELEASE
		    && rental.daysRented > 1) frequentRenterPoints++;

		// この貸し出しに関する数値の表示
		result += '\t' + rental.movie.title + '\t' +
		    thisAmount + '\n';
		totalAmount += thisAmount;
	    }
	    // フッタ部分の追加
	    result += 'Amount owed is ' + totalAmount + '\n';
	    result += 'You earned ' + frequentRenterPoints +
		' frequent renter points';
	    return result;
	}
	return Customer;
    })();
    return module;
})();
