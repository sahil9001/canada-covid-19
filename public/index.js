google.load('visualization', '1', { 'packages': ['geochart'] });
google.setOnLoadCallback(drawVisualization);
const url = 'https://raw.githubusercontent.com/stevenliuyi/covid19/master/public/data/all.json';

async function drawVisualization() {
    let obj = [];
    await fetch(url)
        .then(response => response.json())
        .then(data => {
           // console.log(data.sheets["latest totals"]); // Prints result from `response.json()` in getRequest
            obj.push(['State','Confirmed'])
          //  console.log(data);
            obj.push([data["加拿大"]["不列颠哥伦比亚省"].ENGLISH,data["加拿大"]["不列颠哥伦比亚省"].confirmedCount[Object.keys(data["加拿大"]["不列颠哥伦比亚省"].confirmedCount)[Object.keys(data["加拿大"]["不列颠哥伦比亚省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["安大略省"].ENGLISH,data["加拿大"]["安大略省"].confirmedCount[Object.keys(data["加拿大"]["安大略省"].confirmedCount)[Object.keys(data["加拿大"]["安大略省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["新布伦瑞克省"].ENGLISH,data["加拿大"]["新布伦瑞克省"].confirmedCount[Object.keys(data["加拿大"]["新布伦瑞克省"].confirmedCount)[Object.keys(data["加拿大"]["新布伦瑞克省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["新斯科舍省"].ENGLISH,data["加拿大"]["新斯科舍省"].confirmedCount[Object.keys(data["加拿大"]["新斯科舍省"].confirmedCount)[Object.keys(data["加拿大"]["新斯科舍省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["曼尼托巴省"].ENGLISH,data["加拿大"]["曼尼托巴省"].confirmedCount[Object.keys(data["加拿大"]["曼尼托巴省"].confirmedCount)[Object.keys(data["加拿大"]["曼尼托巴省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["爱德华王子岛省"].ENGLISH,data["加拿大"]["爱德华王子岛省"].confirmedCount[Object.keys(data["加拿大"]["爱德华王子岛省"].confirmedCount)[Object.keys(data["加拿大"]["爱德华王子岛省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["纽芬兰与拉布拉多省"].ENGLISH,data["加拿大"]["纽芬兰与拉布拉多省"].confirmedCount[Object.keys(data["加拿大"]["纽芬兰与拉布拉多省"].confirmedCount)[Object.keys(data["加拿大"]["纽芬兰与拉布拉多省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["育空地区"].ENGLISH,data["加拿大"]["育空地区"].confirmedCount[Object.keys(data["加拿大"]["育空地区"].confirmedCount)[Object.keys(data["加拿大"]["育空地区"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["至尊公主号"].ENGLISH,data["加拿大"]["至尊公主号"].confirmedCount[Object.keys(data["加拿大"]["至尊公主号"].confirmedCount)[Object.keys(data["加拿大"]["至尊公主号"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["艾伯塔省"].ENGLISH,data["加拿大"]["艾伯塔省"].confirmedCount[Object.keys(data["加拿大"]["艾伯塔省"].confirmedCount)[Object.keys(data["加拿大"]["艾伯塔省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["萨斯喀彻温省"].ENGLISH,data["加拿大"]["萨斯喀彻温省"].confirmedCount[Object.keys(data["加拿大"]["萨斯喀彻温省"].confirmedCount)[Object.keys(data["加拿大"]["萨斯喀彻温省"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["西北地区"].ENGLISH,data["加拿大"]["西北地区"].confirmedCount[Object.keys(data["加拿大"]["西北地区"].confirmedCount)[Object.keys(data["加拿大"]["西北地区"].confirmedCount).length-1]]])
            obj.push([data["加拿大"]["魁北克省"].ENGLISH,data["加拿大"]["魁北克省"].confirmedCount[Object.keys(data["加拿大"]["魁北克省"].confirmedCount)[Object.keys(data["加拿大"]["萨斯喀彻温省"].confirmedCount).length-1]]])
            obj.push(['Nunavut',0])
        //    console.log(obj)
        })
        .catch(error => console.error(error))
    var data = google.visualization.arrayToDataTable(obj
    )
    console.log(data)
    var opts = {
        region: 'CA',
       // displayMode: 'regions',
        resolution: 'provinces',
        colorAxis:{ colors:['#e7eff6','#00059f']},

    };
    function resize() {
    var geochart = new google.visualization.GeoChart(
        document.getElementById('visualization'));
    geochart.draw(data, opts);
    }
    window.onload = resize;
    window.onresize = resize;
};
