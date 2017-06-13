$(document).ready(function() {

  var request = $.ajax({
    url: "/events",
    method: "GET",
    contentType: "application/json"
  })
  .done(function(data) {
    for (let i = 0; i < data.length; i++){
      var eventData = data[i];
      console.log(eventData);
      var newEvent = {
        name: eventData.name,
        description: eventData.event_description,
        //cause: eventData.cause,
        start_date: eventData.start_date,
        end_date: eventData.end_date,
        start_time: eventData.start_time,
        end_time: eventData.end_time,
        street_address: eventData.street_address,
        //city: eventData.city,
        zip: eventData.zip_code,
        photo_url: eventData.photo_url,
        event_url: eventData.event_url
      };
      populateCard(newEvent);
    }

  })
  .fail(function() {
    alert("Failed to get events");
  });
  function populateCard(eventObj) {
    let $el = $('<div class="card">' + '<div class="text-center">'  + '<a href = "" class="eventpic"><img class="eventimg card-img-top" src="" alt="Card image cap"></a>' + '</div>' + '<div class="card-block">' + '<a href = "" class="eventlink">' + '<p class="eventname text-center"></p></a>' +
    '<p class="eventdescription text-center"></p>' + '<p class="eventdate card-text"></p>' + '<p class="eventtime card-text"></p>' + '<p class="eventlocation card-text"></p>' + '<a class="eventwebsite card-text" href = "">Visit the Website</a>'+ '</div>' + '</div>');

// This top one is the one to change to our event page
    $el.find(".eventlink").attr("href", eventObj.event_url);
    $el.find(".eventpic").attr("href", eventObj.photo_url);
    $el.find(".eventimg").attr("src", eventObj.photo_url);
    $el.find(".eventname").text(eventObj.name);
    if (eventObj.start_date === eventObj.end_date) {
      $el.find(".eventdescription").text(eventObj.description);
    $el.find(".eventdate").text("Date: " + eventObj.start_date);
    } else {
    $el.find(".eventdate").text("Date: " + eventObj.start_date + " to " + eventObj.end_date);
  }
    if (eventObj.start_time === eventObj.end_time) {
    $el.find(".eventtime").text("Time: " + eventObj.start_time);
    } else {
    $el.find(".eventtime").text("Time: " + eventObj.start_time + " to " + eventObj.end_time);
  }
  $el.find(".eventlocation").text("Location: " + eventObj.street_address + ", " + eventObj.city_id + " " + eventObj.zip_code);
    $el.find(".eventwebsite").attr("href", eventObj.event_url);
    $('#append').append($el);
  }
});