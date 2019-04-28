#!/usr/bin/env node
const CURR_DIR = process.cwd();
const inquirer = require('inquirer');
const fs = require('fs');
const shell = require('shelljs');

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    }
];
console.log(`index.js is running...`);
inquirer.prompt(QUESTIONS)
    .then(answers => {
        const projectChoice = answers['project-choice'];
        const projectName = answers['project-name'];
        const templatePath = `${__dirname}/templates/${projectChoice}`;

        fs.mkdirSync(`${CURR_DIR}/${projectName}`);
        console.log(`creating seed project....`);
        return Promise.all([createDirectoryContents(templatePath, projectName), projectName]);
    }).then(([result2, projectName]) => {
        console.log(`seed project created successfully....`);

        console.log("installing modules...");
        console.log(`entering in ${projectName} directory...`);
        shell.cd(projectName);
        //process.chdir(`${CURR_DIR}/${projectName}`);

        shell.echo(`current working directory is ${process.cwd()}`);
        if (shell.exec('npm install').code !== 0) {
            shell.echo('Error: Git commit failed');
            shell.exit(1);
        } else {
            shell.echo('packages installed successfully.');
        }
    });

function createDirectoryContents(templatePath, newProjectPath) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            // Rename
            if (file === '.npmignore') file = '.gitignore';

            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

            // recursive call
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
}