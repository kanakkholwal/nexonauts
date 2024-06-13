const { MongoClient } = require('mongodb');

// Connection URIs
// const sourceURI = "mongodb+srv://<username>:<password>@<cluster>.<clusterId>.mongodb.net/kkupgrader";
// const targetURI = "mongodb+srv://<username>:<password>@<cluster>.<clusterId>.mongodb.net/development";

// Function to migrate data
async function migrateData(
  sourceURI,
  targetURI,
  collectionName,
  sourceDB,
  targetDB
) {
  const sourceClient = await MongoClient.connect(sourceURI);
  const targetClient = await MongoClient.connect(targetURI);

  const sourceCollection = sourceClient.db(sourceDB).collection(collectionName);
  const targetCollection = targetClient.db(targetDB).collection(collectionName);

  const documents = await sourceCollection.find().toArray();

  if (documents.length > 0) {
    await targetCollection.insertMany(documents);
    console.log(
      `Data migrated from ${sourceDB}.${collectionName} to ${targetDB}.${collectionName}`
    );
  } else {
    console.log(`No documents found in ${sourceDB}.${collectionName}`);
  }

  sourceClient.close();
  targetClient.close();
}
async function initialize(sourceDB, targetDB) {
  const sourceClient = await MongoClient.connect(sourceURI);
  const targetClient = await MongoClient.connect(targetURI);

  console.log('Connected to source and target databases');

  const collections = await sourceClient.db(sourceDB).collections();

  console.log('Collections found in source database', collections.length);

  for await (const collection of collections) {
    console.log(collection.collectionName);
    await migrateData(
      sourceURI,
      targetURI,
      collection.collectionName,
      sourceDB,
      targetDB
    );
  }

  sourceClient.close();
  targetClient.close();
}
