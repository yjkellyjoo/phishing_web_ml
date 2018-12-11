#!flask/bin/python
from sklearn.ensemble import VotingClassifier
from joblib import dump, load

from flask import Flask
from flask import request


#variables
app = Flask(__name__)
voteclf1=load('model.joblib')
website_info = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
website_dic = {'having_IP_Address':0, 'URL_Length':0, 'having_At_Symbol':0, 'Shortining_Service':0, 'double_slash_redirecting':0, 'Prefix_Suffix':0, 'having_Sub_Domain':0, 'HTTPS_token':0, 'URL_of_Anchor':0, 'age_of_domain':0, 'Page_Rank':0}
dic_key = list(website_dic.keys())


#when POST api requested
@app.route('/postjson', methods = ['POST'])
def postJsonHandler():
    #save data received to 'json_data' variable
    json_data = request.get_json()
        
    #change given data to 'list' data structure
    for i in range(len(dic_key)):
        website_info[0][i] = json_data[dic_key[i]]
    

    #check attributes' data received from the website status
    print("given attribute data from the website: " + str(website_info))

    #make the model predict the result
    result_numpy = voteclf1.predict(website_info)
    result_list = result_numpy.tolist()

    #print result on server console
    print("result data from the model: "+ str(result_list))
    if str(result_list[0]) == '1':
        print("not phishing!")
    else:
        print("may be phishing")

    #return the result value to client
    return str(result_list[0])
 

#run as local server
app.run(host='0.0.0.0', port= 5000)