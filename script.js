let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function initialize() {

    $('.spinner').show();
    $.ajax({
        url: `https://newsapi.org/v2/everything?sources=espn-cric-info&apiKey=79c794b797384c589d86219fff3b24d5`,
        success: function (data) {
            console.log(data);

        $('.spinner').hide();
            
            let newsBox = document.querySelector(".news-container");

            for (let i = 0; i < data.articles.length; i++) {

                if (data.articles[i].title.length > 80) {
                    data.articles[i].title = data.articles[i].title.slice(0, 80);
                    data.articles[i].title += "...";
                }

                const dateObject = new Date(data.articles[i].publishedAt);
                const month = months[dateObject.getMonth()];
                const date = dateObject.getDate();
                const year = dateObject.getFullYear();

                newsBox.innerHTML += ` 
                <div class="news-item">
                    <div class="news-head">
                        <div class="news-img" style="background-image: url('${data.articles[i].urlToImage}')">

                        </div>
                    </div>

                    <div class="news-body">
                        <div class="news-title">
                            <h3>${data.articles[i].title}</h3>
                        </div>

                        <div class="news-description">
                            <p>${data.articles[i].description.slice(0, 70) + "..."}<a href="${data.articles[i].url}" class="news-link" target="_blank">Read More</a> </p>                        
                        </div>

                        <div class="publish-time">
                            <p>
                                <i class="far fa-clock"></i> ${month}${date}, ${year}
                            </p>
                        </div>
                    </div>
                </div>`;
            }
        },
        error: function (err) {
            $('.spinner').hide();
            let newsBox = document.querySelector(".news-container");
            newsBox.innerHTML = "Something Went Wrong";
            
            
        }
    });
}