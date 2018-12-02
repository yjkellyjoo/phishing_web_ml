













// content.js

//real: 1
//suspicus/phishing : -1

//var containsIpAddress = ThereIsIpAddress("document.URL");
 
console.log(is_url("http://www.example.com"));
console.log(is_url("https://www.example.com"));
console.log(is_url("www.example.com"));


var url_length = document.URL.length;

var containsArroba = document.URL.indexOf("@") > -1;
var containsDoubleGuion = document.URL.indexOf("-") > -1;
var containsTinyUrl = document.URL.indexOf("bit") > -1; //son lo mismo
var containsBit = document.URL.indexOf("tinyurl") > -1;//son lo mismo
var containsHttps = document.URL.indexOf("https://") > -1;
var age = getDomainAge(); 


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
var bitAnchor = 0;
var bitTagUrl = 0;


console.log("bitArroba: "+bitArroba);
console.log("bitDouberBar: "+bitDouberBar);
console.log("bitDoubleGuion: "+bitDoubleGuion);
console.log("bitLength: "+bitLength);
console.log("bitDots: "+bitDots);
console.log("bitTinyUrl: "+bitTinyUrl);
console.log("bitHttps: "+bitHttps);
console.log("bitAge: "+bitAge);
console.log("bitPort: "+bitPort);
console.log("bitPageRank: "+bitPageRank);
console.log("bitIpAddress: "+bitIpAddress);
console.log("bitAnchor: "+bitAnchor);
console.log("bitTagUrl: "+bitTagUrl);

//I set the bits
(containsArroba) ? bitArroba = -1 : bitArroba = 1  ;

(containsDoubleBar) ? bitDouberBar = -1 : bitDouberBar = 1 ;

(containsDoubleGuion) ? bitDoubleGuion = -1 :  bitDoubleGuion = 1;

if(url_length >= 54 && url_length <= 75)
	bitLength = 0;
else if(url_length < 54)
	bitLength = 1;
else
	bitLength = -1;

//(analyseDots() > 0) ? bitDots = -1 : bitDots = 1;
//return a value >=2 if is physhing
//return a value = 1 if is suspicius
//return a value < 1 if  is authentic 

amountOfDots = analyseDots()
if(amountOfDots >= 2)
	bitDots = -1;
else if(amountOfDots = 1)
	bitDots = 0;
else
	bitDots = 1;

(containsTinyUrl || containsBit) ? bitTinyUrl = -1 : bitTinyUrl = 1;

(!containsHttps) ? bitHttps = -1 : bitHttps = 1;

(age < 365) ? bitAge = -1 : bitAge = 1;

(getWebsiteRank() < 2) ? bitPageRank = -1 : bitPageRank = 1;

(!theresIpAddress()) ? bitIpAddress = -1 : bitIpAddress = 1;


percentageOfUrl = percentageOfUrlInAnchorTag();
if(percentageOfUrl < 31)
	bitAnchor = 1;
else if(percentageOfUrl >= 31 && percentageOfUrl <=67)
	bitAnchor = 0;
else
	bitAnchor = -1;


var urlsInTags = percentageOfUrlInTags();
if(urlsInTags < 17)
	bitTagUrl = 1;
else if (urlsInTags >=17 && urlsInTags <=81)
	bitTagUrl = 0;
else 
	bitTagUrl = -1;



if(document.URL.indexOf("https://")> -1)
	bitDouberBar = 1;
else if (document.URL.indexOf("//")> -1)
	bitDouberBar = -1;
else 
	bitDouberBar = 1;


var json_data = {
	"having_IP_Address":bitIpAddress, 
	"URL_Length":url_length, 
	"having_At_Symbol":bitArroba, 
	"Shortining_Service":bitTinyUrl,
	"double_slash_redirecting":bitDouberBar, 
	"Prefix_Suffix":bitDoubleGuion, 
	"having_Sub_Domain":bitDots, 
	"HTTPS_token":bitHttps, 
	"URL_of_Anchor":bitAnchor, 
	"age_of_domain":bitAge, 
	"Page_Rank":bitPageRank
}



post_json();


function post_json(){
	xhr = new XMLHttpRequest();
	const url = 'http://localhost:5000/postjson';
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var result = xhr.responseText;

            if(result != 1){
            	alert("Might be a phishing website!!");
            }
        }
    }
	var data = JSON.stringify(json_data);
	xhr.send(data);
}

function percentageOfUrlInTags(){
	var metaTags = document.getElementsByTagName('Meta');
	var scriptTags = document.getElementsByTagName('Script');
	var linkTags = document.getElementsByTagName('Link');
	
	var urlCont = 0;
	var noUrlCont = 0;
	
	for (var idx= 0; idx < metaTags.length; ++idx){
	    if(is_url(metaTags[idx].href))
    		urlCont++;
	    else
    		noUrlCont++;
	    
	}
	for (var idx= 0; idx < scriptTags.length; ++idx){
	    if(is_url(scriptTags[idx].href))
    		urlCont++;
    	else
    		noUrlCont++;
	    
	}
	for (var idx= 0; idx < linkTags.length; ++idx){
	    if(is_url(linkTags[idx].href))
    		urlCont++;
    	else
    		noUrlCont++;
	    
	}
	
	return (urlCont*100) / (noUrlCont+urlCont);	

}



function percentageOfUrlInAnchorTag(){
	var a = document.getElementsByTagName('a');
	var urlCont = 0;
	var noUrlCont = 0;
	var hostName = window.location.hostname;

	for (var idx= 0; idx < a.length; ++idx){
	    if(is_url(a[idx].href)){
	    	if(extractHostname(a[idx].href) != hostName){
	    		urlCont++;
	    	}else{
	    		noUrlCont++;
	    	}
	    }
	}
	return (urlCont*100) / (noUrlCont+urlCont);	

}


function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}


function is_url(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

/*
getRequestUrl();
function getRequestUrl(){
    var badUrls = 0;
    var goodUrls = 0;
    
    var name = window.location.hostname;
    var splitedUrl = name.split(".");
    var domain =splitedUrl[1] +"."+splitedUrl[2];
    alert(domain);
    
    var callback = function(details){
        alert(details);
        if (true){
                goodUrls++;
        } else{
            badUrls++;
        }
    };
    var filter = ["*"];
    
    chrome.webRequest.onBeforeRequest.addListener(callback, filter);
}
*/

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


function badPort(){
	var result = -1;
	var port = location.port;
	var goodPorts = ["21", "22", "23" ,"80","443","445","1433","1521","3306", "3389"];

	goodPorts.forEach(function(element) {
	  if(element == port) result = 0;
	});
	if(port == "") result = 1;
	return result;
}



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


function theresIpAddress(){
	var url = document.URL;
    var values = url.split("/");
	var theresIp = false;
	values.forEach(function(element) {
	  var resultOfdecimalNumbers = element.search("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$");
	  //Check resultOfHexaDecimalNumbers regular expression, I DID IT BUT BADLY. 
	  var resultOfHexaDecimalNumbers = element.search("^((0[xX][0-9a-fA-F]{2})\.){3}(0[xX][0-9a-fA-F]{2})$");

	  if(resultOfdecimalNumbers > -1 || resultOfHexaDecimalNumbers > -1) theresIp = true;
	});
	
}