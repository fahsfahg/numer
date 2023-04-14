#!/bin/bash
mongoimport --host localhost --db mydb --collection ques --file /docker-entrypoint-initdb.d/query.json --jsonArray