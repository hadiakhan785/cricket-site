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

        success: function (info) {
            console.log(info);
            document.querySelector(".id-info-container").style.display = "none";
            document.querySelector(".player-info-container").style.display = "block";

            $('.spinner').hide();
            playerInfoBox.innerHTML = "";
            playerInfoBox.innerHTML = `
                <div class="player-info-item" data-aos="zoom-out-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                    <div class="info-head">
                        <div class="player-img" style="background-image: url(${info.imageURL});">

                        </div>

                        <div class="p-bio-data">
                            <div class="name">
                                <h4>${info.name}</h4>
                            </div>

                            <div class="p-name">
                                Full Name:
                                <span class="full-name">
                                    ${info.fullName}
                                </span>
                            </div>

                            <div class="date-of-birth">
                                Born:
                                <span class="born">
                                    ${info.born}
                                </span>
                            </div>

                            <div class="p-age">
                                Age:
                                <span class="age">
                                    ${info.currentAge}
                                </span>
                            </div>  
                        </div>

                    </div>

                    <div class="info-body">

                        <div class="major-teams">
                            Major Teams:
                            <span class="teams">
                                ${info.majorTeams}
                            </span>
                        </div>

                        <div class="p-country">
                            Country:
                            <span class="country">
                                ${info.country}
                            </span>
                        </div>

                        <div class="p-bowling-style">
                            Bowling Style:
                            <span class="bowling-style">
                                ${info.bowlingStyle}
                            </span>
                        </div>

                        <div class="p-batting-style">
                            Batting Style:
                            <span class="batting-style">
                                ${info.battingStyle}
                            </span>
                        </div>

                        <div class="p-stats">
                            <canvas id="bowling-chart" width="400" height="400"></canvas>
                            <canvas id="batting-chart" width="400" height="400"></canvas>
                        </div>

                    </div>
                </div>`;


            //for ODI Bowling
            let bowling = parseInt(info.data.bowling.ODIs["4w"]);
            let fiveWickets = parseInt(info.data.bowling.ODIs["5w"]);
            let average = parseInt(info.data.bowling.ODIs["Ave"]);
            let balls = parseInt(info.data.bowling.ODIs["Balls"]);
            let runs = parseInt(info.data.bowling.ODIs["Runs"]);
            let wickets = parseInt(info.data.bowling.ODIs["Wkts"]);

            var ctx = document.getElementById("bowling-chart").getContext('2d');
            var bowlingChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'ODIs Bowling',
                        data: [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(251, 233, 231, 1)',
                            'rgba(191, 54, 12, 1)',
                            'rgba(239, 154, 154, 1)',
                            'rgba(229, 57, 53, 1)',
                            'rgba(244, 81, 30, 1)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(251, 233, 231, 1)',
                            'rgba(191, 54, 12, 1)',
                            'rgba(239, 154, 154, 1)',
                            'rgba(229, 57, 53, 1)',
                            'rgba(244, 81, 30, 1)'
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
                    }
                }
            });

            function addData(chart, label, data) {
                chart.data.labels.push(label);
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.push(data);
                });
                chart.update();
            }

            addData(bowlingChart, "4w", bowling);
            addData(bowlingChart, "5w", fiveWickets);
            addData(bowlingChart, "Ave", average);
            addData(bowlingChart, "Balls", balls);
            addData(bowlingChart, "Runs", runs);
            addData(bowlingChart, "Wicket", wickets);

            //for ODI batting
            let fours = parseInt(info.data.batting.ODIs["4s"]);
            let sixes = parseInt(info.data.batting.ODIs["6s"]);
            let aver = parseInt(info.data.batting.ODIs["Ave"]);
            let highScores = parseInt(info.data.batting.ODIs["HS"]);
            let runsBatting = parseInt(info.data.batting.ODIs["Runs"]);
            let innings = parseInt(info.data.batting.ODIs["Inns"]);

            var ctx = document.getElementById("batting-chart").getContext('2d');
            var battingChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'ODIs Batting',
                        data: [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(251, 233, 231, 1)',
                            'rgba(191, 54, 12, 1)',
                            'rgba(239, 154, 154, 1)',
                            'rgba(229, 57, 53, 1)',
                            'rgba(244, 81, 30, 1)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(251, 233, 231, 1)',
                            'rgba(191, 54, 12, 1)',
                            'rgba(239, 154, 154, 1)',
                            'rgba(229, 57, 53, 1)',
                            'rgba(244, 81, 30, 1)'
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
                    }
                }
            });

            function addData(chart, label, data) {
                chart.data.labels.push(label);
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.push(data);
                });
                chart.update();
            }

            addData(battingChart, "4s", fours);
            addData(battingChart, "6s", sixes);
            addData(battingChart, "Ave", aver);
            addData(battingChart, "HS", highScores);
            addData(battingChart, "Runs", runsBatting);
            addData(battingChart, "Inns", innings);
        },

        error: function (err) {
            console.log(err);

            $('.spinner').hide();

            let playerInfoBox = document.querySelector(".player-info-container");

            playerInfoBox.innerHTML = "Something went wrong";
        }
    });
}
