# pi-deploy

Python script for easy deployment to Raspberry Pi's.

## Dependencies

* Python 2.7
* pyCrypto
* Python Fabric

## Installation

### Linux

1. Install Python 2.7 if not present.
2. Install fabric using pip: `pip install fabric`
3. Copy `fabfile.py` and `tool.py` into you repository

### Mac OS X

WIP

### Windows

1. Install Python 2.7
2. Add Python directory and its containing \Scripts directory to %PATH%, e.g. `%PATH%;C:\Python27;C:\Python27\Scripts`
3. Install a compiler, e.g. [the free Visual C++ compiler](https://www.microsoft.com/en-us/download/details.aspx?id=44266)
4. Install fabric using pip: `pip install fabric`
5. Copy `fabfile.py` and `tool.py` into you repository

## Usage

### First time use

The first time the script is run (with any command), it will prompt you for the URL to your repository. The script is not very sophisticated, so this has to be a public repository. It will assume the name of your repository is the last part of the URL, i.e. if the URL is https://github.com/larsmsp/pi-deploy (or https://larsmsp@github.com/larsmsp/pi-deploy.git), it will assume name the of the repository is pi-deploy.

It will also prompt you for the IP address of your Raspberry Pi. It will further assume the username and password is "pi" and "raspberry", respectively.

These settings are stored in a configuration file in the same directory as the script. If you need to change any of these values after the initial execution, either delete the file or modify their values here.

### `$ fab deploy`

This should be your one and only command. This will basically:

1. (Local) git add -p && git commit
2. (Local) git push
3. (Remote) git pull

During every deploy, the script will check to see if the repository is present on the Raspberry Pi. If it can't find a folder with the same name as the repository name specified in the configuration file, it will attempt to clone it.
