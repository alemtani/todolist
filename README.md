# Todolist

Todolist is a simple full-stack application written using the PERN stack. 

## Features

- **Task Management**: Supports CRUD operations for managing tasks.
  - Can define task name, due date (as a timestamp), and category.
  - Can access tasks due today and upcoming tasks (includes overdue tasks).
- **Categories Management**: Supports CRUD operations for managing task categories.
  - Can assign tasks to different categories.
- **Authentication + Authorization**: Supports authentication + authorization of user tasks using [JSON Web Tokens (JWT)](https://datatracker.ietf.org/doc/html/rfc7519).

## Technologies
- React
- Node + Express
- Postgres
- Docker

## Installation

Make sure you have Docker installed (see instructions [here](https://docs.docker.com/desktop/)).

You also need to make sure you have Docker Desktop up and running in the background.

## Configuration

In the root directory, create a `.env` file with the following variables:

```
REACT_APP_API_URL="ENTER YOUR API URL"
DB_USER="ENTER YOUR DB USER"
DB_NAME="ENTER YOUR DB NAME"
DB_PASSWORD="ENTER YOUR DB PASSWORD"
JWT_SECRET="ENTER YOUR JWT SECRET"
```

Additionally, you need to create a file called `db/password.txt` (create the `db` directory too) where you insert the same database password in a SINGLE line (NO NEWLINES). The end product should look as follows.

```
ENTER YOUR DB PASSWORD
```

## Usage

In fact, all you need to do is run the following command in the terminal:

```sh
docker compose up --build
```

Open a browser and view the application at http://localhost:3000.

To shutdown the application, press `Ctrl+C`.

### Run the application in the background

Alternatively, if you want to run the application in the background, add the `-d` option:

```sh
docker compose up --build -d
```

Open a browser and view the application at http://localhost:3000.

And to shutdown the application:

```sh
docker compose down
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
