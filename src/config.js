  
const config = {
    api: { 
      url: "https://persons.api.troperial.com",
      invokeUrl: "https://3ys7qk6psng2jcxok4jm66bevm.appsync-api.us-east-1.amazonaws.com/graphql",
      aws_appsync_graphqlEndpoint: "https://3ys7qk6psng2jcxok4jm66bevm.appsync-api.us-east-1.amazonaws.com/graphql",
      aws_appsync_region: "us-east-1",
      aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
    },
    cognito: {
      REGION : "us-east-1",
      USER_POOL_ID: "us-east-1_L3d1NoJPy",
      APP_CLIENT_ID: "634219b4on68tunp5fqpfnmtlv"
    }
  }

  export default config;

  