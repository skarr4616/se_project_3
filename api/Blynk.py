import requests

class Blynk:
    def __init__(self):
        self.url = "https://blynk.cloud/external/api/"

    
    def update_data(self, token, action, value):
        header = "token="+token+"&"+action+"="+value
        url = self.url + "update?" + header
        print("Calling this url",url)
        response = requests.get(url)
        return response.status_code
    
    def get_data(self,token,action):
        header = "token="+token+"&"+action
        url = self.url + "get?" + header
        print("Calling this url",url)
        response = requests.get(url)
        return response
    
    def hardwareStatus(self,token):
        header = "token="+token
        url = self.url + "isHardwareConnected?" + header
        response = requests.get(url)
        return response
    