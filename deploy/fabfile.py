import logging
import config

from fabric.api import *
from fabric.contrib.files import exists

config.init_config()
git_path = config.get(config.GIT_CONFIG_SECTION, config.GIT_PATH_OPTION)
repo_url = config.get(config.REPO_CONFIG_SECTION, config.REPO_URL_OPTION)
repo_name = config.get(config.REPO_CONFIG_SECTION, config.REPO_NAME_OPTION)
raspberry_ip = config.get(config.RASPBERRY_CONFIG_SECTION, config.RASPBERRY_IP_OPTION)

logging.info('Repository URL: %s', repo_url)
logging.info('Repository name: %s', repo_name)
logging.info('Raspberry Pi: %s', raspberry_ip)


env.hosts = [raspberry_ip]
env.user = 'pi'
env.password = 'raspberry'


def test():
    run('uname -a')


def clone():
    run('git clone %s' % repo_url)


def commit():
    local('%s add -A' % git_path)
    local('%s commit -a' % git_path)


def push():
    local('%s push' % git_path)


def prepare_deploy():
    commit()
    push()


def pull():
    run('git pull')


def deploy():
    prepare_deploy()
    directory = '/home/pi/%s' % repo_name
    if exists(directory):
        with cd(directory):
            pull()
    else:
        clone()