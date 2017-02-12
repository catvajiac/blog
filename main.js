$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAqFBHi9spQG4GCDXKj7hNpHYbRwZdGI04",
    authDomain: "blogs-8de41.firebaseapp.com",
    databaseURL: "https://blogs-8de41.firebaseio.com",
    storageBucket: "blogs-8de41.appspot.com",
    messagingSenderId: "283130481155"
  };
  firebase.initializeApp(config);

  
  var ref = firebase.database().ref();
  ref.child("blogposts").on('child_added', function(snapshot) {
    addPost(snapshot.val().title, snapshot.val().post);
  });

  $("#postbutton").on("click", function(e) {
    console.log("Stuff was posted");
    var title = $("#blogtitle").val();
    $("#blogtitle").val("");
    var textarea = $("#blogpost").val();
    $("#blogpost").val("");
    console.log(title);
    console.log(textarea);
    //addPost(title, textarea);
    ref.child("blogposts").push({
      title: title,
      post: textarea
    }).catch(console.log.bind(console));
    ref.child("blogposts").on('child_added', function(snapshot) {
      addPost(snapshot.val().title, snapshot.val().post);
    });
  });
  
  function addPost(title, textarea) {
    $("body").append("<h3 class='title'>" + title + "</h3>");
    $("body").append("<p>" + textarea + "</p>");
  }
});
