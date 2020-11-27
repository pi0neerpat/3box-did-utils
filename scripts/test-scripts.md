```bash
curl https://r27sfer037.execute-api.us-west-2.amazonaws.com/develop/api/v0/request-github -d '{ "did": "did:key:z6MkjkTaUi7ztEfhC3UXJXJY5uqEb34Cb9mrzgLs9xe3RVds", "username": "pi0neerpat" }'

curl http://localhost:3000/api/v0/request-github -d '{ "did": "did:key:z6MkoTZNAdoB2AXwtiFxkgrAiKxAWARUFDqHq4VrKxk9nWqd", "username": "pi0neerpat" }'

curl https://r27sfer037.execute-api.us-west-2.amazonaws.com/develop/api/v0/confirm-github -d '{ "jws": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa2prVGFVaTd6dEVmaEMzVVhKWEpZNXVxRWIzNENiOW1yemdMczl4ZTNSVmRzI3o2TWtqa1RhVWk3enRFZmhDM1VYSlhKWTV1cUViMzRDYjltcnpnTHM5eGUzUlZkcyJ9.eyJjaGFsbGVuZ2VDb2RlIjoiOGZNTTZBTkN1RUROTDFpRWlIV0EySk5oNkJsU2RzcGkifQ.1bRJaDDZFfALstkg1NLpYCnMZcTyH1iG6YaqT6dvoPdRccdxw-ZM3NH9qejIbVw0FvAE4ayh8b8n9dE9xUQaAg" }'

curl  http://localhost:3000/api/v0/confirm-github -d '{ "jws": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa29UWk5BZG9CMkFYd3RpRnhrZ3JBaUt4QVdBUlVGRHFIcTRWckt4azluV3FkI3o2TWtvVFpOQWRvQjJBWHd0aUZ4a2dyQWlLeEFXQVJVRkRxSHE0VnJLeGs5bldxZCJ9.eyJjaGFsbGVuZ2VDb2RlIjoiN2lEMWtrc2xjN1NQeW5xVmhZMnp4WFoycUs2dHduM20ifQ.I0Usp9RdbVpKHDGz9Ht6PGkehw5yQUYz1oYjQ7_NVW0TLljZ5wE_h43547xnn-Ctk5vQtdP5IRpU4kVHhNQMCA" }'
```
