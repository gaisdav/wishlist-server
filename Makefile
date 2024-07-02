build:
	yarn run prebuild
	#yarn workspaces focus --production
	yarn install
	yarn run build

prod:
	yarn run prod
