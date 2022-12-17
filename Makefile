.PHONY: build

dev:
	wails dev

build:
	wails build -clean

gen:
	wails generate module

clean:
	rm -rf build/bin
	rm -rf frontend/node_modules
	go clean
