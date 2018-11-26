// content.js

//real: 1
//suspicus/phishing : -1

//var containsIpAddress = ThereIsIpAddress("document.URL");


var url_length = document.URL.length;

var containsArroba = document.URL.indexOf("@") > -1;
var containsDoubleBar = document.URL.indexOf("//") > -1;
var containsDoubleGuion = document.URL.indexOf("-") > -1;
var containsTinyUrl = document.URL.indexOf("bit") > -1; //son lo mismo
var containsBit = document.URL.indexOf("tinyurl") > -1;//son lo mismo
var containsHttps = document.URL.indexOf("https") > -1;


var bitArroba = 0;
var bitDouberBar = 0;
var bitDoubleGuion = 0;
var bitLength = 0;
var bitDots = 0;
var bitTinyUrl = 0;
var bitHttps = 0;


//I set the bits
(containsArroba) ? bitArroba = -1 : bitArroba = 0  ;

(containsDoubleBar) ? bitDouberBar = -1 : bitDouberBar = 0 ;

(containsDoubleGuion) ? bitDoubleGuion = -1 :  bitDoubleGuion = 0;

(url_length >= 54) ? bitLength = -1 : bitLength = 0;

(analyseDots() > 0) ? bitDots = -1 : bitDots = 0;

(containsTinyUrl || containsBit) ? bitTinyUrl = -1 : bitTinyUrl = 0;

(!containsHttps) ? bitHttps = -1 : bitHttps = 0;




function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getDomainAge(){
	var result = httpGet("https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_r102dYXjtciL9KgO9Oic7D2aKhQpq&domainName=goshipages.com");
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(result,"text/xml");
	var age = xmlDoc.getElementsByTagName('estimatedDomainAge');
	return age[0].childNodes[0].nodeValue
}


IsPhysingWebSite();

function IsPhysingWebSite(){
    if(document.URL == "https://goshipages.com/"){
    	getDomainAge();
        alert("a"+ window.location.href+ " "+location.host);       
    }
}


//return a value >=2 if is physhing
//return a value = 1 if is suspicius
//return a value < 1 if  is authentic 
function analyseDots()
{
	//i have to get of the www. and the country code (example .uk for United Kingdom)
	//then return the amount of dots left, the result is explained above.
	var amountOfDots = -1;

	if(document.URL.indexOf("www.") > -1)
		amountOfDots = document.URL.split(".").length - 3;
	else
		amountOfDots = document.URL.split(".").length - 2;

	return amountOfDots;
}



/*function ThereIsIpAddress(ipaddress) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
return (false)
}*/


/*

function IsPhysingWebSite(){
    if(document.URL == "https://goshipages.com/"){
        alert("WARNING: This is a phishing website "+containsIpAddress);       
    }
}

IsPhysingWebSite();
*/
