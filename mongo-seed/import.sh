#! /bin/bash

mongoimport --host mongodb --db audienceKit --collection segments --type json --file /mongo-seed/segments.json
mongoimport --host mongodb --db audienceKit --collection users --type json --file /mongo-seed/users.json