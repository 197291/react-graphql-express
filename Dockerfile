# Use an official Python runtime as a parent image
FROM node:10

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /app
COPY . /usr/src/app

# Install any needed packages specified in requirements.txt
RUN npm install
RUN npm run prestart
RUN npm rebuild node-sass --force --prefix client
RUN npm install --prefix client
RUN npm run build --prefix client

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV DB_URI mongodb+srv://197291:margo112358!@cluster0-dyoms.mongodb.net/test?retryWrites=true
ENV SECRET jsdfh4f2893du2390djeiodj1-iruhg8hvfoc3njk3j3=jke`
ENV API_PORT_DEVELOPMENT 4444
ENV PORT 80
# Run index.js when the container launches
CMD ["node", "build/index.js"]
