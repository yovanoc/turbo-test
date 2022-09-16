- [] convert les builds avec tsup avec incremental
- [] prisma data proxy (edge)
- [] add @acme/ for names
- [] handle exports fields from packages
- [] maybe add pnpm fetch in docker images
- [] use onSuccess on tsup instead of nodemon

```json
"main": "./build/cjs/index.js",
"type": "module",
"module": "./build/index.js",
"exports": {
	".": [
		{
			"import": "./build/index.js",
			"require": "./build/cjs/index.js"
		},
		"./build/cjs/index.js"
	]
},
"types": "./build/index.d.ts",
"typeScriptVersion": "3.8.3",
"engines": {
	"node": "^16.13 || >=18"
},
```

 - [] add this eslint config for esm

```json
'import/extensions': ['error', 'ignorePackages']
```


