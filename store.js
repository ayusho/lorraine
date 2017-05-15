var Promise = require('bluebird');

var ReviewsOptions = [
    '“Very stylish, great stay, great staff”',
    '“good hotel awful meals”',
    '“Need more attention to little things”',
    '“Lovely small hotel ideally situated to explore the area.”',
    '“Positive surprise”',
    '“Beautiful suite and resort”'];

module.exports = {
    findItems: function (items) {
        return new Promise(function (resolve) {

            // Filling the hotels results manually just for demo purposes
            var listOfItems = [];
            for (var i = 1; i <= 5; i++) {
                listOfItems.push({
                    name: ' JDW ' + items + ' ' + i,
                    image: 'http://ecx.images-amazon.com/images/I/71A2pxQc3XL._UL1500_.jpg'
                });
            }
            // complete promise with a timer to simulate async response
            setTimeout(function () { resolve(listOfItems); }, 1000);
        });
    },

    // searchHotelReviews: function (hotelName) {
    //     return new Promise(function (resolve) {

    //         // Filling the review results manually just for demo purposes
    //         var reviews = [];
    //         for (var i = 0; i < 5; i++) {
    //             reviews.push({
    //                 title: ReviewsOptions[Math.floor(Math.random() * ReviewsOptions.length)],
    //                 text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris odio magna, sodales vel ligula sit amet, vulputate vehicula velit. Nulla quis consectetur neque, sed commodo metus.',
    //                 image: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif'
    //             });
    //         }

    //         // complete promise with a timer to simulate async response
    //         setTimeout(function () { resolve(reviews); }, 1000);
    //     });
    // }
};