dev:
	DOCKER_HOST="unix://${HOME}/.rd/docker.sock" wails dev

build:
	wails build

gen:
	wails generate module
