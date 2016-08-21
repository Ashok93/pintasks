//Global variable, counter to keep the track of card and is first time variable to add event listner.
var counter = 0;
var is_first_time = false;

$(document).ready(function() {
	console.log("Welcome to Pin-Tasks. Geek :D");
	//check if there are cards in the local storage. if then, add the cards.
    if (typeof(Storage) !== "undefined") {
        for (var i = 0; i < localStorage.length; i++) {

            counter = localStorage.key(i);
            console.log(localStorage.getItem(localStorage.key(i)));
            var card_info = JSON.parse(localStorage.getItem(localStorage.key(i)));
            makeCard(card_info.notes, card_info.date_time);

            if (!is_first_time)
                is_first_time = true;

            addDeleteCardEventListner();
        }
    }

    //Add new card functionality.
    $("#add-card-btn").click(function() {
        var notes = $(".new-card-txt-area").val();
        var date_time = Date();
        if (notes != "") {
            counter = counter + 1;
            makeCard(notes, date_time);
            var card_information = {
                "notes": notes,
                "date_time": date_time
            };
            if (typeof(Storage) !== "undefined") {
                // Store
                localStorage.setItem(counter.toString(), JSON.stringify(card_information));
            }
        }

        if (!is_first_time)
            is_first_time = true;

        addDeleteCardEventListner();
    });
});

//Make card function that creates and appends card to the card container.
function makeCard(notes, date_time) {
    var card_div = "<div class='card card_" + counter + "'><div class='typcn typcn-trash delete'></div>" + notes + "<span class='date-time'>" + date_time + "</span></div>";
    $('.cards-container').append(card_div);
    $(".new-card-txt-area").val("");
}

//delete card functionality. Delete the card info from local storage also.
function addDeleteCardEventListner() {
    if (is_first_time) {
        $('.cards-container').on('click', '.delete', function() {
            console.log("delete the card");
            var $this = $(this);
            var $card = $this.parent();
            var card_index = $card.attr("class").split(" ")[1].split("_")[1];
            $card.remove();
            //counter = counter - 1;
            if (typeof(Storage) !== "undefined") {
                console.log(card_index)
                localStorage.removeItem(card_index);
            }
        });
    }
}