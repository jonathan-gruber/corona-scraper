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

def country_query_history(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('corona-db')

    query_param = event['queryStringParameters']
    pays = query_param['country']

    response = table.query(
        KeyConditionExpression=Key('country').eq(pays)
        )

    country_totalcases = []
    for i in response['Items']:
        country_totalcases.append(i)

    body_response = json.dumps(response, indent=4, cls=DecimalEncoder)

    return {
        "statusCode": 200,
        "body": body_response, 
                "headers": { 
            "Access-Control-Allow-Origin": "*" 
        }
            }

