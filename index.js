const AWS = require('aws-sdk');

let s3 = new AWS.S3({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
});

async function createOrderReceipt(message_id, message) {
    let s3Bucket = 'YOUR_BUCKET';
    let objectKey = `${message_id}.json`;
    let objectData = JSON.stringify(message);
    let objectType = 'application/json';

    try {
        let params = {
            Bucket: s3Bucket,
            Key: objectKey,
            Body: objectData,
            ContentType: objectType
        };
        await s3.putObject(params).promise();
        console.log(`File uploaded successfully at https:/` + s3Bucket + `.s3.amazonaws.com/` + objectKey );
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}

exports.handler = async(event, context, callback) => {
    for (let i = 0; i <  event.Records.length; i++) {
        let sns_record = event.Records[i].Sns;
        await createOrderReceipt(sns_record.MessageId, sns_record.Message);
    }
};