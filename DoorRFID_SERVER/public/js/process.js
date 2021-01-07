const IP = "192.168.1.250"
var socket = io('http://' + IP + ':8000');
var ReqURL = 'http://' + IP + ':8000';

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var userToken = getCookie("access-token");
console.log("cookie:" + userToken);
console.log("user " + jQuery.parseJSON(getCookie("user-data")).Name);
var config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
    },
};
var socketSignal = false;
socket.on('new-card', (msg) => {
    console.log('done');
    $("#allowsubmit").removeAttr('disabled');
    $("#idcard").val(msg);
});
socket.on('status-door', (msg) => {
    socketSignal = true;
    $('#toggle-event').bootstrapToggle(msg);
});
socket.on('status-mode', (msg) => {
    console.log(msg);
    $("input#" + msg + "").prop("checked", true);
    console.log($("input:radio[name=options]:checked").val());
    $(".btn-outline-success").removeClass('active');
    $("#" + $("input:radio[name=options]:checked").val() + "").addClass('active');
});
$(document).ready(function () {
    $("#myname").text(jQuery.parseJSON(getCookie("user-data")).Name);
    if (!jQuery.parseJSON(getCookie("user-data")).admin) {
        $("#addmember").attr('disabled', 'disabled');
        $("#addmember").hide();
        $("#myModal1").hide();
    }
    const userToken = getCookie("access-token");
    $("#toggle-event").change(function () {
        if (!socketSignal) {
            if ($("#toggle-event").prop("checked") == true) {
                socket.emit('open-door');
            } else {
                socket.emit('close-door');
            }
        } else { socketSignal = false; }
    });
    $('#allowaddcard').click(() => {
        socket.emit('allow-add-card');
    })
    $('#check-mode').change(function () {
        socket.emit('status-mode', $("input:radio[name=options]:checked").val())
    })
    $('#addmember').click(function () {
        console.log('ready')
        $("#allowsubmit").attr('disabled', 'disabled');
    });

})
function check() {
    var formData = JSON.stringify($("#register-form").serializeArray());
    if (jQuery.parseJSON(getCookie("user-data")).admin) {
        $.ajax({
            type: 'POST',
            data: formData,
            cache: false,
            contentType: 'application/json',
            datatype: "json",
            url: '/addmember',
            headers: { 'Authorization': 'Bearer ' + userToken },
            success: function (returns) {
                if (returns == "Ok"){
                    alert("User save");
                    $("#register-form").trigger('reset');
                    $("#allowsubmit").attr('disabled', 'disabled');
                }
                else if(returns == "ga"){
                    alert("hack cc");
                }
                else
                    alert("Save Fail!!!")
            }
        });
    }else{
        alert("Hack cc");
    }
}
var app = angular.module('myApp', []);
app.controller('customersCtrl', function ($scope, $http) {
    $http.post(ReqURL + "/getdatamember", {}, config)
        .then(function (response) {
            console.log('haha')
            $scope.names = response.data
            console.log($scope.names);
        });
});
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        datasets: [{
            label: '# of Votes',
            data: [12, 25, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',

            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Biểu đồ tần suất vào phòng'
        }
    }
});