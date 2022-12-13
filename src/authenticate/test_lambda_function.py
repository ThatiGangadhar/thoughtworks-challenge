# import boto3
import pytest
import os
# import requests
import importlib
from decimal import *

#constants
LOGGING_LEVEL = 'DEBUG'
USER_TABLE = 'User-dev'
REACH_USER_TABLE = 'ReachUser-dev'
REACH_ORG_TABLE = 'ReachOrganization-dev'
BBDOMAIN_AUTH_URL = 'api/v2/reach-check-credentials'
BBDOMAIN_LOGINID_VALIDATE_URL = 'api/v2/user/passcodelogin'
BBDOMAIN_LOGINOTP_VERIFY_URL = 'api/v1/verifyOtp'
TWO_WAY_AUTH_URL = 'api/v2/twoWayAuthenticate'
LOCATION_BASE_URL= 'http://2way.clublambdawhipsthellamasass.com/'
CLOUDFRONT_DOMAIN = 'dev.reach.blackboard.com'
DISTRICT_TABLE = 'District-dev'
LANGUAGE_TABLE = 'Language-dev'
REACH_UPDATE_USERNAME_FUNCTION = 'reach-update-username-dev'
API_SECRET = 'passcode_auth_secret'
REGION_NAME = 'us-east-1'
TOTAL_ATTEMPT = '4'
DMS_ROLLBACK = 'false'
REACH_HIGH_ADMINS = '1 2'

class payload:
    def read():
        return Read

class Read:
    def decode():
        return '{ "messages": [ { "content": "hi teacher", "readAt": 1642494904, "recipentRole": "SYSTEM", "createdAt": 1642494904, "schoolId": "2000001172|D1000", "contentType": "Text", "sender": "2001536905|D1000", "recipient": "2001536905|D1000", "langConfidence": "0.8140711784362793", "channelId": "DIRECT|2001536905|D1000|2012269958|D1000", "messageId": "ca6c965a04684aeca3f6e6fb1e0f88ee", "senderName": "Parlant Technology Support", "channelRecipientID": "DIRECT|2001536905|D1000|2012269958|D1000|2001536905|D1000", "parentMessage": "", "sent": false, "details": { "preferredLanguage": { "name": "English", "code": "en" }, "repliedTo": "", "channelName": "Teacher Test", "channelType": "DIRECT", "is_translated": false, "senderRole": "SYSTEM", "messageContent": "<p>Hi Teacher</p>" }, "sourceLanguage": "en", "id": "9273a4c7382243bb9dbcfd2c1f56541f", "readValue": 1 }]}'

class Client:
    def __init__(self, *args):
        pass

    def invoke(self,**kwargs):
        return {'ResponseMetadata': {'RequestId': '2608b8fb-3157-4d34-8e0b-d5829e7f01df', 'HTTPStatusCode': 200, 'HTTPHeaders': {'date': 'Fri, 04 Feb 2022 09:56:57 GMT', 'content-type': 'application/json', 'content-length': '466', 'connection': 'keep-alive', 'x-amzn-requestid': '2608b8fb-3157-4d34-8e0b-d5829e7f01df', 'x-amzn-remapped-content-length': '0', 'x-amz-executed-version': '$LATEST', 'x-amzn-trace-id': 'root=1-61fcf868-7ef4c4fb7609158c738e7f49;sampled=0'}, 'RetryAttempts': 0}, 'StatusCode': 200, 'ExecutedVersion': '$LATEST', 'Payload':payload }

class district_table_query:
    def query(**args):
        return {'Items':[{"Id": "D67","cluster": "pt99-2","clusterUrl": "https://spl9-pt99-2.parentlink.net/","DistrictDomainURL": "https://vh:spl9-pt99-2.parentlink.net/","DistrictId": 2000003091,"DistrictName": "Leaf Village School","email": "donotreply@vh.","marked": True,"queue_url": "https://sqs.us-west-2.amazonaws.com/024643489849/stage-99-2-reach-pn-queue.fifo","ReachStatus": "true"}]}

class language_table_query:
    def query(**args):
        pass

    def scan(FilterExpression):
        return {'Items':[{"code": "hu","name": "Hungarian"}]}
    
class user_table_query:
    def get_item(Key):
        return {'Item':{ "userId": "2012279554|D29", "web": 1, "mobile": 0, "role": "TEACHER", "preferredLanguage": { "name": "English", "code": "en" }, "bbDomain": "https://spl9-pt99-1.parentlink.net/", "orgId": 2000002624, "orgIdList": [ 2000002624 ], "username": "role Teacher1", "marked": False, "personId": 2012279554 }}

    def update_item(**args):
        return {}

class reach_user_table_query:
    def query(**args):
        return {'Items':[{ "id": "735470d37e5442268f8a88794608da16", "modifiedat": 1649314366, "cluster": "pt99-1", "userrolename": "Student", "createdat": 1649314366, "createdBy": "MESSAGERECEIVER", "language": { "name": "English", "code": "en" }, "firstname": "Madison", "refSchoolId": "2000001170", "userroleId": 12, "marked": { "user_school": True }, "reachstatus": True, "reachOrgDistrictId": "D28", "searchname": "madison cleveland", "isweblogin": 0, "schoolDetails": { "2000001170": "PL9 Middle School" }, "loginid": "436937", "gender": "F", "isEmailSynced": False, "lastname": "Cleveland", "userroletype": "STUDENT", "deleted": "FALSE", "externalID": "436937", "ismobilelogin": 0, "relationshipDetails": { "2000001170": [ { "relationType": "PARENT", "firstName": "Lucia", "lastName": "Cleveland", "personId": "pt99-1|2001515807", "schoolName": "PL9 Middle School" }, { "relationType": "PARENT", "firstName": "Robert", "lastName": "Cleveland", "personId": "pt99-1|2001515808", "schoolName": "PL9 Middle School" }, { "relationType": "PARENT", "firstName": "Daniel", "lastName": "Mathis", "personId": "pt99-1|2001515809", "schoolName": "PL9 Middle School" } ] }, "refuserId": "2001514299", "fullname": "Madison Cleveland" }]}

    def update_item(**args):
        return {}
class reach_org_table_query:
    def query(**args):
        return {'Items':[{
 "id": "D67",
 "cdc_syncup": True,
 "cluster": "pt99-2",
 "ClusterUrl": "https://spl9-pt99-2.parentlink.net/",
 "createdat": 1650347519,
 "disabledRoles": [],
 "DistrictDomainURL": "https://vh:spl9-pt99-2.parentlink.net/",
 "email": "donotreply@vh.",
 "entity_name": "District",
 "modifiedat": 1650347519,
 "name": "Leaf Village School",
 "queue_url": "https://sqs.us-west-2.amazonaws.com/024643489849/stage-99-2-reach-pn-queue.fifo",
 "Reachstatus": "true",
 "refSchoolId": "2000003091"
}]}
    def get_item(**args):
        return {'Item':{ "id": "D10724", "entity_name": "School", "Reachstatus": "false", "modifiedat": 1638200838, "cluster": "pt99-1", "contact": "757-928-6100", "createdat": 1638200838, "homeURL": "http://heritage.nn.k12.va.us", "name": "Heritage", "districtId": "328", "refSchoolId": "374", "disabledRoles": [], "type": "HIGH" }}

class Resource:
    def __init__(self, *args):
        pass

    def Table(self,table_name, *kwargs):
        if table_name == DISTRICT_TABLE:
            return district_table_query
        elif table_name == LANGUAGE_TABLE:
            return language_table_query
        elif table_name == REACH_USER_TABLE:
            return reach_user_table_query
        elif table_name == REACH_ORG_TABLE:
            return reach_org_table_query
        elif table_name == USER_TABLE:
            return user_table_query
        
class SessionClass:
    def __init__(self, *args):
        pass

    def Session():
        return clientClass

class clientClass:
    def __init__(self, *args):
        pass

    def client(service_name,region_name):
        return GetSecretClass

class GetSecretClass:
    def get_secret_value(SecretId):
        return {"SecretString":'{"validated_response":"dummystring","passcode_key":"dummypasscode"}'}

class postClass:
    def __init__(self,url, data, headers, *args):
        self.ok = True
        self.status_code = 200
        self.text = "dummytext"

    def json(self):
        return {'validated_response':{'val_res':'dummy_res'},'token':'dummy_token','status_code':200, "orgIds": [ 2000001172 ], "personId": 2001536905, "roleID": 2, "orgId": 2000001172, "personName": "Parlant Technology Support", "authentication": "4d71d6fc0a34723466013e601b2d3541", "role": "SYSTEM", "roleName": "PARLANTSUPPORT", "preferredLanguage": "Punjabi", "orgName": "99-2 School District" }
    
class getClass:
    def __init__(self,url, headers,params=None, **args):
        self.ok = True
        self.status_code = 200
        self.data = 'dummydata'
        self.text = "dummytext"

    def json(self):
        return {'authentication':'true',"orgIds":[ 2000001172 ], "personId":2001536905, "roleID":2, "orgId":2000001172, "personName":"Parlant Technology Support", "authentication":"true", "role":"SYSTEM", "roleName":"PARLANTSUPPORT", "preferredLanguage":"Punjabi", "orgName":"99-2 School District","status_code": 200, "data": { "orgIds": [ 2000001172 ], "personId": 2001536905, "roleID": 2, "orgId": 2000001172, "personName": "Parlant Technology Support","authentication": "4d71d6fc0a34723466013e601b2d3541", "role": "SYSTEM", "roleName": "PARLANTSUPPORT", "preferredLanguage": "Punjabi", "orgName": "99-2 School District" } }
    
@pytest.fixture
def dummy_resource_set_up(monkeypatch):
    os.environ["LOGGING_LEVEL"] = LOGGING_LEVEL
    os.environ['USER_TABLE'] = USER_TABLE
    os.environ['REACH_USER_TABLE'] = REACH_USER_TABLE
    os.environ['REACH_ORG_TABLE'] = REACH_ORG_TABLE
    os.environ['BBDOMAIN_AUTH_URL'] = BBDOMAIN_AUTH_URL
    os.environ['BBDOMAIN_LOGINID_VALIDATE_URL'] = BBDOMAIN_LOGINID_VALIDATE_URL
    os.environ['BBDOMAIN_LOGINOTP_VERIFY_URL'] = BBDOMAIN_LOGINOTP_VERIFY_URL
    os.environ['TWO_WAY_AUTH_URL'] = TWO_WAY_AUTH_URL
    os.environ['LOCATION_BASE_URL'] = LOCATION_BASE_URL
    os.environ['CLOUDFRONT_DOMAIN'] = CLOUDFRONT_DOMAIN
    os.environ['DISTRICT_TABLE'] = DISTRICT_TABLE
    os.environ['LANGUAGE_TABLE'] = LANGUAGE_TABLE
    os.environ['REACH_UPDATE_USERNAME_FUNCTION'] = REACH_UPDATE_USERNAME_FUNCTION
    os.environ['PASSCODE_API_SECRET'] = API_SECRET
    os.environ['REGION_NAME'] = REGION_NAME
    os.environ['TOTAL_ATTEMPT'] = TOTAL_ATTEMPT
    os.environ['DMS_ROLLBACK'] = DMS_ROLLBACK
    os.environ['REACH_HIGH_ADMINS'] = REACH_HIGH_ADMINS
    yield

@pytest.fixture
def TableMP(monkeypatch):
    # monkeypatch.setattr(boto3, "resource", Resource)
    # monkeypatch.setattr(boto3, 'session',SessionClass)
    # monkeypatch.setattr(requests, 'post', postClass)
    # monkeypatch.setattr(requests, 'get', getClass)
    # monkeypatch.setattr(boto3, 'client', Client)
    yield

class ContextClass:
    def function_name():
        return 'authenticate-v2'

input_lambda_event = {'body-json': {'username': 'spl9support', 'password': 'pw', 'mobile': 'false', 'orgId': '2000001172'}, 'params': {'path': {}, 'querystring': {}, 'header': {'Accept-Encoding': 'gzip, deflate, br', 'bbdomain': 'https://spl9-pt99-1.parentlink.net', 'CloudFront-Forwarded-Proto': 'https', 'CloudFront-Is-Desktop-Viewer': 'true', 'CloudFront-Is-Mobile-Viewer': 'false', 'CloudFront-Is-SmartTV-Viewer': 'false', 'CloudFront-Is-Tablet-Viewer': 'false', 'CloudFront-Viewer-Country': 'US', 'content-type': 'application/json;charset=utf-8', 'Cookie': 'Authorization=; _ga=GA1.1.1975564087.1650264518; _ga=GA1.4.1497856639.1650260546; _ga_2JYDBHGLGZ=GS1.4.1650435329.4.0.1650435329.0; _ga_KDD4HX2E2W=GS1.1.1650431515.2.1.1650431516.0; reachSession=false', 'districturl': 'spl9-pt99-1.parentlink.net', 'domainid': 'D29', 'Host': 'y5hq0h4gje.execute-api.us-east-1.amazonaws.com', 'origin': 'https://dev.reach.blackboard.com', 'User-Agent': 'Amazon CloudFront', 'Via': '2.0 5a45573ebecfd555d93af04bbbcf0556.cloudfront.net (CloudFront), 1.1 d3cd567650e598ded7d5dd9266aa396c.cloudfront.net (CloudFront)', 'X-Amz-Cf-Id': '7CFNTg8ikmUvn5HojlbD4XJdi6Kybo79LNNc4wmLGTl-ywWVJDKYGw==', 'X-Amzn-Trace-Id': 'Root=1-625fa50b-1c4637fb699e76855d82b76f', 'X-Forwarded-For': '183.83.253.49, 130.176.134.69, 130.176.179.68', 'X-Forwarded-Port': '443', 'X-Forwarded-Proto': 'https'}}, 'stage-variables': {}, 'context': {'account-id': '', 'api-id': 'y5hq0h4gje', 'api-key': '', 'authorizer-principal-id': '', 'caller': '', 'cognito-authentication-provider': '', 'cognito-authentication-type': '', 'cognito-identity-id': '', 'cognito-identity-pool-id': '', 'http-method': 'POST', 'stage': 'dev', 'source-ip': '130.176.134.69', 'user': '', 'user-agent': 'Amazon CloudFront', 'user-arn': '', 'request-id': 'a8a59e3a-dc1f-42bb-8f14-df8bf196e303', 'resource-id': 'wlc01a', 'resource-path': '/api/login'}}

# def test_authenticate_1(dummy_resource_set_up, TableMP):
#     pack = importlib.import_module('microservices.functions.authenticate-v2.lambda_function')
#     op = pack.lambda_handler(event=input_lambda_event, context=ContextClass)
#     assert op == {'location': 'http://2way.clublambdawhipsthellamasass.com/', 'origin': 'https://spl9-pt99-1.parentlink.net', 'userName': 'Parlant Technology Support', 'userRole': 'SYSTEM', 'orgName': '99-2 School District', 'personid': 2001536905, 'userRoleName': 'PARLANTSUPPORT', 'domainId': 'D29', 'roleID': 2, 'Cookie': 'Authorization=4d71d6fc0a34723466013e601b2d3541;path=/;httponly;SameSite=Strict;', 'preferredLanguage': {'name': 'English', 'code': 'en'}, 'cluster': 'pt99-1'}

# def test_authenticate_2(dummy_resource_set_up, TableMP):
#     input_lambda_event['body-json']['password'] = ''
#     pack = importlib.import_module('microservices.functions.authenticate-v2.lambda_function')
#     op = pack.lambda_handler(event=input_lambda_event, context=ContextClass)
#     assert op == {'response': 'validated', 'val_res': 'dummy_res'}

# def test_authenticate_3(dummy_resource_set_up, TableMP):
#     input_lambda_event['body-json']['password'] = 'pw'
#     input_lambda_event['body-json']['resend'] = True
#     input_lambda_event['params']['header']['ispasscode'] = True
#     pack = importlib.import_module('microservices.functions.authenticate-v2.lambda_function')
#     op = pack.lambda_handler(event=input_lambda_event, context=ContextClass)
#     assert op == {'response': 'resendOtp', 'val_res': 'dummy_res'}

# def test_authenticate_4(dummy_resource_set_up, TableMP):
#     del input_lambda_event['body-json']['resend']
#     pack = importlib.import_module('microservices.functions.authenticate-v2.lambda_function')
#     op = pack.lambda_handler(event=input_lambda_event, context=ContextClass)
#     assert op == {'location': 'http://2way.clublambdawhipsthellamasass.com/', 'origin': 'https://spl9-pt99-1.parentlink.net', 'userName': 'Parlant Technology Support', 'userRole': 'SYSTEM', 'orgName': '99-2 School District', 'personid': None, 'userRoleName': 'PARLANTSUPPORT', 'domainId': 'D29', 'roleID': 2, 'Cookie': 'Authorization=dummy_token;path=/;httponly;SameSite=Strict;', 'preferredLanguage': {'name': 'English', 'code': 'en'}, 'cluster': 'pt99-1'}

# def test_authenticate_5(dummy_resource_set_up, TableMP):
#     del input_lambda_event['params']['header']['districturl']
#     input_lambda_event['params']['header']['personid'] = 2000012343
#     input_lambda_event['params']['header']['Authorization'] = '; _ga=GA1.1.1975564087.1650264518; _ga=GA1.4.1497856639.1650260546; _ga_2JYDBHGLGZ=GS1.4.1650435329.4.0.1650435329.0; _ga_KDD4HX2E2W=GS1.1.1650431515.2.1.1650431516.0; reachSession=false'
#     pack = importlib.import_module('microservices.functions.authenticate-v2.lambda_function')
#     op = pack.lambda_handler(event=input_lambda_event, context=ContextClass)
#     assert op == {'location': 'http://2way.clublambdawhipsthellamasass.com/', 'origin': 'https://spl9-pt99-2.parentlink.net/', 'userName': 'Parlant Technology Support', 'userRole': 'SYSTEM', 'orgName': '99-2 School District', 'personid': 2000012343, 'userRoleName': 'PARLANTSUPPORT', 'domainId': 'D67', 'roleID': 2, 'Cookie': 'Authorization=; _ga=GA1.1.1975564087.1650264518; _ga=GA1.4.1497856639.1650260546; _ga_2JYDBHGLGZ=GS1.4.1650435329.4.0.1650435329.0; _ga_KDD4HX2E2W=GS1.1.1650431515.2.1.1650431516.0; reachSession=false;path=/;httponly;SameSite=Strict;', 'preferredLanguage': {'name': 'English', 'code': 'en'}, 'cluster': 'pt99-2'}

# def test_authenticate_6(dummy_resource_set_up, TableMP):
#     del input_lambda_event['params']['header']['ispasscode']
#     del input_lambda_event['params']['header']['personid']
#     pack = importlib.import_module('microservices.functions.authenticate-v2.lambda_function')
#     op = pack.lambda_handler(event=input_lambda_event, context=ContextClass)
#     assert op == {'statusCode': 200, 'authToken': ''}

def test_demo():
    a = 'demo'
    assert 'demo' == a