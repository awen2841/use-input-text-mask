rm -rf ./dist &&
concurrently "tsc --p tsconfig.production.json" \
  "dts-bundle-generator --o ./dist/index.d.ts --no-check --no-banner ./src/index.ts" &&
node ./scripts/beforePublish.js &&
eslint --fix './dist/**/*.ts'
