# Get Started

Install the node packages with the following command

```bash
npm install
```

Run the project with the following command

```bash
npm run start
```

# Testing

## Insert Data

Use the following curl command to insert employee

```bash
curl --location --request POST 'http://localhost:3000/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Rashintha",
    "email": "rashintha@rashintha.com",
    "profile_picture": "dsdsdsdsdsd"
}'
```

## Update Data

Use the following curl command to update employee

```bash
curl --location --request PUT 'http://localhost:3000/employees/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Rashintha Madunet",
    "email": "mail@rashintha.com",
    "profile_picture": "dsdsdsdsdsd"
}'
```

## Delete Data

Use the following curl command to delete employee

```bash
  curl --location --request DELETE 'http://localhost:3000/employees/1'
```

## Get Data

Use the following curl command to get employees

```bash
curl --location --request GET 'http://localhost:3000/employees?length=10&offset=0'
```
