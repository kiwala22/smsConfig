// // import { build } from 'esbuild';
// // import { lessLoader } from 'esbuild-plugin-less';
// const path = require('path');
// // const build = require('esbuild');
// const lessLoader = require('esbuild-plugin-less');

// // build({
// //   watch: true, // enable watch mode
// //   entryPoints: [path.resolve(__dirname, 'index.ts')],
// //   bundle: true,
// //   outdir: path.resolve(__dirname, 'output'),
// //   plugins: [lessLoader()],
// //   loader: {
// //     '.ts': 'ts',
// //   },
// // });
// require("esbuild").build({
//   entryPoints: ["application.ts"],
//   bundle: true,
//   outdir: path.join(process.cwd(), "app/assets/builds"),
//   absWorkingDir: path.join(process.cwd(), "app/javascript"),
//   watch: true,
//   // custom plugins will be inserted is this array
//   plugins: [lessLoader],
//   loader: {
//     '.ts': 'ts'
//   },
// }).catch(() => process.exit(1));
// // build({
// //   entryPoints: ["application.ts"],
// //   bundle: true,
// //   outdir: path.join(process.cwd(), "app/assets/builds"),
// //   absWorkingDir: path.join(process.cwd(), "app/javascript"),
// //   watch: true,
// //   // custom plugins will be inserted is this array
// //   plugins: [],
// //   loader: {
// //     '.ts': 'ts',
// //     '.less': 'less',
// //   },
// // }).catch(() => process.exit(1));

// // "build": "esbuild app/javascript/*.* --bundle --sourcemap --outdir=app/assets/builds --public-path=assets"