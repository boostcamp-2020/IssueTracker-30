import express from "express";
import AWS from "aws-sdk";

import isLoggedIn from "../middleware/auth";

const router = express.Router();

router.post("/", isLoggedIn, async (req, res) => {
  const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
  const region = 'kr-standard';
  const access_key = 'GbQSbRtbCznEXBK9PAu0';
  const secret_key = '3hsytqI3HBcs5KDitAv421yb6CkJIJRuNpwDGAQ0';

  const S3 = new AWS.S3({
      endpoint: endpoint,
      region: region,
      credentials: {
          accessKeyId : access_key,
          secretAccessKey: secret_key
      }
  });

  const bucket_name = 'ssh1997test';

  await S3.putObject({
      Bucket: bucket_name,
      Key: req.body.fileName,
      ACL: 'public-read',
      Body: req.body.data,
  }).promise();

  res.send({message: "success"});
});

export default router;