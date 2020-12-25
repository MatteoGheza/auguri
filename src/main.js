import './main.css';
import './font-awesome.scss';
import 'jquery';
import 'jquery-snowfall';
import { promisifyWebOS } from 'webostv-as-promised';
import { default as filter } from 'leo-profanity';
import {default as profanitylist} from './profanitylist.js';

console.log("Bundle date: "+process.env.BUNDLE_DATE);

filter.loadDictionary('it');
filter.loadDictionary('en');
filter.add(profanitylist);
console.log("Loaded "+filter.list().length+" bad words");

const urlParams = new URLSearchParams(window.location.search);

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

$( document ).ready(function() {
  console.log( "Buon Natale da Matteo. Per vedere il codice sorgente della pagina e le configurazioni usate per WebPack, guarda il codice su Github a " );
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