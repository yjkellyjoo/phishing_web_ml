#!flask/bin/python
from sklearn.ensemble import VotingClassifier
from joblib import dump, load

from flask import Flask
from flask import request


app = Flask(__name__)
voteclf1=load('new_model.joblib')
website_info = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
website_dic = {'having_IP_Address':0, 'URL_Length':0, 'having_At_Symbol':0, 'Shortining_Service':0, 'double_slash_redirecting':0, 'Prefix_Suffix':0, 'having_Sub_Domain':0, 'HTTPS_token':0, 'URL_of_Anchor':0, 'age_of_domain':0, 'Page_Rank':0}


@app.route('/postjson', methods = ['POST'])
def postJsonHandler():
    print(request.is_json)
    json_data = request.get_json()

    dic_key = list(website_dic.keys())
        
    #input given data to website_info list
    for i in range(len(dic_key)):
        website_info[0][i] = json_data[dic_key[i]]
    
    #print(website_info)
    result_numpy = voteclf1.predict(website_info)
    result_list = result_numpy.tolist()

    return str(result_list[0])
    #return 'JSON posted'
 
app.run(host='0.0.0.0', port= 5000)