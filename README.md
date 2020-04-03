# Heroesfest event follow up

This project implements own middleware in an api to track attendees of the Heroesfest event.

## Getting Started

First, start a local mongodb database with the name **logDB** then instantiate the middleware with the following command for testing purposes:

```
node middleware/index.js
```

The middleware must be available in port [5000](http://localhost:5000/), showing the process logs.

Now, instantiate the backend with the following Docker command:

```
docker-compose up --build
```

This will recreate a container available in port 10000, open the index.html file in the ui folder in your web browser, there you can manage the monitoring of attendees.

![App scrennshot](https://github.com/AlejandroGonzalR/heroesfest-event-follow-up/blob/master/public/HeroesScreenshot.png)

## Built With

* [Node.js 12.16.1 LTS](https://maven.apache.org/) - Runtime environment
* See also the used packages of each folder in the package.json

## Authors

* **Alejandro González Rodríguez** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
