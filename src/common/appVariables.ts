const accessKeyId = process.env.AWS_API_ACCESS_KEY;
const secretAccessKey = process.env.AWS_API_SECRET_KEY;
const awsRegion = process.env.AWS_API_REGION;
const mapKey = process.env.GOOGLE_MAPS_KEY;
const appStage = global.__TEST__ !== undefined ? global.__TEST__ : process.env.STAGE;

export const DB_NAME = `${appStage}_${process.env.DB_NAME}`;
export const DB_HOST = process.env.DB_HOST;

export const awsConfig = {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: awsRegion,
};

export const globalConst = {
  stage: appStage,
}

export const mapConfig = {
  key: mapKey
}