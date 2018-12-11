# phishing_web_ml

A Phishing Website Detection Plugin

## How the plugin works
1. User enters a URL they would like to visit into the address bar.
2. Our plugin will run automatically and decide if the URL entered is a suspicious/phishing website or not.
3. The plugin alerts the USER of its findings allowing the user to decide themselves if they would like to proceed.

## File description
Phishing_Website_Detector.ipynb : makes a phishing website detector using machine learning  
model.joblib : is the final model(detector)  
json_io.py : is the python server that has to be run locally for our extension to work. 


## Setups needed to make this plugin work
1. Run python server

2. Load our Phishing Website Detection extension to Chrome
