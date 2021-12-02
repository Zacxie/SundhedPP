# SundhedPP
SundhedPP - a better platform for the Danish Health Care System.
And also just a nice learning platform for [DevOps](https://kurser.dtu.dk/course/62582).

## The technologies
The project is build on the following technologies:
- Java with Maven as dependency manager and build tool
- JAX-RS using Jackson for JSON support
- Tomcat for the web server
- React through Yarn, using mobx as state manager and  different material UI libraries.
- MySQL as DBMS

## Running the project
If you want to run the project, simply build the Docker container using the following command

``docker build -t sundhedpp:latest .``

After that you can run the container using

``docker run -d --name sundhedpp
-p 8080:8080
-e "DB_USER=some-user"
-e "DB_HOST=host-for-database"
-e "DB_PORT=port-for-database"
-e "DB_NAME=some-database"
sundhedpp:latest``

NOTE: You will need to spin up a container with MySQL yourself. 
