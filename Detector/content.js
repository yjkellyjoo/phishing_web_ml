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
var age = 100; //HERE I SHOULD CALL THE API, I DO NOT DO IT BECOUSE I DONT WANT TO WASTE CALLS


var bitArroba = 0;
var bitDouberBar = 0;
var bitDoubleGuion = 0;
var bitLength = 0;
var bitDots = 0;
var bitTinyUrl = 0;
var bitHttps = 0;
var bitAge = 0;
var bitPort = badPort();
var bitPageRank = 0;
var bitIpAddress = 0;

//I set the bits
(containsArroba) ? bitArroba = -1 : bitArroba = 0  ;

(containsDoubleBar) ? bitDouberBar = -1 : bitDouberBar = 0 ;

(containsDoubleGuion) ? bitDoubleGuion = -1 :  bitDoubleGuion = 0;

(url_length >= 54) ? bitLength = -1 : bitLength = 0;

(analyseDots() > 0) ? bitDots = -1 : bitDots = 0;

(containsTinyUrl || containsBit) ? bitTinyUrl = -1 : bitTinyUrl = 0;

(!containsHttps) ? bitHttps = -1 : bitHttps = 0;

(age < 365) ? bitAge = -1 : bitAge = 0;

(getWebsiteRank() < 2) ? bitPageRank = -1 : bitPageRank = 0;

(!theresIpAddress()) ? bitIpAddress = -1 : bitIpAddress = 0;



function getWebsiteRank(){
	var hostname;
	if(!(new URL(document.URL)).hostname.toString().includes("www."))
		hostname = "www."+(new URL(document.URL)).hostname.toString();
	else
		hostname = (new URL(document.URL)).hostname.toString();

	var api = 'https://openpagerank.com/api/v1.0/getPageRank?domains[]='+hostname;
	var key = "c84w084sg0gwk0co48s44wwwgc08ok8888c80kcw";
	var url = document.URL;
	var domains = [url];
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", api, false ); // false for synchronous request
	xmlHttp.setRequestHeader("API-OPR", key);
    xmlHttp.send( null );
    var obj = JSON.parse(xmlHttp.responseText);
    var rank = obj.response[0].page_rank_decimal;
    return xmlHttp.responseText;
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getDomainAge(){
	var hostname = (new URL(document.URL)).hostname.toString();
	var result = httpGet("https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_r102dYXjtciL9KgO9Oic7D2aKhQpq&domainName="+hostname);
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(result,"text/xml");
	var age = xmlDoc.getElementsByTagName('estimatedDomainAge');
	return age[0].childNodes[0].nodeValue;
}

IsPhysingWebSite();

function badPort(){
	var result = -1;
	var port = location.port;
	var goodPorts = ["21", "22", "23" ,"80","443","445","1433","1521","3306", "3389"];

	goodPorts.forEach(function(element) {
	  if(element == port) result = 0;
	});
	if(port == "") result = 0;
	return result;
}

function IsPhysingWebSite(){
    if(document.URL == "https://goshipages.com/"){
    	//getDomainAge();
        alert("a"+ window.location.href+ " "+location.port);       
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


//TODO: fix the regular expression for the hexadecimal ip address.
function theresIpAddress(){
	var url = document.URL;
	var values = url.split("/");
	var theresIp = false;
	//0[xX][0-9a-fA-F]+
	values.forEach(function(element) {
	  var resultOfdecimalNumbers = element.search("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$");
	  //Check resultOfHexaDecimalNumbers regular expression, I DID IT BUT BADLY. 
	  var resultOfHexaDecimalNumbers = element.search("^((0[xX][0-9a-fA-F]+)\.){3}(0[xX][0-9a-fA-F]+)$");

	  if(resultOfdecimalNumbers > -1 || resultOfHexaDecimalNumbers > -1) theresIp = true;
	});
	
	alert(theresIp);
}


/*

function IsPhysingWebSite(){
    if(document.URL == "https://goshipages.com/"){
        alert("WARNING: This is a phishing website "+containsIpAddress);       
    }
}

IsPhysingWebSite();
*/
