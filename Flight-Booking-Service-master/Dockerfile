# Use an official Node.js runtime as the base image
FROM node

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
ENV NODE_ENV=production
ENV FLIGHT_SERVICE=http://flights-service:3001
ENV RABBITMQ_URL=amqps://fgedqckj:xMaFzbIPrhx9VDota7aSyxuz7E6fJ7TU@vulture.rmq.cloudamqp.com/fgedqckj
ENV PORT=3002

# Copy the rest of the Node.js project, including the node_modules directory
COPY . .

RUN npm ci
# RUN cd src && npx sequelize db:create
RUN cd src && npx sequelize db:migrate

# Expose the port on which your Node.js application will run
EXPOSE 3002

# The entrypoint script to start your Node.js application
CMD ["npm", "run", "dev"]