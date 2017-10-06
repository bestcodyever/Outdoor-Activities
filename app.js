$(document).ready(function() {});

const weatheURL = "https://api.wunderground.com/api/b8e89189564dabc3/conditions/q/"
const movieURL = "https://www.omdbapi.com/?apikey=c5a8df09&t="

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
$('#movieButton').click(function(event) {
  event.preventDefault()
  $('#movieButton').css({"display": "none"})
  $('#title').fadeIn(2000)
  $('#plot').fadeIn(2000)

})
$('#hikeButton').click(function(event) {
  event.preventDefault()
  $('#hikeButton').css({"display": "none"})
  $('.hike-city').fadeIn(2000)
  $('.hike-dir').fadeIn(2000)
  $('.hike-dis').fadeIn(2000)

})

function random(z) {
  return Math.floor(Math.random() * z)
}

$("#click").click(function(event) {
  event.preventDefault()
  reset()
  let search = $('#input').val()
  let state = $('#select').val() + "/"
  $.get(weatheURL + state + search + ".json", function(temp) {
    $('.temp_f').html(temp.current_observation.temp_f).fadeIn(1000)
    $('.city').html(temp.current_observation.display_location.full).fadeIn(1000)
    return temp
  }).then(function(url) {
    let lat = url.current_observation.display_location.latitude
    let lon = url.current_observation.display_location.longitude
    var trailUrl = 'https://trailapi-trailapi.p.mashape.com/?lat=' + lat + '&lon=' + lon +
     '&q[activities_activity_type_name_eq]=hiking&radius=45'
    $.ajax({
      url: trailUrl,
      type: 'GET',
      data: {},
      dataType: 'json',
      success: function(data) {
        let trailRandom = random(4)
        $('.hikeLoad').fadeOut()
        $('.hike-city').html(data.places[trailRandom].name + ' Trail.')
        $('.hike-dir').html(data.places[trailRandom].directions)
        $('.hike-dis').attr('src', data.places[trailRandom].activities[0].thumbnail)
      },
      error: function(err) {},
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "V0cTRTFthjmshonUdVPvTkRidDMzp1Vr23ijsnS8nYY5lFxnRn");
      }
    })
    if ($('.temp_f')[0].innerText <= lowTemp || $('.temp_f')[0].innerText > highTemp) {
      displayBadWeather()
    }
    else {
      displayGoodWeather()
    }
  })
  $.get(movieURL + movies[random(19)], function(movie) {
    $('#title').html(movie.Title)
    $('#plot').html(movie.Plot)
  })
})

const movies = [
  'star+wars',
  'empire+strikes+back',
  'return+of+the+jedi',
  'the+phantom+menace',
  'attack+of+the',
  'revenge+of+the+sith',
  'the+force+awakens',
  'raiders+of+the+lost',
  'temple+of+doom',
  'indiana+jones+and+the+last+crusade',
  'kingdom+of+the',
  'friends+with+',
  'white+chicks',
  'no+strings+attached',
  'good+will+hunting',
  'robin+hood+prince',
  'frozen',
  'eurotrip',
  'mean+girls',
  'gump'
]

function displayGoodWeather(){
  $('.hike-city').fadeIn(2000)
  $('.hike-dir').fadeIn(2000)
  $('.hike-dis').fadeIn(2000)
  $('.movieLoad').css({"display": "none"})
  $('#movieButton').fadeIn()
}
function displayBadWeather(){
  $('.movieLoad').fadeOut()
  $('#title').fadeIn(2000)
  $('#plot').fadeIn(2000)
  $('.hikeLoad').css({"display": "none"})
  $('#hikeButton').fadeIn()
}
function reset() {
  $('.movieLoad').fadeIn(200)
  $('.hikeLoad').fadeIn(200)
  $('.hike-city').html('')
  $('.hike-dir').html('')
  $('.hike-dis').attr('src', '')
  $('#title').css({"display": "none"})
  $('#plot').css({"display": "none"})
  $('#title').html('')
  $('#plot').html('')
  $('#hikeButton').css({"display": "none"})
  $('#movieButton').css({"display": "none"})
}
