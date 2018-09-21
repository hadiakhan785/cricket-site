let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function initialize() {

    $('.spinner').show();

    $.ajax({
        url: `https://cricapi.com/api/matches?apikey=60A6H8V6czf4VXXufsrvdl5hEbH2`,
        success: function (data) {
            console.log(data);

            let scheduleBox = document.querySelector('.schedule-container');

            $('.spinner').hide();

            for (let i = 0; i < data.matches.length; i++) {

                const dateObject = new Date(data.matches[i].date);
                const month = months[dateObject.getMonth()];
                const date = dateObject.getDate();
                const year = dateObject.getFullYear();
                
                const matchTimeObject = new Date(data.matches[i].dateTimeGMT);
                const hour = matchTimeObject.getHours();
                const minute = matchTimeObject.getMinutes();

                scheduleBox.innerHTML += ` 
                <div class="schedule-item">
                    <div class="match-date">
                        <p>${date} ${month.slice(0,3)}, ${year}</p>
                    </div>


                    <div class="match-detail">
                        <p class="teams-name"> Teams:
                            <span class="team-1">${data.matches[i]["team-1"]}</span> vs.
                            <span class="team-2">${data.matches[i]["team-2"]}</span>
                        </p>
                        
                        <p class="match-time"> Timings:
                            <span class="match-start-time">${hour}:${minute} GMT</span>
                        </p>
                        
                        <p class="match-type"> Match Type:
                            <span class="type">${data.matches[i].type}</span>
                        </p>
                    </div>
                </div>`;
            }


        },
        error: function (err) {
            console.log(err);

            $('.spinner').hide();

        }

    });
}