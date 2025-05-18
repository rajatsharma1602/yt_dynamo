import { DDBClient } from "../dynamo-client.js";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";


function getTodosByUserId(tableName, userId) {
    return new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: "pk= :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        }
    })
}

function getTodosByStatus(tableName, userId, status) {
    return new QueryCommand({
        TableName: tableName,
        IndexName: 'byStatus',
        KeyConditionExpression: "pk= :userId and  #status= :status",
        ExpressionAttributeNames: {
            "#status": "status"
        },
        ExpressionAttributeValues: {
            ":userId": userId,
            ":status": status
        }
    })
}

async function get(tableName, userId) {
    const command = getTodosByUserId(tableName, userId)
    // const command = getTodosByStatus(tableName, userId, 'IN_PROGRESS')
    const response = await DDBClient.send(command);
    console.log("todos", response.Items)
}

const tableName = 'todo';
const userId = 'rajat';

get(tableName, userId);