


function initMap() {
    const map = L.map('map', {
        maxBounds: [
          [51.756338, 19.464765], // Southwest coordinates (south, west)
          [51.743076, 19.447256], // Southwest coordinates (south, west)
        ],
        minZoom: 15.4, // Set the minimum zoom level
      }).setView([51.749229, 19.453483], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
      }).addTo(map);


    var popup = L.popup();

    function onMapClick(e) {

        console.log("[",e.latlng["lat"],",",e.latlng["lng"],"]")
    }

    map.on('click', onMapClick);

    var marker = L.marker([51.752511, 19.452952]).addTo(map);



    var mechaniczny_v1 = L.polygon([
        [51.752375, 19.451704],
        [51.752844, 19.451589],
        [51.752928, 19.45245],
        [51.75245, 19.45256]
    ]).addTo(map);

    var mechaniczny_v2 = L.polygon([
        [51.753177, 19.451519],
        [51.753513, 19.451439],
        [51.753594, 19.452292],
        [51.753259, 19.45237]
    ]).addTo(map);

    mechaniczny_v1.setStyle({
        fillColor: 'blue',
        color: 'blue',
        weight: 3,
      });

    mechaniczny_v2.setStyle({
        fillColor: 'blue',
        color: 'blue',
        weight: 3,
      });

    //
    // mechaniczny_v1.bindPopup("WYDZIAŁ MECHANICZNY\nBUDYNEK A22\nBUDYNEK A22\nBUDYNEK A22\nBUDYNEK A22\nBUDYNEK A22\nBUDYNEK A22\nBUDYNEK A22");
    //to jest Json w ktorym sa dane na temat budynkow
    let bulidingsData = '{"buildings":[' +
        '{"name":"Mechaniczny","addres":"Stefanowskiego 18","code":"A10","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
        '{"name":"Mechaniczny2","addres":"Mechaniczny addres234567" },' +
        '{"name":"Mechaniczny3","addres":"Mechaniczny addres" }]}';
//to jest funkcja ktora przypisuje funkcej tworzaca okienko z informacjamido danego budynku
    //na podstawie przekazanej nazwy zasysa dane z JSONA bulidingsData
    //
    function addBuilindEvent(name) {
        var elemDiv = document.createElement('div');
        elemDiv.id="floating-info-box"

        var blur = document.createElement('div');
        blur.id="blur"
        // blur.style.height=screen.height+"px"

        var closeBtn = document.createElement('button');
        closeBtn.id="close-floating-info-box"
        // closeBtn.append("X")
        closeBtn.addEventListener("click",() => {
            document.getElementById("floating-info-box").remove()
            document.getElementById("blur").remove()
        },"false")

        blur.addEventListener("click",() => {
            document.getElementById("floating-info-box").remove()
            document.getElementById("blur").remove()
        },"false")

        elemDiv.append(closeBtn)

        const obj = JSON.parse(bulidingsData);


        var infoCode = document.createElement('span');
        infoCode.classList.add("info-box")
        infoCode.append("KOD BUDYNKU: "+obj.buildings.filter(function(item) { return item.code === name; })[0]['code'])
        elemDiv.append(infoCode)

        var info1 = document.createElement('span');
        info1.classList.add("info-box")
        info1.append("NAZWA: "+obj.buildings.filter(function(item) { return item.code === name; })[0]['name'])
        elemDiv.append(info1)

        var found = obj.buildings.filter(function(item) { return item.code === name; })[0]['addres']

        var info2 = document.createElement('span');
        info2.classList.add("info-box")
        info2.append("ADRES: "+found)
        elemDiv.append(info2)

        var qr = document.createElement("img");
        qr.src = obj.buildings.filter(function(item) { return item.code === name; })[0]['QRSrc']
        qr.id="qrImage"
        elemDiv.append(qr)

        var image = document.createElement("img");
        image.src = obj.buildings.filter(function(item) { return item.code === name; })[0]['imgSrc']
        image.id="bdImage"
        elemDiv.append(image)




        document.body.appendChild(elemDiv);
        document.body.appendChild(blur);



    }

    //przypisanie do danego budynku funkcji od okienka jako argument kod budynku :))
    //WAZNE nazwa w argumencie musi znajdowac sie w jsonie inaczej kraksa
    mechaniczny_v1.addEventListener("click",()=>addBuilindEvent("A10"),false)

      // mechaniczny_v2.bindPopup("WYDZIAŁ MECHANICZNY\nBUDYNEK A20");

    var chemiczny_v1 = L.polygon([
        [51.752476, 19.450693],
        [51.7523, 19.450731],
        [51.752244, 19.450001],
        [51.75241, 19.449947],
        [51.752416, 19.449964],
        [51.753187, 19.449797],
        [51.753193, 19.449781],
        [51.75336, 19.449749],
        [51.753423, 19.450495],
        [51.75325, 19.450527],
        [51.75321, 19.450049],
        [51.753157, 19.450071],
        [51.753163, 19.450098],
        [51.752489, 19.450243],
        [51.752489, 19.450205],
        [51.752439, 19.450221]
    ]).addTo(map);

    chemiczny_v1.setStyle({
        fillColor: 'red',
        color: 'red',
        weight: 3,
      });

    // chemiczny_v1.bindPopup("WYDZIAŁ CHEMICZNY\nBUDYNEK A33");

  }


  document.addEventListener('DOMContentLoaded', initMap);

