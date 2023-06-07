let MECHANICZNY,
    EEIA,
    CHEMICZNY,
    TMIWT,
    BINOZ,
    BAIIS,
    FTIMS,
    ZIP,
    IPOS,
    ADMINISTRACJA,
    OGOLNOUCZELNIANE,
    POZAWYDZIALOWE,
    POZOSTALE;
let map;
const polygons = new Map();

//to jest Json w ktorym sa dane na temat budynkow
let bulidingsData =
    '{"buildings":[' +
    '{"name":"Wydział Chemiczny","addres":"Żeromskiego 114","code":"A18","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Administracja","addres":"Żeromskiego 116","code":"A17","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"IFE","addres":"Żwirki 36","code":"A16","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Mechaniczny","addres":"Stefanowskiego 1/15","code":"A18","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Inżynierii Procesowej i Ochrony Środowiska","addres":"n/a","code":"A24","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Chemiczny","addres":"n/a","code":"A26","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Chemiczny","addres":"ul. Żeromskiego 114","code":"A34","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Chemiczny","addres":"Żeromskiego 116","code":"A27","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Mechaniczny","addres":"Żeromskiego 116","code":"A19","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Administracja","addres":"Żeromskiego 116","code":"A28","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Mechaniczny","addres":"Żeromskiego 116","code":"A20","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Mechaniczny","addres":"Stefanowskiego 1/15","code":"A22","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Mechaniczny","addres":"Żeromskiego 116","code":"A21","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Chemiczny","addres":"n/a","code":"A33","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Żeromskiego 116","code":"A30","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Inżynierii Procesowej i Ochrony Środowiska","addres":"Stefanowskiego 2","code":"A1","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Biotechnologii i Nauk o Żywności","addres":"Stefanowskiego 4/10","code":"A2","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Biotechnologii i Nauk o Żywności","addres":"Stefanowskiego 4/10","code":"A3","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Biotechnologii i Nauk o Żywności","addres":"Stefanowskiego 4/10","code":"A4","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Wólczańska 175","code":"A5","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Inżynierii Procesowej i Ochrony Środowiska","addres":"n/a","code":"A6","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Chemiczny Instytut Technologii Polimerów i Barwników","addres":"Stefanowskiego 12/16","code":"A8","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Chemiczny Instytut Technologii Polimerów i Barwników","addres":"Stefanowskiego 12/16","code":"A9","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Elektrotechniki Elektroniki Informatyki i Automatyki","addres":"Stefanowskiego 18/22","code":"A12_A","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Elektrotechniki Elektroniki Informatyki i Automatyki","addres":"ul. Żeromskiego 116,","code":"A12_B","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Elektrotechniki Elektroniki Informatyki i Automatyki","addres":"Stefanowskiego 18/22","code":"A11","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Elektrotechniki Elektroniki Informatyki i Automatyki","addres":"Wólczańska 175","code":"A10","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Administracja","addres":"Radwańska 29","code":"A13","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Administracja","addres":"Wólczańska 181","code":"A15","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Ks. I. Skorupki 6/8","code":"B1","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Ks. I. Skorupki 6/8","code":"B2","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Ks. I. Skorupki 10/12","code":"B3","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Inżynierii Procesowej i Ochrony Środowiska","addres":"Wólczańska 213","code":"B4","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Inżynierii Procesowej i Ochrony Środowiska","addres":"Wólczańska 213","code":"B5","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Budownictwa, Architektury i Inżynierii Środowiska","addres":"Politechniki 6","code":"B6","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Budownictwa, Architektury i Inżynierii Środowiska","addres":"n/a","code":"B7","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Fizyki Technicznej, Informatyki i Matematyki Stosowanej","addres":"Wólczańska 215","code":"B11","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Inżynierii Procesowej i Ochrony Środowiska","addres":"Wólczańska 213","code":"B10","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Elektrotechniki Elektroniki Informatyki i Automatyki","addres":"Wólczańska 215","code":"B9","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Żeromskiego 116","code":"B28","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Politechniki 12","code":"B25","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Ogólnouczelniane","addres":"Wólczańska 223","code":"B22","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Wólczańska 237","code":"B21","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Wólczańska","code":"B20","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Elektrotechniki Elektroniki Informatyki i Automatyki","addres":"Wólczańska 221","code":"B18","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Wólczańska 223","code":"B17","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Fizyki Technicznej, Informatyki i Matematyki Stosowanej","addres":"Wólczańska 219/223","code":"B14","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Fizyki Technicznej, Informatyki i Matematyki Stosowanej","addres":"Stefanowskiego 1/15","code":"B15","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Wydział Mechaniczny","addres":"Wólczańska 219/223","code":"B13","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Pozawydziałowe","addres":"Wólczańska 215","code":"B12","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" },' +
    '{"name":"Administracja","addres":"Wólczańska 217/221","code":"B19","imgSrc":"images/A10img.jpg","QRSrc":"images/A10QR.png" }' +
    ']}';


let clickedPolygon;
let clickedPolygonColor;
let clickedPolygonFillColor;
let clickedPolygonThickness;


function addBuilindEvent(code) {
  var elemDiv = document.createElement("div");
  elemDiv.id = "floating-info-box";

  var blur = document.createElement("div");
  blur.id = "blur";
  // blur.style.height=screen.height+"px"

  var closeBtn = document.createElement("button");
  closeBtn.id = "close-floating-info-box";
  // closeBtn.append("X")
  closeBtn.addEventListener(
      "click",
      () => {
        document.getElementById("floating-info-box").remove();
        document.getElementById("blur").remove();
      },
      "false"
  );

  blur.addEventListener(
      "click",
      () => {
        document.getElementById("floating-info-box").remove();
        document.getElementById("blur").remove();
      },
      "false"
  );

  elemDiv.append(closeBtn);

  const obj = JSON.parse(bulidingsData);

  var infoCode = document.createElement("span");
  infoCode.classList.add("info-box");
  infoCode.append(
      "KOD BUDYNKU: " +
      obj.buildings.filter(function (item) {
        return item.code === code;
      })[0]["code"]
  );
  elemDiv.append(infoCode);

  var info1 = document.createElement("span");
  info1.classList.add("info-box");
  info1.append(
      "NAZWA: " +
      obj.buildings.filter(function (item) {
        return item.code === code;
      })[0]["name"]
  );
  elemDiv.append(info1);

  var found = obj.buildings.filter(function (item) {
    return item.code === code;
  })[0]["addres"];

  var info2 = document.createElement("span");
  info2.classList.add("info-box");
  info2.append("ADRES: " + found);
  elemDiv.append(info2);

  var imageDescription = document.createElement("span");
  imageDescription.classList.add("image-descriptiono-box");
  imageDescription.append("Zdjęcie budynku");
  elemDiv.append(imageDescription);

  var QrDescription = document.createElement("span");
  QrDescription.classList.add("QR-descriptiono-box");
  QrDescription.append("kod QR do strony wydziału");
  elemDiv.append(QrDescription);


  var qr = document.createElement("img");
  qr.src="images/"+code+"QR.png"
  qr.id = "qrImage";
  elemDiv.append(qr);



  var image = document.createElement("img");
  image.src="images/"+code+"img.jpg"
  image.id = "bdImage";
  elemDiv.append(image);
  if(clickedPolygon)
  {
    clickedPolygon.setStyle({
      fillColor: clickedPolygonFillColor,
      color: clickedPolygonColor,
      weight: clickedPolygonThickness,
    });
  }
  clickedPolygonFillColor=polygons.get(code).options.fillColor
  clickedPolygonThickness=polygons.get(code).options.weight
  clickedPolygonColor=polygons.get(code).options.color
  clickedPolygon=polygons.get(code)

  map.fitBounds(polygons.get(code).getBounds())
  map.panTo(polygons.get(code).getCenter())
  polygons.get(code).setStyle({
    fillColor: "red",
    color: "lightgreen",
    weight: 10,
  });

  document.body.appendChild(elemDiv);
  document.body.appendChild(blur);
}


function initMap() {
   map = L.map("map", {
    maxBounds: [
      [51.756338, 19.464765], // Southwest coordinates (south, west)
      [51.743076, 19.447256], // Southwest coordinates (south, west)
    ],
    minZoom: 15.4, // Set the minimum zoom level
  }).setView([51.749229, 19.453483], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data &copy; OpenStreetMap contributors",
  }).addTo(map);

  var popup = L.popup();

  function onMapClick(e) {
    console.log("[", e.latlng["lat"], ",", e.latlng["lng"], "]");
  }

  map.on("click", onMapClick);

  var marker = L.marker([51.752511, 19.452952]).addTo(map);
  var A34 = L.polygon([
    [51.754684920607694, 19.449234008789066],
    [51.75473143692068, 19.449770450592045],
    [51.754678275416225, 19.449781179428104],
    [51.75468824320307, 19.449952840805057],
    [51.75442908003003, 19.450027942657474],
    [51.75441246695538, 19.449834823608402],
    [51.75436262769482, 19.44984555244446],
    [51.7543725955513, 19.44986164569855],
    [51.75436262769482, 19.44985628128052],
    [51.75432275624672, 19.44937884807587],
    [51.75435598245589, 19.449368119239807],
    [51.75435265983609, 19.449298381805423],
  ]).addTo(map);

  var A26 = L.polygon([
    [51.75411994183136, 19.450280070304874],
    [51.75415316818977, 19.450263977050785],
    [51.75416313609251, 19.45036053657532],
    [51.754136555013616, 19.45037126541138],
    [51.754186394523686, 19.450934529304504],
    [51.75409003808793, 19.450950622558597],
    [51.75402358525383, 19.450263977050785],
    [51.75411994183136, 19.450242519378662],
    [51.75411994183136, 19.450280070304874],
  ]).addTo(map);

  var A18 = L.polygon([
    [51.75401012716228, 19.451835751533512],
    [51.75438226188474, 19.451755285263065],
    [51.75438226188474, 19.451792836189274],
    [51.7544188106653, 19.451782107353214],
    [51.75440884281901, 19.45164799690247],
    [51.75439555235384, 19.45164799690247],
    [51.754388907119775, 19.451503157615665],
    [51.75440219758691, 19.451503157615665],
    [51.75438226188474, 19.451326131820682],
    [51.7544188106653, 19.451320767402652],
    [51.75442213328027, 19.451336860656742],
    [51.75445535941634, 19.451336860656742],
    [51.75445203680381, 19.451245665550235],
    [51.75444539157807, 19.451245665550235],
    [51.75444539157807, 19.451229572296146],
    [51.75456168288741, 19.451208114624027],
    [51.75456168288741, 19.451229572296146],
    [51.75479426460776, 19.451181292533878],
    [51.754810877541956, 19.451310038566593],
    [51.75480755495558, 19.451310038566593],
    [51.75480423236898, 19.45136368274689],
    [51.75481752271391, 19.45136368274689],
    [51.75482084529952, 19.451379776000977],
    [51.75482749047002, 19.451433420181278],
    [51.75480755495558, 19.451444149017338],
    [51.75482749047002, 19.451631903648376],
    [51.754844103392, 19.451631903648376],
    [51.754870684054424, 19.451964497566227],
    [51.754036708315574, 19.452157616615295],
    [51.75400680451703, 19.451835751533512],
  ]).addTo(map);

  var A19 = L.polygon([
    [51.754005938620665, 19.451857620606464],
    [51.754039165062906, 19.452147299180073],
    [51.753650414158365, 19.452254587540665],
    [51.7536238327777, 19.45193272245888],
    [51.753892968534124, 19.451868349442524],
    [51.753892968534124, 19.451879078278584],
  ]).addTo(map);

  var A21 = L.polygon([
    [51.75314685655717, 19.451524615287784],
    [51.752881039082766, 19.45158898830414],
    [51.7528876845387, 19.451766014099125],
    [51.75316014738982, 19.451712369918827],
  ]).addTo(map);

  var A30 = L.polygon([
    [51.752615381978075, 19.45116519927979],
    [51.752558895230955, 19.45117056369782],
    [51.75258547723839, 19.451433420181278],
    [51.7526319957138, 19.451428055763248],
  ]).addTo(map);
  
  var A16 = L.polygon([
    [51.75518855514744, 19.450860619581366],
    [51.75500581406354, 19.450903534925605],
    [51.75510549111008, 19.452067613638068],
    [51.755294876892364, 19.452030062711856],
  ]).addTo(map);

  var A2 = L.polygon([
    [51.75498026770147, 19.45265114307404],
    [51.75393032218699, 19.452860355377197],
    [51.75394693543898, 19.45309638977051],
    [51.75499688056725, 19.45288717746735],
  ]).addTo(map);

  var A3 = L.polygon([
    [51.75475815552406, 19.45293784132446],
    [51.75480467176157, 19.453506469635617],
    [51.75490767183129, 19.453474283127438],
    [51.754950865339, 19.454005360512387],
    [51.75467509069502, 19.454075097946774],
    [51.75464850991746, 19.45369958868469],
    [51.75469834886256, 19.45369958868469],
    [51.75464850991746, 19.45296466341461],
  ]).addTo(map);

  var A4 = L.polygon([
    [51.75464149046949, 19.453702569007877],
    [51.754585006256484, 19.453707933425907],
    [51.754585006256484, 19.453686475753788],
    [51.75437235917375, 19.453734755516052],
    [51.75437235917375, 19.453750848770145],
    [51.754319197246645, 19.453766942024235],
    [51.75433581035559, 19.453954696655277],
    [51.75440226273027, 19.453949332237247],
    [51.754412230578026, 19.454019069671634],
    [51.75448532806112, 19.454008340835575],
    [51.754528521972794, 19.454544782638553],
    [51.75444213410813, 19.454555511474613],
    [51.754452101947116, 19.45464134216309],
    [51.75432916511275, 19.454673528671268],
    [51.754352423458435, 19.454984664916996],
    [51.75441887580868, 19.454973936080936],
    [51.754412230578026, 19.454823732376102],
    [51.75472787795278, 19.454748630523685],
    [51.75471791017469, 19.45459306240082],
    [51.75464481306807, 19.454609155654907],
    [51.754585006256484, 19.453927874565128],
    [51.75466807125119, 19.453901052474976],
  ]).addTo(map);

  var A6 = L.polygon([
    [51.75420988746006, 19.453310966491703],
    [51.75424975900777, 19.453702569007877],
    [51.754219855350286, 19.453702569007877],
    [51.75420988746006, 19.453675746917728],
    [51.75410356316072, 19.453707933425907],
    [51.75410356316072, 19.453729391098022],
    [51.754120176349005, 19.453729391098022],
    [51.754120176349005, 19.453750848770145],
    [51.754110208436764, 19.453756213188175],
    [51.754120176349005, 19.45387959480286],
    [51.75425972688922, 19.45384740829468],
    [51.75428298527065, 19.454051256179813],
    [51.75419659693634, 19.45408880710602],
    [51.75419659693634, 19.454169273376465],
    [51.75411685371182, 19.454185366630558],
    [51.754110208436764, 19.45409953594208],
    [51.75396068948932, 19.45414245128632],
    [51.75393743094188, 19.4539225101471],
    [51.7540902726057, 19.45387959480286],
    [51.75407033676583, 19.453707933425907],
    [51.75392081768638, 19.453750848770145],
    [51.75388426850276, 19.453386068344116],
  ]).addTo(map);

  var A13 = L.polygon([
    [51.752474335541976, 19.453743338781354],
    [51.752490949329555, 19.453737974363325],
    [51.75250424035522, 19.453850627141946],
    [51.75239126651234, 19.45388817806816],
    [51.75238129821849, 19.453861355978006],
    [51.75235803885767, 19.45383453388786],
    [51.75234142502122, 19.453727245527265],
    [51.75235139332383, 19.453727245527265],
    [51.75235139332383, 19.453689694601056],
    [51.75244110794846, 19.453662872510908],
    [51.75245772174827, 19.453646779256818],
    [51.75246436726647, 19.453662872510908],
    [51.752474335541976, 19.453684330183023],
    [51.75246436726647, 19.453705787855146],
  ]).addTo(map);

  var A15 = L.polygon([
    [51.75292783644874, 19.454952478408813],
    [51.75294112734586, 19.455032944679264],
    [51.75296106368419, 19.455022215843204],
    [51.75296770912832, 19.45511341094971],
    [51.752944450069506, 19.455129504203796],
    [51.75296106368419, 19.455274343490604],
    [51.75285805917477, 19.455290436744693],
    [51.75282815459577, 19.454979300498966],
  ]).addTo(map);

  var A9 = L.polygon([
    [51.753608893102886, 19.45309102535248],
    [51.75332646487375, 19.45314466953278],
    [51.75337630527783, 19.453756213188175],
    [51.75365873319528, 19.453691840171818],
  ]).addTo(map);

  var A8 =
    L.polygon([
      [51.7535386329497, 19.452978372573856],
      [51.75352534222843, 19.452753067016605],
      [51.753193072925534, 19.452812075614933],
      [51.7532196545597, 19.453058838844303],
      [51.753392434800595, 19.453010559082035],
      [51.753405725561, 19.45312857627869],
      [51.75362502254259, 19.453074932098392],
      [51.753631667889046, 19.452951550483704],
      [51.75358515044333, 19.452967643737797],
      [51.75359179579566, 19.453010559082035],
      [51.75355856902424, 19.453010559082035],
      [51.7535386329497, 19.452978372573856],
    ]).addTo(map);

  var A10 = L.polygon([
    [51.75302397759252, 19.453750848770145],
    [51.75295087774411, 19.45287644863129],
    [51.752538858204026, 19.452956914901737],
    [51.75261860421482, 19.45384204387665],
  ]).addTo(map);

  var A11 = L.polygon([
    [51.753027352426344, 19.453750848770145],
    [51.75315361551274, 19.453707933425907],
    [51.75315693822078, 19.453729391098022],
    [51.753150292804456, 19.453729391098022],
    [51.753150292804456, 19.453783035278324],
    [51.75315693822078, 19.453783035278324],
    [51.753166906343395, 19.45389032363892],
    [51.75319681069807, 19.45389032363892],
    [51.753216746923556, 19.454051256179813],
    [51.75332971870159, 19.454013705253605],
    [51.753326396006265, 19.453954696655277],
    [51.75334300948042, 19.453943967819217],
    [51.7532998144349, 19.453461170196537],
    [51.75301073883609, 19.453514814376835],
  ]).addTo(map);

  var A12_A = L.polygon([
    [51.753336395733314, 19.454008340835575],
    [51.75336629997579, 19.454464316368107],
    [51.75380157059668, 19.4543731212616],
    [51.753765021316546, 19.4539225101471],
  ]).addTo(map);

  var A12_B = L.polygon([
    [51.75333991572391, 19.454019069671634],
    [51.75336649727167, 19.454458951950077],
    [51.75309735837782, 19.454534053802494],
    [51.75311729464719, 19.454791545867923],
    [51.753000999618536, 19.454818367958072],
    [51.75298438601856, 19.45464134216309],
    [51.752868090647645, 19.454684257507328],
    [51.75288138156235, 19.45484519004822],
    [51.75284150880654, 19.45485591888428],
    [51.75281824968274, 19.454684257507328],
    [51.75277505413533, 19.454700350761417],
    [51.75274847223943, 19.454469680786136],
    [51.75280163601554, 19.454458951950077],
    [51.75278502234223, 19.454281926155094],
    [51.75272521306772, 19.454292654991153],
    [51.75270859936633, 19.45407807826996],
    [51.752768408662796, 19.454061985015873],
    [51.752745149501365, 19.453809857368473],
    [51.75278834507738, 19.453804492950443],
    [51.752808281483155, 19.454040527343754],
    [51.75292125428292, 19.454024434089664],
    [51.752901317927034, 19.453772306442264],
    [51.75301761321238, 19.453740119934086],
    [51.75305416309737, 19.45408880710602],
  ]).addTo(map);

  var A5 = L.polygon([
    [51.75433681233604, 19.454767704264672],
    [51.75435674805828, 19.454987645403893],
    [51.7541640357081, 19.4550251963301],
    [51.7541407772654, 19.454783797518758],
    [51.75417732624142, 19.454767704264672],
    [51.75419061677081, 19.454799890772847],
    [51.75419726203403, 19.454810619608907],
    [51.754203907296315, 19.45481598402694],
  ]).addTo(map);

  var A1 = L.polygon([
    [51.75531988188624, 19.452323317673294],
    [51.75535975245398, 19.452886581566418],
    [51.75517701206282, 19.45292413249263],
    [51.755170366943744, 19.452875852730358],
    [51.75503746435707, 19.452897310402477],
    [51.755000916077165, 19.452457428124035],
    [51.755050754633324, 19.452435970451916],
    [51.75504410949569, 19.45235013976344],
    [51.75524014064519, 19.452296495583145],
    [51.75525010830802, 19.45233941092738],
    [51.75530659168917, 19.452323317673294],
  ]).addTo(map);

  var A17 = L.polygon([
    [51.75513626088959, 19.45038199424744],
    [51.754989561560436, 19.450419545173645],
    [51.75499339048523, 19.450526833534244],
    [51.755003358202536, 19.450526833534244],
    [51.75501332591763, 19.450596570968628],
    [51.755003358202536, 19.45062339305878],
    [51.755003358202536, 19.45065021514893],
    [51.75501664848886, 19.450677037239075],
    [51.755036583910965, 19.45089161396027],
    [51.75519274441316, 19.450848698616028],
  ]).addTo(map);

  var A24 = L.polygon([
    [51.75455845520561, 19.45066094398499],
    [51.75437238895362, 19.450698494911197],
    [51.754398969893714, 19.451041817665104],
    [51.754565100414716, 19.451009631156925],
    [51.75455180999552, 19.450848698616028],
    [51.754568423018895, 19.450848698616028],
  ]).addTo(map);

  var A27 = L.polygon([
    [51.7538543590195, 19.450076222419742],
    [51.75368822588393, 19.45011377334595],
    [51.7537546792115, 19.450843334198],
    [51.75373142055798, 19.450843334198],
    [51.7537546792115, 19.4510954618454],
    [51.753767969865265, 19.4510954618454],
    [51.75383442307551, 19.451782107353214],
    [51.753993910381084, 19.451739192008976],
    [51.75393410270748, 19.451074004173282],
    [51.75400387831899, 19.451057910919193],
    [51.75397729714636, 19.45076286792755],
    [51.75391748945078, 19.450784325599674],
  ]).addTo(map);

  var A28 = L.polygon([
    [51.75366354744785, 19.451191264133744],
    [51.75356731934544, 19.451218086223893],
    [51.75351848468089, 19.450719952583317],
    [51.75361709252746, 19.450697737675004],
  ]).addTo(map);

  var A22 = L.polygon([
    [51.752375, 19.451704],
    [51.752844, 19.451589],
    [51.752928, 19.45245],
    [51.75245, 19.45256],
  ]).addTo(map);

  var A20 = L.polygon([
    [51.753177, 19.451519],
    [51.753513, 19.451439],
    [51.753594, 19.452292],
    [51.753259, 19.45237],
  ]).addTo(map);


  var A33 = L.polygon([
    [ 51.7522435848091 , 19.449985680055377 ],
    [ 51.752303361217564 , 19.45071504257092 ],
    [ 51.75246807801751 , 19.450693145933457 ],
    [ 51.75244151083153 , 19.45022120548222 ],
    [ 51.752488003396735 , 19.45021584252254 ],
    [ 51.75249464518786 , 19.450237294361248 ],
    [ 51.753158819367734 , 19.450103220369417 ],
    [ 51.753165461060235 , 19.450065679651683 ],
    [ 51.753208632037484 , 19.450060316692007 ],
    [ 51.753251802973516 , 19.450521531223934 ],
    [ 51.7534211654778 , 19.450494716425553 ],
    [ 51.753361390548804 , 19.4497439020713 ],
    [ 51.75318538613179 , 19.44978680574871 ],
    [ 51.75319202782035 , 19.449808257587378 ],
    [ 51.75241826453096 , 19.44996378341791 ],
    [ 51.75241826453096 , 19.449947694538885 ],
    [ 51.752245577352255 , 19.449990455297336 ],
    [ 51.752305353758075 , 19.450725180772558 ]
  ]).addTo(map);

  


  //Kampus B

  var B1 = L.polygon([
    [ 51.748617762401544 , 19.45551924542737 ],
    [ 51.74866762242555 , 19.45550845941369 ],
    [ 51.74867094965156 , 19.455529899492685 ],
    [ 51.74870089467447 , 19.455572779650666 ],
    [ 51.74874404572165 , 19.455567406436074 ], 
    [ 51.74877731791429 , 19.455513806238596 ], 
    [ 51.74879395400142 , 19.455513806238596 ], 
    [ 51.74881059008242 , 19.45548164612011 ], 
    [ 51.74878729956731 , 19.455170764974596 ], 
    [ 51.748687482937925 , 19.455192205053592 ], 
    [ 51.74868079219168 , 19.455229562455482 ], 
    [ 51.74859095702337 , 19.45524564251473 ]
  ]).addTo(map);


  
  var B2 = L.polygon([
    [ 51.74879075664692 , 19.45450580869572 ],
    [ 51.74880732303747 , 19.454698947206225 ], 
    [ 51.7488835283557 , 19.45468285233035 ], 
    [ 51.748886841627474 , 19.45467212241312 ], 
    [ 51.74894979374529 , 19.454661392495844 ], 
    [ 51.74897961313891 , 19.454994019930677 ], 
    [ 51.74902931208449 , 19.454983290013402 ], 
    [ 51.74898623966813 , 19.45446825398534 ], 
    [ 51.74879075664692 , 19.454500443737082 ]
  ]).addTo(map);

  var B3 = L.polygon([
    [ 51.74847885420959 , 19.452962206716162 ], 
    [ 51.748498734014795 , 19.453241184564707 ], 
    [ 51.74855837337784 , 19.45323045464747 ], 
    [ 51.74856168667348 , 19.453262644399217 ], 
    [ 51.748627952535244 , 19.453251914481978 ], 
    [ 51.748627952535244 , 19.4532143597716 ], 
    [ 51.7486842784413 , 19.453198264895686 ], 
    [ 51.74867765186776 , 19.45309096572318 ], 
    [ 51.748707471441016 , 19.453080235805942 ], 
    [ 51.74870084487088 , 19.453021221261054 ], 
    [ 51.748674338580614 , 19.453026586219693 ], 
    [ 51.74866108542966 , 19.452919287047145 ], 
    [ 51.74861801266216 , 19.45293001696442 ], 
    [ 51.74861138607892 , 19.452913922088545 ], 
    [ 51.74860144620221 , 19.452913922088545 ], 
    [ 51.748598132909464 , 19.452897827212634 ], 
    [ 51.748531867004 , 19.452913922088545 ], 
    [ 51.748531867004 , 19.45293001696442 ], 
    [ 51.748525240408085 , 19.45294074688165 ], 
    [ 51.74852192710977 , 19.452951476798926 ],
    [ 51.74847885420959 , 19.4529675716748 ]
  ]).addTo(map);

  var B7 = L.polygon([
    [51.74786011244874, 19.45135295391083],
    [51.747959773010976, 19.4524097442627],
    [51.74784682435715, 19.452447295188907],
    [51.74785014638041, 19.45263504981995],
    [51.747511298749394, 19.452720880508426],
    [51.74748472235711, 19.452538490295414],
    [51.74736845045704, 19.452554583549503],
    [51.74727211065596, 19.451487064361576],
    [51.747375094573655, 19.451454877853397],
    [51.74737177251546, 19.4513475894928],
    [51.74773387542091, 19.451245665550235],
    [51.74775712963679, 19.45138514041901],
  ]).addTo(map);

  var B6 = L.polygon([
    [51.74787673671156, 19.45286571979523],
    [51.74789334681443, 19.45310175418854],
    [51.747534567233764, 19.453187584877018],
    [51.74751795699897, 19.452951550483704],
  ]).addTo(map);

  var B5 = L.polygon([
    [ 51.747858437400275 , 19.455308639647676 ], 
    [ 51.74787504357826 , 19.455528602951325 ], 
    [ 51.74794146822906 , 19.455512508075454 ], 
    [ 51.74794146822906 , 19.455555427744475 ], 
    [ 51.747891649750116 , 19.45557152262035 ], 
    [ 51.74789829221717 , 19.455657361958384 ], 
    [ 51.74798132297268 , 19.455635902123877 ], 
    [ 51.747978001745395 , 19.455555427744475 ], 
    [ 51.74796803806205 , 19.455555427744475 ], 
    [ 51.7479647168338 , 19.455501778158222 ], 
    [ 51.74808095967785 , 19.455480318323712 ], 
    [ 51.748061032354386 , 19.455265719978698 ], 
    [ 51.747858437400275 , 19.455314004606315 ]
  ]).addTo(map);

  var B4 = L.polygon([
    [ 51.747942132464956 , 19.45599424291228 ],
    [ 51.747988629661705 , 19.45598887795364 ],
    [ 51.74799394366962 , 19.456011410681644 ],
    [ 51.748070331808556 , 19.455995315805733 ],
    [ 51.748070331808556 , 19.455968491012626 ],
    [ 51.74811682887338 , 19.455957761095352 ],
    [ 51.74811682887338 , 19.455936301260884 ],
    [ 51.74814671981834 , 19.455930936302245 ],
    [ 51.748140077387845 , 19.455829002088336 ],
    [ 51.74813343495636 , 19.455829002088336 ],
    [ 51.74812015009046 , 19.45567878324681 ],
    [ 51.74803047714349 , 19.45569487812272 ],
    [ 51.74802715591982 , 19.45566805332957 ],
    [ 51.74798065876271 , 19.45564122853643 ],
    [ 51.74790360612168 , 19.45565943879465 ],
    [ 51.74790360612168 , 19.455670168711883 ],
    [ 51.747886999954204 , 19.455675533670522 ],
    [ 51.74789032118818 , 19.45573991317401 ],
    [ 51.747926854745856 , 19.45573991317401 ],
    [ 51.747943460898675 , 19.455997431188084 ]
    
  ]).addTo(map);

  var B9 = L.polygon([
    [51.74705630404604, 19.452763795852665],
    [51.74722905195471, 19.452736973762516],
    [51.74741176537, 19.45488810539246],
    [51.747239018160066, 19.454925656318668],
    [51.74713271185635, 19.453777670860294],
    [51.74704301571799, 19.453793764114383],
    [51.74698321819347, 19.453257322311405],
    [51.74703969363537, 19.453235864639286],
    [51.74705630404604, 19.453364610672],
    [51.74709616900669, 19.45335388183594],
    [51.74705298196439, 19.452790617942814],
  ]).addTo(map);

  var B10 = L.polygon([
    [51.74736521961308, 19.455059766769413],
    [51.74722237085878, 19.45509195327759],
    [51.747265557739105, 19.455687403678898],
    [51.74741505046764, 19.45566058158875],
  ]).addTo(map);

  var B11 = L.polygon([
    [51.747408386698524, 19.45584297180176],
    [51.74735523377724, 19.45584297180176],
    [51.74735855583666, 19.45586442947388],
    [51.74727882634328, 19.455912709236145],
    [51.74730540285673, 19.45611119270325],
    [51.74743828518928, 19.456089735031128],
  ]).addTo(map);

  var B28 = L.polygon([
    [51.74711300035767, 19.45091307163239],
    [51.74719937428618, 19.4519054889679],
    [51.745667873595785, 19.4522488117218],
    [51.74559810768578, 19.451229572296146],
  ]).addTo(map);

  var B16 = L.polygon([
    [51.746448498221156, 19.452994465827945],
    [51.746332223653894, 19.453015923500065],
    [51.746368767121574, 19.453541636466984],
    [51.746485041594795, 19.453504085540775],
  ]).addTo(map);

  var B15 = L.polygon([
    [51.7470564565959, 19.454727172851566],
    [51.74642525669959, 19.45492029190064],
    [51.746534886788154, 19.45611655712128],
    [51.74664119449874, 19.456089735031128],
    [51.74662790604859, 19.45585906505585],
    [51.746896996402064, 19.455800056457523],
    [51.74689035221511, 19.455644488334656],
    [51.74712622025369, 19.45559084415436],
  ]).addTo(map);

  var B14 = L.polygon([
    [51.74667434798122, 19.45411562919617],
    [51.74642518907346, 19.454174637794498],
    [51.74646173246593, 19.454764723777775],
    [51.746481665213004, 19.454764723777775],
    [51.74649163158323, 19.45491492748261],
    [51.746760722748455, 19.454807639122013],
  ]).addTo(map);

  var B13 = L.polygon([
    [51.74700657344732, 19.45414781570435],
    [51.7467939594957, 19.454180002212528],
    [51.74682385839311, 19.454539418220524],
    [51.746734161641484, 19.454560875892643],
    [51.74675409426836, 19.454818367958072],
    [51.747059726778865, 19.454732537269596],
  ]).addTo(map);

  var B12 = L.polygon([
    [51.747096284598484, 19.45465207099915],
    [51.74705641963796, 19.45465743541718],
    [51.747149437824454, 19.455746412277225],
    [51.74718265855895, 19.455730319023136],
    [51.747185980631066, 19.45560693740845],
    [51.74720259098789, 19.45559084415436],
    [51.74719926891702, 19.455462098121647],
    [51.74718265855895, 19.455467462539676],
    [51.747096284598484, 19.45466816425324],
  ]).addTo(map);

  var B19 = L.polygon([
    [51.74713287541469, 19.455580115318302],
    [51.746893685317495, 19.4556337594986],
    [51.74693355042165, 19.45612192153931],
    [51.74716277408778, 19.456068277359012],
  ]).addTo(map);

  var B22 = L.polygon([
    [51.745614727222424, 19.453240984803415],
    [51.74543532873941, 19.453257078057504],
    [51.74557153876383, 19.454882496720533],
    [51.74573764799392, 19.454844945794324],
  ]).addTo(map);

  var B25 = L.polygon([
    [51.74557173226382, 19.451256394386295],
    [51.74519300093703, 19.451315402984623],
    [51.74520628980928, 19.45141732692719],
    [51.7455750544544, 19.451336860656742],
  ]).addTo(map);

  var B24 = L.polygon([
    [51.745445357517646, 19.451374411582947],
    [51.74544867971751, 19.451481699943546],
    [51.74554502340736, 19.451465606689453],
    [51.74564468907719, 19.452533125877384],
    [51.745378913469025, 19.452592134475708],
    [51.745282569424916, 19.4515460729599],
    [51.7454054911002, 19.451503157615665],
    [51.74538555787828, 19.45139586925507],
  ]).addTo(map);

  var B17 = L.polygon([
    [51.74631911046943, 19.454544782638553],
    [51.74589055292711, 19.45463061332703],
    [51.74590716376031, 19.454866647720337],
    [51.74594702973505, 19.454866647720337],
    [51.745976929193, 19.45511341094971],
    [51.74608988252226, 19.455081224441532],
    [51.74606994960235, 19.45483982563019],
    [51.74633572114505, 19.454764723777775],
  ]).addTo(map);

  var B21 = L.polygon([
    [51.74563812727429, 19.455462098121647],
    [51.74557832789008, 19.455483555793766],
    [51.74560490540396, 19.455773234367374],
    [51.745671349120194, 19.455751776695255],
  ]).addTo(map);

  var B18 = L.polygon([
    [51.74617294412424, 19.455081224441532],
    [51.74595700408681, 19.45511877536774],
    [51.74605002453718, 19.456191658973697],
    [51.74607660177353, 19.456186294555668],
    [51.746086568233146, 19.456223845481876],
    [51.74623938700501, 19.456186294555668],
    [51.74623938700501, 19.45615947246552],
    [51.746272608408766, 19.45614874362946],
    [51.74616962197765, 19.455075860023502],
  ]).addTo(map);

  var B20 = L.polygon([
    [51.74589390183046, 19.456690549850467],
    [51.74579755888466, 19.456706643104557],
    [51.74580420323234, 19.456808567047123],
    [51.74589390183046, 19.456787109375],
  ]).addTo(map);

  var B23 = L.polygon([
    [51.74475108079913, 19.45399761199951],
    [51.744711213769016, 19.45399761199951],
    [51.74472450278294, 19.45411026477814],
    [51.744754403050074, 19.45409417152405],
  ]).addTo(map);

   MECHANICZNY = new Set([A20, A22, A21, A19, A18]);
  polygons.set("A20",A20)
  polygons.set("A22",A22)
  polygons.set("A21",A21)
  polygons.set("A19",A19)
  polygons.set("A18",A18)

   EEIA = new Set([A12_A, A12_B, A10, A11, B19, B18]);
  polygons.set("A12_A",A12_A)
  polygons.set("A12_B",A12_B)
  polygons.set("A10",A10)
  polygons.set("A11",A11)
  polygons.set("B19",B19)
  polygons.set("B18",B18)

   CHEMICZNY = new Set([A34, A24, A2, A26, A8, A9, A33, A27]);//usuwam a33 bo nei ma dla niego poigona??
  polygons.set("A34",A34)
  polygons.set("A24",A24)
  polygons.set("A2",A2)
  polygons.set("A26",A26)
  polygons.set("A8",A8)
  polygons.set("A9",A9)
  polygons.set("A33",A33)
  polygons.set("A27",A27)


  TMIWT = new Set([A16]);//usuwam a33 bo nei ma dla niego poigona??
  polygons.set("A16",A16)

  BINOZ = new Set([A2, A3, A4]);
  polygons.set("A2",A2)
  polygons.set("A3",A3)
  polygons.set("A4",A4)

   BAIIS = new Set([B7, B6, B16]);
  polygons.set("B7",B7)
  polygons.set("B6",B6)
  polygons.set("B16",B16)

   FTIMS = new Set([B9, B15, B11, B14]);
  polygons.set("B9",B9)
  polygons.set("B15",B15)
  polygons.set("B11",B11)
  polygons.set("B14",B14)

   ZIP = new Set([B9]);
  polygons.set("B9",B9)

  IPOS = new Set([B5, B4, B10, A1, A6]);
  polygons.set("B5",B5)
  polygons.set("B4",B4)
  polygons.set("B10",B10)
  polygons.set("A1",A1)
  polygons.set("A6",A6)

  ADMINISTRACJA = new Set([A17, A28, A13, A15, B3, B2, B1, B19]);
  polygons.set("A17",A17)
  polygons.set("A28",A28)
  polygons.set("A13",A13)
  polygons.set("A15",A15)
  polygons.set("B3",B3)
  polygons.set("B2",B2)
  polygons.set("B1",B1)
  polygons.set("B19",B19)

   OGOLNOUCZELNIANE = new Set([B22, A19]);
  polygons.set("B22",B22)
  polygons.set("A19",A19)

   POZAWYDZIALOWE = new Set([A16, A30, B28, B25, B24, B17, B12]);
  polygons.set("A16",A16)
  polygons.set("A30",A30)
  polygons.set("B28",B28)
  polygons.set("B25",B25)
  polygons.set("B24",B24)
  polygons.set("B17",B17)
  polygons.set("B12",B12)

   POZOSTALE = new Set([B23, B20, B21, B13, A5]);
  polygons.set("B23",B23)
  polygons.set("B20",B20)
  polygons.set("B21",B21)
  polygons.set("B13",B13)
  polygons.set("A5",A5)

  for (const [key, value] of polygons) {
    value.addEventListener("click", () => addBuilindEvent(key), false);
  }



   MECHANICZNY.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "blue",
      weight: 3,
    });
  });
  
  EEIA.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "red",
      weight: 3,
    });
  });
  
  CHEMICZNY.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "green",
      weight: 3,
    });
  });
  
 

  BINOZ.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "orange",
      weight: 3,
    });
  });

  BAIIS.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "purple",
      weight: 3,
    });
  });

  FTIMS.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "yellow",
      weight: 3,
    });
  });

  ZIP.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "pink",
      weight: 3,
    });
  });


  IPOS.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "cyan",
      weight: 3,
    });
  });

  ADMINISTRACJA.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "magenta",
      weight: 3,
    });
  });

  OGOLNOUCZELNIANE.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "lime",
      weight: 3,
    });
  });

  POZAWYDZIALOWE.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "brown",
      weight: 3,
    });
  });

  POZOSTALE.forEach(function (building) {
    building.setStyle({
      fillColor: "gray",
      color: "gray",
      weight: 3,
    });
  });

}

document.addEventListener("DOMContentLoaded", initMap);



const buildingObj = JSON.parse(bulidingsData);
const buildings_names = new Set();
buildingObj.buildings.forEach(obj => {
  // budynki.set(obj.name,obj.code)
  buildings_names.add(obj.name)
})
buildings_names.forEach(name=>{
  let codes=buildingObj.buildings.filter(function (n){
    return n.name===name;
  }).map(function (c) {
    return c.code;
  });
  console.log(name)
  console.log(codes)

  const firstLevelItem=document.createElement('li');
  firstLevelItem.appendChild(document.createTextNode(name));

  firstLevelItem.classList.add("first-level")

  const listView=document.createElement('ul');
  listView.classList.add("second-level")

  for(var i=0;i<codes.length;i++)
  {
    const listViewItem=document.createElement('li');
    listViewItem.appendChild(document.createTextNode(codes[i]));
    const currCode=codes[i]
    listViewItem.addEventListener("click", () => addBuilindEvent(currCode), false);

    listView.appendChild(listViewItem);
  }
  firstLevelItem.append(listView)
  document.getElementById("collapse").appendChild(firstLevelItem);
});




function createCollapsedList(){
  for (let i of document.querySelectorAll(".collapse ul")) {
    let tog = document.createElement("div");
    tog.innerHTML = i.previousSibling.textContent;
    tog.className = "toggle";
    tog.onclick = () => {
      if(tog.classList.contains("show"))
      {
        tog.classList.remove("show")
      }else
      {
        collapseAll()
        tog.classList.toggle("show");

      }
    }
    i.parentElement.removeChild(i.previousSibling);
    i.parentElement.insertBefore(tog, i);
  }
}
createCollapsedList()
function  collapseAll()
{
  for (let tog of document.querySelectorAll(".toggle")) {
    // tog.classList.toggle("show");
    // x.style.display = "none";
    if(tog.classList.contains("show"))
    {
      //
      tog.classList.remove("show")
    }

  }
}

