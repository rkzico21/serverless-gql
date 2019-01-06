'use strict';
require('dotenv/config');

const CognitoJwtVerifier = require("cognito-jwt-verifier");
// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

module.exports.handler = async (event, context, callback) => {

    console.log("Authenticating");
    const token = event.authorizationToken;
  
    if (!token)
    { 
        context.fail("Unauthorized");
        return;
    }
    
    var decodedToken = null; 
    console.log(token);
    let verifier = new CognitoJwtVerifier();
    await verifier.verifyToken({
        token: token,
        aws_region: 'us-west-2',
        userpool_id: 'us-west-2_aBItx8soE',
        userpool_client_id: '7gr4ii29fvg21hobnscgi0jpo1'
    }).then((decoded_token)=>{
        decodedToken = decoded_token;
    }).catch((err)=>{
    // Token is invalid or another error occurred
    console.error(err);
    context.fail("Unauthorized");
    return;
    });
    console.log(event.methodArn);
    return callback(null, generatePolicy(decodedToken.email, 'Allow', event.methodArn))
};