import './main.css';
import './font-awesome.scss';
import 'jquery';
import 'jquery-snowfall';
import { promisifyWebOS } from 'webostv-as-promised';
import { default as filter } from 'leo-profanity';
import { default as profanitylist } from './profanitylist.js';

console.log("Bundle date: "+process.env.BUNDLE_DATE);

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);

if(window.webOS !== undefined){ // TODO: better WebOS TV support
  const promisedWebOS = promisifyWebOS(window.webOS); 
  console.log(promisedWebOS.libVersion);
  console.log(promisedWebOS.systemInfo());
  promisedWebOS.deviceInfo()
    .then(info => console.log(info));
} else {
  console.log("Running in browser...");
}

function startSnow(){
  $(document).snowfall({
    deviceorientation: true,
    image: "images/flake.png",
    round: true,
    minSize: 15,
    maxSize: 30
  });
}

function stopSnow(){
  $(document).snowfall('clear');
}

if(urlParams.has('name') || urlParams.has('prefix')){
  filter.loadDictionary('it');
  filter.loadDictionary('en');
  filter.add(profanitylist);
  console.log("Loaded "+filter.list().length+" bad words");
}

$( document ).ready(function() {
  var prefix = "Da";
  var footerName = "Matteo";
  if(urlParams.has('prefix')) prefix = filter.clean(urlParams.get("prefix"));
  if(!prefix.endsWith(" ")) prefix += " ";
  if(urlParams.has('name')) footerName = filter.clean(urlParams.get("name"));
  $("#footer").text(prefix+footerName);
  console.log( "Buone feste da Matteo. Per vedere il codice sorgente della pagina e le configurazioni usate per WebPack, guarda il codice su Github a https://github.com/Matteogheza/auguri" );
  if(!urlParams.has('noSnow')) startSnow();
});

$(window).on('resize', function(e) {
  console.log("Page resized");
  if(!urlParams.has('noSnow')) {
    stopSnow();
    setTimeout(startSnow, 20);
  }
});

window.startSnow = startSnow; //todo: replace this with function expose
window.stopSnow = stopSnow;

var owa_baseUrl = 'https://www.vvfvolontaridarfo.it/wp-content/plugins/owa/';
var owa_cmds = owa_cmds || [];
owa_cmds.push(['setSiteId', '688e98570db7b36bbfe8c434956024e4']);
owa_cmds.push(['trackPageView']);
owa_cmds.push(['trackClicks']);
owa_cmds.push(['trackDomStream']);

(function() {
	var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true;
	owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl );
	_owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
	var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s);
}());