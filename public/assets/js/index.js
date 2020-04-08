google.load('visualization', '1', { 'packages': ['geochart'] });
google.setOnLoadCallback(drawVisualization);
const url = 'https://raw.githubusercontent.com/stevenliuyi/covid19/master/public/data/all.json';

async function drawVisualization() {
    let obj = [];
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data.sheets["latest totals"]); // Prints result from `response.json()` in getRequest
            obj.push(['State', 'Confirmed'])
             // console.log(data["加拿大"]);
            
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    for (var key in data["加拿大"]) {
        if (!data["加拿大"].hasOwnProperty(key)) continue;
        var obj1 = data["加拿大"][key];
        var obje = obj1.ENGLISH;
        var objc = obj1.confirmedCount;
        if(obje !== undefined && !isEmpty(objc)){
            obj.push([obje,objc[Object.keys(objc)[Object.keys(objc).length - 1]]]);
        }
        else if(isEmpty(objc) && obje !== undefined){
            obj.push([obje,0])
        }
    }
    obj.push(['Nunavut', 0])
            console.log(obj)
        })
        .catch(error => console.error(error))
    var data = google.visualization.arrayToDataTable(obj
    )
    console.log(data)
    var opts = {
        region: 'CA',
        // displayMode: 'regions',
        resolution: 'provinces',
        colorAxis: { colors: ['#e7eff6', '#00059f'] },
        
    };

    var geochart = new google.visualization.GeoChart(
        document.getElementById('visualization'));
    geochart.draw(data, opts);
    $(window).resize(function(){
        drawVisualization();
      });
};
