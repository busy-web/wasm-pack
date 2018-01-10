
all: build

build:
	emcc src/hello.c -s WASM=1 -o dist/hello.html
