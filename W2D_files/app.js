$(document).ready(function() {});

let lowTemp = $('#minTemp').val()
let highTemp = $('#maxTemp').val()

$('#minTemp').change(function() {
  lowTemp = $(this).val();
})
$('#maxTemp').change(function() {
  highTemp = $(this).val();
})

function outputUpdate1(vol) {
  $('#output1').val(vol)
}

function outputUpdate(vol) {
  $('#output2').val(vol)
}
$('#movieButton').click(function(event){
  $('#title').fadeIn(2000)
  $('#plot').fadeIn(2000)
  $('#movieButton').fadeOut(1000)
})
$('#hikeButton').click(function(event){
  $('.hike-city').fadeIn(2000)
  $('.hike-dir').fadeIn(2000)
  $('.hike-dis').fadeIn(2000)
  $('#hikeButton').fadeOut(1000)
})

function random(z) {
  return Math.floor(Math.random() * z)
}
const trailRandom = random(4)
const movies = ['star+wars', 'empire+strikes+back', 'return+of+the+jedi', 'the+phantom+menace', 'attack+of+the', 'revenge+of+the+sith', 'the+force+awakens', 'raiders+of+the+lost', 'temple+of+doom', 'indiana+jones+and+the+last+crusade', 'kingdom+of+the', 'friends+with+', 'white+chicks', 'no+strings+attached', 'good+will+hunting', 'robin+hood+prince', 'frozen', 'eurotrip', 'mean+girls', 'gump']

$("#click").click(function(event) {

  event.preventDefault()

  $('.hike-city').fadeOut(200)
  $('.hike-dir').fadeOut(200)
  $('.hike-dis').fadeOut(200)
  $('#title').fadeOut(200)
  $('#plot').fadeOut(200)
  let search = $('#input').val()
  let state = $('#select').val() + "/"
  $.get("https://api.wunderground.com/api/b8e89189564dabc3/conditions/q/" + state + search + ".json", function(temp) {
      $('.temp_f').html(temp.current_observation.temp_f).fadeIn(1000)
      $('.city').html(temp.current_observation.display_location.full).fadeIn(1000)
      return temp
    })
    .then(function(url) {
      let lat = url.current_observation.display_location.latitude
      let lon = url.current_observation.display_location.longitude
      let trailUrl = 'https://trailapi-trailapi.p.mashape.com/?lat=' + lat + '&lon=' + lon + '&q[activities_activity_type_name_eq]=hiking&radius=45'
      $.ajax({
        url: trailUrl,
        type: 'GET',
        data: {},
        dataType: 'json',
        success: function(data) {
          $('.hike-city').html(data.places[trailRandom].name + ' Trail.')
          $('.hike-dir').html(data.places[trailRandom].directions)
          $('.hike-dis').attr('src', data.places[trailRandom].activities[0].thumbnail)

        },
        error: function(err) {},
        beforeSend: function(xhr) {
          xhr.setRequestHeader("X-Mashape-Authorization", "V0cTRTFthjmshonUdVPvTkRidDMzp1Vr23ijsnS8nYY5lFxnRn");
        }
      })
      if ($('.temp_f')[0].innerText < lowTemp || $('.temp_f')[0].innerText >= highTemp) {
        $('#title').fadeIn(2000)
        $('#plot').fadeIn(2000)
        $('#hikeButton').fadeIn(2000)
      } else {
        $('.hike-city').fadeIn(2000)
        $('.hike-dir').fadeIn(2000)
        $('.hike-dis').fadeIn(2000)
        $('#movieButton').fadeIn(2000)
      }
    })
  $.get("https://www.omdbapi.com/?apikey=c5a8df09&t=" + movies[random(19)], function(movie) {
    $('#title').html(movie.Title)
    $('#plot').html(movie.Plot)
  })
})
