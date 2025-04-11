import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../dynamo-client.js';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// priority = "HIGH" | "MED" | "LOW"
// status = "TODO" | "IN_PROGRESS" | "DONE"

const todo = {
    pk: 'rajat',
    sk: '1',
    title: 'my first todo',
    dueDate: new Date().toString(),
    priority: 'LOW',
    status: 'TODO'
}

async function create() {
    console.log("todo", todo);
    const inputCommand = new PutCommand({
        TableName: "todo",
        Item: todo,
        "ReturnConsumedCapacity": "TOTAL"
    });

    const DDBClient = DynamoDBDocumentClient.from(client);
    const myTodo = await DDBClient.send(inputCommand)
    console.log("todo created", myTodo);
}


create();

async function createUsingClient() {
    const command = new PutItemCommand({
        TableName: "todo",
        Item: {
            "pk": {
                "S": "rajat"
            },
            "sk": {
                "S": "2"
            },
            "title": {
                "S": "my second todo"
            }
        },
        "ReturnConsumedCapacity": "TOTAL"
    });
    const myTodo = await client.send(command);
    console.log("new todo", myTodo);
}

// createUsingClient();