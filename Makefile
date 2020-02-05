
# a phony dependency that can be used as a dependency to force builds
FORCE:

build: FORCE
	yarn install && yarn build && cd prodserver && yarn install

run: build
	cd prodserver && node index.js

package: build
	cd package && ./package.sh
