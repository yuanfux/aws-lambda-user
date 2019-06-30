# aws-lambda-user

The example shows how to use `Lambda`, `API Gateway` and `DynamoDB` from `AWS` to create a simple "Serverless" Web Service that can create user, login & access both auth-required and no-auth-required methods.

## Setup

```bash
npm install
```

## Deploy

```bash
serverless deploy
```

> Before running `serverless deploy`, you have to make sure you've [installed serverless and set up your credentials provider](https://github.com/serverless/serverless#quick-start)

## Usage

You can sign up for a new user, login & access public / private method.

### 1. Sign up
#### request
```bash
curl -X POST https://xxxxxx.execute-api.us-west-2.amazonaws.com/dev/api/user/signup --data '{ "username": "new_user", "password": "12345678" }'
```

#### response
```json
{
  "message": "success"
}
```

### 2. Login
#### request
```bash
curl -X GET 'https://xxxxxx.execute-api.us-west-2.amazonaws.com/dev/api/user/login?username=new_user&password=12345678'
```

#### response
```bash
# user the returned token to access private method
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld191c2VyIiwiaWF0IjoxNTYxODI1NTgyfQ.Iv0ulooGayulxf_MkkpBO1xEw1gilThT62ysuz-rQE0",
  "username": "new_user"
}
```

### 3. Public method
#### request
```bash
curl -X GET https://xxxxxx.execute-api.us-west-2.amazonaws.com/dev/api/public
```

#### response
```json
{
  "message": "Anyone can read this message."
}
```

### 4. Private method
#### request
```bash
# use the token from login
curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld191c2VyIiwiaWF0IjoxNTYxODI1NTgyfQ.Iv0ulooGayulxf_MkkpBO1xEw1gilThT62ysuz-rQE0" https://xxxxxx.execute-api.us-west-2.amazonaws.com/dev/api/private
```

#### response
```bash
{
  "message": "Hello new_user! You are allowed to read this message."
}
```

## License
MIT
