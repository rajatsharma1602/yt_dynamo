import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DDBClient } from "../dynamo-client.js";

async function deleteTodo(userId, todoId) {
    const command = new DeleteCommand({
        TableName: 'todo',
        Key: {
            pk: userId,
            sk: todoId
        }
    });

    const response = await DDBClient.send(command);
    console.log(response);
}

deleteTodo('rajat', '2');