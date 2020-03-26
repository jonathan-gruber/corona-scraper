import boto3
import json
from boto3.dynamodb.conditions import Key, Attr
import datetime
from botocore.exceptions import ClientError
import decimal

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

def country_query(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('corona-db')
    today = datetime.date.today()
    t = today.strftime("%Y-%m-%d")
    t_2 = str(t)
    yesterday = datetime.date.today() - datetime.timedelta(days = 1)
    y = yesterday.strftime("%Y-%m-%d")

    query_param = event['queryStringParameters']
    pays = query_param['country']

    response = table.get_item(
        Key={
            'country':pays, 
            'corona_day':t
        }
        )
    check = "Item" in response
    print(check)
    if (check == False):
        response = table.get_item(
            Key={
                'country':pays, 
                'corona_day':y
            }
        )
# else:
#     item = response['Item']
#     print("GetItem succeeded:")
#     print(json.dumps(item, indent=4, cls=DecimalEncoder))


    # if len(response.Item) == 0

    #     response = table.get_item(
    #     Key={
    #        'country': pays,
    #        'corona_day': y
    #     }
    #     )

    body_response = json.dumps(response, indent=4, cls=DecimalEncoder)

    return {
        "statusCode": 200,
        "body": body_response, 
                "headers": { 
            "Access-Control-Allow-Origin": "*" 
        }
            }

