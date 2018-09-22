function initialize() {
    $("#id-inp").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#id-search").click();
        }
    });

    // $("#name-inp").keyup(function (event) {
    //     if (event.keyCode === 13) {
    //         $("#info-search").click();
    //     }
    // });
}

function showID() {
    let userInp = document.querySelector("#id-inp").value;

    $('.spinner').show();

    $.ajax({
        url: `https://cricapi.com/api/playerFinder?apikey=60A6H8V6czf4VXXufsrvdl5hEbH2&name=${userInp}`,
        success: function (info) {
            console.log(info);

            document.querySelector(".player-info-container").style.display = "none";
            document.querySelector(".id-info-container").style.display = "flex";

            $('.spinner').hide();

            let idBox = document.querySelector(".id-info-container");
            idBox.innerHTML = "";
            for (let i = 0; i < info.data.length; i++) {
                idBox.innerHTML += `<div class="id-info-item">
                        <p class="player-name">${info.data[i].fullName}</p>
                        <p class="player-id">${info.data[i].pid}</p>
                    </div>`;
            }
        },
        error: function (err) {
            console.log(err);

            $('.spinner').hide();
            let idBox = document.querySelector(".id-info-container");

            idBox.innerHTML = "Something went wrong";
        }
    });
}

function showInfo() {
    let playerId = document.querySelector("#name-inp").value;
    let playerInfoBox = document.querySelector(".player-info-container");

    $('.spinner').show();

    $.ajax({
        url: `https://cricapi.com/api/playerStats?apikey=60A6H8V6czf4VXXufsrvdl5hEbH2&pid=${playerId}`,

        success: function (data) {
            console.log(data);
            document.querySelector(".id-info-container").style.display = "none";
            document.querySelector(".player-info-container").style.display = "block";

            $('.spinner').hide();
            playerInfoBox.innerHTML = "";
            playerInfoBox.innerHTML = `
                <div class="player-info-item">
                    <div class="info-head">
                        <div class="player-img" style="background-image: url(${data.imageURL});">

                        </div>

                        <div class="p-bio-data">
                            <div class="name">
                                <h4>${data.name}</h4>
                            </div>

                            <div class="p-name">
                                Full Name:
                                <span class="full-name">
                                    ${data.fullName}
                                </span>
                            </div>

                            <div class="date-of-birth">
                                Born:
                                <span class="born">
                                    ${data.born}
                                </span>
                            </div>

                            <div class="p-age">
                                Age:
                                <span class="age">
                                    ${data.currentAge}
                                </span>
                            </div>  
                        </div>

                    </div>

                    <div class="info-body">

                        <div class="major-teams">
                            Major Teams:
                            <span class="teams">
                                ${data.majorTeams}
                            </span>
                        </div>

                        <div class="p-country">
                            Country:
                            <span class="country">
                                ${data.country}
                            </span>
                        </div>

                        <div class="p-bowling-style">
                            Bowling Style:
                            <span class="bowling-style">
                                ${data.bowlingStyle}
                            </span>
                        </div>

                        <div class="p-batting-style">
                            Batting Style:
                            <span class="batting-style">
                                ${data.battingStyle}
                            </span>
                        </div>

                    </div>
                </div>`;
        },

        error: function (err) {
            console.log(err);

            $('.spinner').hide();

            let playerInfoBox = document.querySelector(".player-info-container");

            playerInfoBox.innerHTML = "Something went wrong";
        }
    });
}