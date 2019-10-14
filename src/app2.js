import style from './style.scss';
import $ from 'jquery';
import "bootstrap";
import Handlebars from 'handlebars';

const getUsers = async () => {
    let response = await fetch("https://makeitreal.s3.amazonaws.com/chats/users.json");
    let jsonData = response.json();
    return jsonData;
}

const getMessages = async (url) => {
    let response = await fetch(url);
    let jsonData = response.json();
    return jsonData;
}

var users = [];

$(document).ready(() => {
    getUsers().then(e => {
        var source = document.getElementById("user-template").innerHTML;
        var template = Handlebars.compile(source);
        e.forEach((user, i) => {
            users[i] = user;
            var context = { name: user.name, status: user.connected ? "online" : "", id: i };
            var html = template(context);
            $(".user-list ul").append(html);
        });
    })
});

$(".user-list ul").on("click", "li", function () {
    $(".active").removeClass("active");
    $(this).addClass("active");
    var id = $(this).attr("user-id")
    getMessages(users[id].url).then(e => {
        var source = document.getElementById("message-template").innerHTML;
        var template = Handlebars.compile(source);
        $(".chat").html("");
        e.forEach((user) => {
            $(".chat").append(template(user));
        });
    })
})