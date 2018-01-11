
all: clean build

clean:
	rm -rf ./build
	rm -rf ./dist

build:
	mkdir build
	emcc src/main.c -s WASM=1 -o build/main.js
