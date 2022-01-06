const AWS = require('aws-sdk');

let s3 = new AWS.S3({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
});

exports.handler = async(event, context, callback) => {
    let s3Bucket = 'YOUR_BUCKET_NAME';
    let objectName = 'orderreceipt.json';
    let objectData = JSON.stringify(event.Records[0].Sns.Message);
    let objectType = 'application/json';

    try {
        let params = {
            Bucket: s3Bucket,
            Key: objectName,
            Body: objectData,
            ContentType: objectType
        };
        await s3.putObject(params).promise();
        callback(null, `File uploaded successfully at https:/` + s3Bucket + `.s3.amazonaws.com/` + objectName);
    } catch (err) {
        console.error(err);
    }
};