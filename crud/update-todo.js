import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DDBClient } from "../dynamo-client.js";

function getUpdateCommand(userId, todoId, updateObj) {
    const updateKeys = Object.keys(updateObj)

    const updateExpression = `SET ${updateKeys.map((key, index) => `#field${index} = :value${index}`)}`

    const attributesName = updateKeys.reduce((acc, val, index) => {
        return { ...acc, [`#field${index}`]: val }
    }, {});


    const attributeValues = updateKeys.reduce((acc, val, index) => {
        return { ...acc, [`:value${index}`]: updateObj[val] }
    }, {});


    return new UpdateCommand({
        TableName: 'todo',
        ReturnValues: 'ALL_NEW',
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: attributesName,
        ExpressionAttributeValues: attributeValues,
        Key: {
            pk: userId,
            sk: todoId
        }
    })
}



async function updateTodo(userId, todoId, updateObj) {
    const command = getUpdateCommand(userId, todoId, updateObj)
    const response = await DDBClient.send(command)
    console.log("res", response)
}


updateTodo('rajat', '2', { status: 'DONE', priority: 'MED' })