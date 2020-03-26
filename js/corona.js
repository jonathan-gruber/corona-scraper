/*LOAD STATISTCS AT PAGE LOAD*/


$(document).ready(function () {

    if(document.getElementById("total-1").textContent == "01"){

    $.ajax({
        url: 'https://4g587l795m.execute-api.us-east-1.amazonaws.com/default/country-query?country=France',
        type: 'get',
        success: function (data) {

            document.getElementById("total-2").textContent = data.Item.TotalCases;
            document.getElementById("new-cases-2").textContent = data.Item.NewCases;
            document.getElementById("deaths-2").textContent = data.Item.TotalDeaths;
        }
    })

    $.ajax({
        url: 'https://4g587l795m.execute-api.us-east-1.amazonaws.com/default/country-query?country=Israel',
        type: 'get',
        success: function (data) {
            document.getElementById("total-1").textContent = data.Item.TotalCases;
            document.getElementById("new-cases-1").textContent = data.Item.NewCases;
            document.getElementById("deaths-1").textContent = data.Item.TotalDeaths;
        }
    })

    $.ajax({
        url: 'https://4g587l795m.execute-api.us-east-1.amazonaws.com/default/country-query?country=Total:',
        type: 'get',
        success: function (data) {
            document.getElementById("country3").textContent = data.Item.country;
            document.getElementById("total-3").textContent = data.Item.TotalCases;
            document.getElementById("new-cases-3").textContent = data.Item.NewCases;
            document.getElementById("deaths-3").textContent = data.Item.TotalDeaths;
        }
    })
    update_graph(document.getElementById("country1").textContent, document.getElementById("country2").textContent, document.getElementById("country3").textContent)
}





    // ON PAGE CLICK
    document.getElementById("country-submit").addEventListener("click", function (e) {
        e.preventDefault()
        //     sessionStorage.setItem("var_custom_country", document.getElementById("country-custom").value);
        let var_country1 = document.getElementById("selected-country-1").value;
        let var_country2 = document.getElementById("selected-country-2").value;
        let var_country3 = document.getElementById("selected-country-3").value;
console.log("second country")
console.log(var_country2)

        $.ajax({
            url: 'https://4g587l795m.execute-api.us-east-1.amazonaws.com/default/country-query?country=' + var_country1,
            type: 'get',
            success: function (data1) {
                console.log("COUNTRY 1 GET RESULT AFTER CLICK");
                console.log(data1);
                document.getElementById("country1").textContent = data1.Item.country;
                document.getElementById("total-1").textContent = data1.Item.TotalCases;
                document.getElementById("new-cases-1").textContent = data1.Item.NewCases;
                document.getElementById("deaths-1").textContent = data1.Item.TotalDeaths;
            }
        })

        $.ajax({
            url: 'https://4g587l795m.execute-api.us-east-1.amazonaws.com/default/country-query?country=' + var_country2,
            type: 'get',
            success: function (data2) {
                console.log("COUNTRY 2 GET RESULT AFTER CLICK");
                console.log(data2);
                document.getElementById("country2").textContent = data2.Item.country;
                document.getElementById("total-2").textContent = data2.Item.TotalCases;
                document.getElementById("new-cases-2").textContent = data2.Item.NewCases;
                document.getElementById("deaths-2").textContent = data2.Item.TotalDeaths;
            }
        })

        $.ajax({
            url: 'https://4g587l795m.execute-api.us-east-1.amazonaws.com/default/country-query?country=' + var_country3,
            type: 'get',
            success: function (data3) {
                console.log("COUNTRY 3 GET RESULT AFTER CLICK");
                console.log(data3);
                document.getElementById("country3").textContent = data3.Item.country;
                document.getElementById("total-3").textContent = data3.Item.TotalCases;
                document.getElementById("new-cases-3").textContent = data3.Item.NewCases;
                document.getElementById("deaths-3").textContent = data3.Item.TotalDeaths;
            }
        })
        update_graph(var_country1, var_country2, var_country3)
    });


    // drawing on Chart.js


});



function update_graph(countryA, countryB, countryC){
    $.ajax({
        url: 'https://mtq1yomxtf.execute-api.us-east-1.amazonaws.com/default/country_query_history?country=' + countryC,
        type: 'get',
        success: function (data3) {
            console.log("PREPARE COUNTRY GRAPH3");
            console.log(data3);

            $.ajax({
                url: 'https://mtq1yomxtf.execute-api.us-east-1.amazonaws.com/default/country_query_history?country=' + countryA,
                type: 'get',
                success: function (data1) {
                    console.log("PREPARE COUNTRY GRAPH1");
                    console.log(data1);
                    $.ajax({
                        url: 'https://mtq1yomxtf.execute-api.us-east-1.amazonaws.com/default/country_query_history?country=' + countryB,
                        type: 'get',
                        success: function (data2) {
                            console.log("PREPARE COUNTRY GRAPH2");
                            console.log(data2);
                            var TotalCases1 = [];
                            var TotalCases2 = [];
                            var TotalCases3 = [];
                            var date = [];
                            var date1 = [];
                            var date2 = [];
                            var date3 = [];
                            data1.Items.forEach(function (item) {
                                date1.push(item.corona_day.toString());
                                TotalCases1.push(item.TotalCases.replace(/([.,])(\d\d\d\D|\d\d\d$)/g, '$2').toString());
                            });
                            data2.Items.forEach(function (item) {
                                date2.push(item.corona_day.toString());
                                TotalCases2.push(item.TotalCases.replace(/([.,])(\d\d\d\D|\d\d\d$)/g, '$2').toString());
                            });

                            console.log(TotalCases2[3].replace(/([.,])(\d\d\d\D|\d\d\d$)/g, '$2'));


                            data3.Items.forEach(function (item) {
                                date3.push(item.corona_day.toString());
                                TotalCases3.push(item.TotalCases.replace(/([.,])(\d\d\d\D|\d\d\d$)/g, '$2').toString());
                            });

console.log("DATES")
console.log("date1: "+ date1)
console.log("date2: "+ date2)

                            date = date1
                            if (date2.length > date1.length) {
                                date = date2
                                for (i=0; i<(date2.length - date1.length); i++  ){
                                    TotalCases1.unshift(0)
                                }
                            }
                            if (date2.length < date1.length) {
                                date = date1
                                for (i=0; i<(date1.length - date2.length); i++  ){
                                    TotalCases2.unshift(0)
                                }
                            }
                            //Chart.js code


                            var lineChartData = {
                                labels: date,
                                datasets: [{

                                    label: countryA,
                                    borderColor: "#3e95cd",
                                    pointBorderColor: "#80b6f4",
                                    pointBackgroundColor: "#80b6f4",
                                    pointHoverBackgroundColor: "#80b6f4",
                                    pointHoverBorderColor: "#80b6f4",
                                    pointBorderWidth: 10,
                                    pointHoverRadius: 10,
                                    pointHoverBorderWidth: 1,
                                    pointRadius: 3,
                                    fill: false,
                                    borderWidth: 4,
                                    data: TotalCases1,
                                    yAxisID: 'y-axis-1',
                                }, {

                                    label: countryB,
                                    borderColor: "#FF0000",
                                    pointBorderColor: "#DC143C",
                                    pointBackgroundColor: "#DC143C",
                                    pointHoverBackgroundColor: "#DC143C",
                                    pointHoverBorderColor: "#DC143C",
                                    pointBorderWidth: 10,
                                    pointHoverRadius: 10,
                                    pointHoverBorderWidth: 1,
                                    pointRadius: 3,
                                    fill: false,
                                    borderWidth: 4,
                                    data: TotalCases2,
                                    yAxisID: 'y-axis-1',
                                },
                                ]
                            };

                            var lineOptions = {
                                responsive: true,
                                hoverMode: 'index',
                                stacked: false,
                                title: {
                                    display: true,
                                    text: ''
                                },
                                scales: {
                                    yAxes: [{
                                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                        display: true,
                                        position: 'left',
                                        id: 'y-axis-1',
                                    },
                                    {
                                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                        display: true,
                                        position: 'right',
                                        id: 'y-axis-2',
                                    }],
                                }
                            }

                            var lineChartData3 = {
                                labels: date3,
                                datasets: [{
                                    label: countryC,
                                    borderColor: "#3e95cd",
                                    pointBorderColor: "#80b6f4",
                                    pointBackgroundColor: "#80b6f4",
                                    pointHoverBackgroundColor: "#80b6f4",
                                    pointHoverBorderColor: "#80b6f4",
                                    pointBorderWidth: 10,
                                    pointHoverRadius: 10,
                                    pointHoverBorderWidth: 1,
                                    pointRadius: 3,
                                    fill: false,
                                    borderWidth: 4,
                                    data: TotalCases3,
                                    yAxisID: 'y-axis-1',
                                },
                                ]
                            };

                            var lineOptions3 = {
                                responsive: true,
                                hoverMode: 'index',
                                stacked: false,
                                title: {
                                    display: true,
                                    text: ''
                                },
                                scales: {
                                    yAxes: [{
                                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                        display: true,
                                        position: 'left',
                                        id: 'y-axis-1',
                                    }],
                                }
                            }

                            var ctx = document.getElementById("canvas").getContext("2d");

                            window.myLine = new Chart(ctx, {
                                type: "line",
                                data: lineChartData,
                                options: lineOptions,
                                responsive: true,
                                pointDot: false
                            });
                            var ctx = document.getElementById("canvas2").getContext("2d");
                            window.myLine = new Chart(ctx, {
                                type: "line",
                                data: lineChartData3,
                                options: lineOptions3,
                                responsive: true,
                                pointDot: false
                            });
                        }
                    })
                }
            })
        }
    })
}
