# Portal da Nuvem Acadêmica Federada

## Development

### Requirements

To setup dev environment, you need [nodeJS](https://nodejs.org/), with [npm](https://www.npmjs.com/) and [compass](http://compass-style.org/) to compile SASS. Also, you need **grunt-cli** e **bower**:

```
sudo apt-get install nodejs
sudo apt-get install npm

sudo apt-get install ruby-full
sudo gem update --system
sudo gem install compass

sudo npm install -g grunt-cli bower
```

### Running

First, you need to create the environment configuration file:

```
cd <path_to_project>
cp secret.json.exemple secret.json
```

Install project dependencies:

```
cd <path_to_project>
npm install
bower install
```

Run project on a local development server with `grunt serve`.

## Deployment

Use `grunt build` to create **dist** folder.

Use `grunt ssh_deploy:<environment>` to deploy the application on server:

```
grunt build
grunt ssh_deploy:prod
```
