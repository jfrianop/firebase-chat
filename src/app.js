// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import style from './style.scss';
import $ from 'jquery';
import "bootstrap";
import Handlebars from 'handlebars';
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyBpH1nA_CYnYzXhDCrytir6WJNlX9oEQ5A",
    authDomain: "topv3-chat-a1d93.firebaseapp.com",
    databaseURL: "https://topv3-chat-a1d93.firebaseio.com",
    projectId: "topv3-chat-a1d93",
    storageBucket: "topv3-chat-a1d93.appspot.com",
    messagingSenderId: "525123737831",
    appId: "1:525123737831:web:32b04a2ea54113541f6a42",
    measurementId: "G-0L1KY0EYX9"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

$(document).ready(() => {
    printMessages();
})

$("input").on("keypress", function (e) {
    if (e.which == 13) {
        sendMessage("Juan Riaño");
    }
});

$(".send-message").on("click", function () {
    sendMessage("Juan Riaño");
})

const sendMessage = (name) => {
    db.collection("messages").add({
        sender: name,
        message: $("input").val()
    }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        $("input").val("");
        printMessages();
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

const printMessages = () => {
    db.collection("messages").get().then((querySnapshot) => {
        $(".chat-messages ul").html("");
        querySnapshot.forEach((msg) => {
            console.log(msg.data());
            $(".chat-messages ul").append('<li class="list-group-item message"><strong>'
                + msg.data().sender + ': </strong>' + msg.data().message + '</li>')
            $('.chat-messages').animate({ scrollTop: 9999 }, 'slow');
        });
    });
}


/*const ws = new WebSocket("wss://mir-chat.herokuapp.com");
ws.onopen = function () {
    alert("You're in")
}
ws.onmessage = function (msg) {
    var obj = JSON.parse(msg.data);
    $(".chat-messages ul").append('<li class="list-group-item message"><strong>'
        + obj.sender + ': </strong>' + obj.message + '</li>')
    $('.chat-messages').animate({ scrollTop: 9999 }, 'slow');
}
ws.onclose = function () {
    console.log("Desconectados!");
}
$("input").on("keypress", function (e) {
    console.log(e)
    if (e.which == 13) {
        ws.send(JSON.stringify({ sender: "Guillermo Alaix", message: $(this).val() }));
        $(this).val("");
        $('.chat-messages').animate({ scrollTop: 9999 }, 'slow');
    }
}); */

