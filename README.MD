
# REPOSE

![Banner](assets/banner.png)

## Description

**GitHub Researcher** is a powerful tool designed for developers to automatically discover and analyze top repositories on GitHub. The project helps users explore repositories based on tags, languages, and popularity, providing detailed insights into each project.

## Installation

### Install MySQL with Homebrew (macOS)
To install MySQL using Homebrew on macOS, run the following command in your terminal:

```bash
brew install mysql
```

### Install MySQL with APT (Ubuntu/Debian)
To install MySQL using APT on Ubuntu or Debian-based systems, run the following command:

```bash
sudo apt-get update
sudo apt-get install mysql-server
```

### SQL Setup

To set up the MySQL databases from the provided dump files, follow these steps:

1. **Log into MySQL**:

   ```bash
   mysql -u root -p
   ```

2. **Create the databases (if not already created)**:

   ```sql
   CREATE DATABASE repo_researcher;
   CREATE DATABASE verified_repos;
   ```

3. **Import the SQL dump files**:

   To import `dump.sql` into the `repo_researcher` database:

   ```bash
   mysql -u root -p repo_researcher < dump.sql
   ```

   To import `verified_repos.sql` into the `verified_repos` database:

   ```bash
   mysql -u root -p verified_repos < verified_repos.sql
   ```

   If everything is correct, you should see `OK` at the end of the output for both commands.

## Starting the JavaScript API

### Installing Node.js

First, download and install Node.js from the official website:

- Go to [Node.js Downloads](https://nodejs.org/), and choose the latest LTS version for your operating system.

### Writing a Basic Node.js Server

Create a new directory for your project:

```bash
mkdir repose-api
cd repose-api
```

Now initialize the Node.js project and install the necessary packages:

```bash
npm init -y
npm install express
```

Create a `server.js` file with the following basic server code:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

To start the server, run:

```bash
node server.js
```

Your basic Node.js server should now be running at `http://localhost:3000`.

### Example API Request

To query repositories from the GitHub API, you can use the following URL:

```bash
https://api.repose.com/search/repositories?q=${query}&per_page=30
```

For example, to search for repositories related to "AI", you would use:

```bash
https://api.repose.com/search/repositories?q=AI&per_page=30
```

This will return the top 30 repositories related to AI.

---
