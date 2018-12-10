#!flask/bin/python
from sklearn.ensemble import VotingClassifier
from joblib import dump, load

from flask import Flask
from flask import request


app = Flask(__name__)
voteclf1=load('new_model.joblib')
website_info = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
website_dic = {'having_IP_Address':0, 'URL_Length':0, 'having_At_Symbol':0, 'Shortining_Service':0, 'double_slash_redirecting':0, 'Prefix_Suffix':0, 'having_Sub_Domain':0, 'HTTPS_token':0, 'URL_of_Anchor':0, 'age_of_domain':0, 'Page_Rank':0}
dic_key = list(website_dic.keys())


@app.route('/postjson', methods = ['POST'])
def postJsonHandler():
    #print(request.is_json)
    json_data = request.get_json()
        
    #input given data to website_info list
    for i in range(len(dic_key)):
        website_info[0][i] = json_data[dic_key[i]]
    

    #check attributes' data received from the website status
    print("given attribute data from the website: " + str(website_info))

    result_numpy = voteclf1.predict(website_info)
    result_list = result_numpy.tolist()

    print("result data from the model: "+ str(result_list))
    if str(result_list[0]) == '1':
        print("not phishing!")
    else:
        print("may be phishing")


    return str(result_list[0])
 
app.run(host='0.0.0.0', port= 5000)