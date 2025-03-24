import { client } from "./dynamo-client.js";
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

const createTodoTable = async () => {
    const tableDef = new CreateTableCommand({
        TableName: "todo",
        BillingMode: "PAY_PER_REQUEST",
        AttributeDefinitions: [
            {
                AttributeName: "pk", // userid
                AttributeType: "S"
            },
            {
                AttributeName: "sk", // todo id
                AttributeType: "S"
            },
            {
                AttributeName: "status",
                AttributeType: "S"
            },
            {
                AttributeName: "dueDate",
                AttributeType: "S"
            },
            {
                AttributeName: "priority",
                AttributeType: "S"
            },
        ],
        KeySchema: [
            {
                AttributeName: "pk",
                KeyType: "HASH"
            },
            {
                AttributeName: "sk",
                KeyType: "RANGE"
            },
        ],
        LocalSecondaryIndexes: [
            {
                IndexName: "byDueDate",
                KeySchema: [
                    {
                        AttributeName: "pk", // userid
                        KeyType: "HASH"
                    },
                    {
                        AttributeName: "dueDate",
                        KeyType: "RANGE"
                    },
                ],
                Projection: { ProjectionType: "ALL" }
            },
            {
                IndexName: "byPriority",
                KeySchema: [
                    {
                        AttributeName: "pk", // userid
                        KeyType: "HASH"
                    },
                    {
                        AttributeName: "priority",
                        KeyType: "RANGE"
                    },
                ],
                Projection: { ProjectionType: "ALL" }
            },
            {
                IndexName: "byStatus",
                KeySchema: [
                    {
                        AttributeName: "pk", // userid
                        KeyType: "HASH"
                    },
                    {
                        AttributeName: "status",
                        KeyType: "RANGE"
                    },
                ],
                Projection: { ProjectionType: "ALL" }
            }
        ]
    });

    try {
        const data = await client.send(tableDef);
        const tableName = data.TableDescription.TableName ?? "";
        console.log("table created with name", tableName);
    }
    catch (error) {
        console.error("error creating table", error);
    }
}

createTodoTable()