# labeler
A Github Action that helps you to add and remove labels of all PRs in a given repo.

## Usage
### Input Variables:   
```github-token```: Mandatory, Github API TOKEN. [More info](https://github.com/settings/tokens)  
```repository-name```: Mandatory, string, the repository where the action is ran. eg: Typeform/labeler  
```label_action```: Mandatory, option between add or remove    
```label```: Mandatory, how you want to name your label  
```base-branch```: Optional, filter pulls by base branch name. Default: all base branches  

## Contributing
All code should pass tests, as well as be well documented. [Please also see the Commit Message Guidelines](CONTRIBUTING.MD) for how commit messages should be structured.


## Developing

### Prerequisites

- Node.js
- Yarn

### Installation

To install the project dependencies:

```bash
yarn
```

Copy the contents of the `.env.dist` file into a new file called `.env`
and fill in the necessary variables with your own variables.

### How to run it
```bash
yarn start
```

### How to run tests
```bash
yarn test 
```
### How to distribute
Github actions requires all the package dependencies in the repo to run the JavaScript code.  
We prefer to distribute our code and modules into a single file: ```dist/index.js```. To do that, run: 
```bash
yarn distribute
```
