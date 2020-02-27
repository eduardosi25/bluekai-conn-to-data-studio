FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
# FROM mongo

# COPY segments.json /segments.json

# CMD mongoimport --host mongodb --db audienceKit --collection segments --type json --file /segments.json