# Changelog

## [2.4.0](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.3.0...v2.4.0) (2024-02-24)

### 🌟 Features

-   add author prompt to remaining generators ([53501b7](https://github.com/Norgate-AV/generator-norgate-av/commit/53501b78aee4c7757fcaabf9f346619fca14e197))
-   **typescript:** add author prompt ([6e3db94](https://github.com/Norgate-AV/generator-norgate-av/commit/6e3db945c8f7a5aabc5c421e8a40ebe89d53316e))
-   add author template strings ([212083f](https://github.com/Norgate-AV/generator-norgate-av/commit/212083fcb7941b9fcab4f20d72634ff66d8d1132))
-   **app:** add user field to root generator ([ea47cc5](https://github.com/Norgate-AV/generator-norgate-av/commit/ea47cc500d201fcb7b77c83c836b286d31681b87))
-   **app:** complete Author question class ([09062d2](https://github.com/Norgate-AV/generator-norgate-av/commit/09062d21324ea02259d330175c2fb412d19bf089))

### 🐛 Bug Fixes

-   dont set the author from answers when skipping prompts ([57cc550](https://github.com/Norgate-AV/generator-norgate-av/commit/57cc550960e463a3054f7432ed7ed2d1485ef602))
-   ensure user field is an empty string by default ([1e42806](https://github.com/Norgate-AV/generator-norgate-av/commit/1e4280637e5504723c0da198a4079e94c0e5a8fb))
-   remove default values from author and description cli options ([3e9fd37](https://github.com/Norgate-AV/generator-norgate-av/commit/3e9fd37c9e827f0d39c0680bd96864fcc10cb33e))
-   set author to default if undefined ([f793524](https://github.com/Norgate-AV/generator-norgate-av/commit/f793524d5cf7feef89a6943ca50f90601372030a))

### 🧰 Chores

-   **deps:** bump deps ([927b152](https://github.com/Norgate-AV/generator-norgate-av/commit/927b152e0d8ca4173c8e14a6b2a22c3e9cc48b8c))

### ✨ Refactor

-   **questions:** dont export BaseQuestion class ([466e1e0](https://github.com/Norgate-AV/generator-norgate-av/commit/466e1e019e96f82fdef70a40a9eae337c9275576))
-   **helpers:** edit all methods on GitHelper to be public ([6986b61](https://github.com/Norgate-AV/generator-norgate-av/commit/6986b61600963477115e36bdfc48b525db0d9f02))

### 🧪 Tests

-   add author assertions to remaining tests ([e54e5f6](https://github.com/Norgate-AV/generator-norgate-av/commit/e54e5f67b9819191e6ea87ed07fed52d305b43d7))
-   **typescript:** add author assertions to tests ([f6003cf](https://github.com/Norgate-AV/generator-norgate-av/commit/f6003cfeb45b169a3deece40e7c0b660e83fa405))
-   **typescript:** add helper functions for common assertions ([e5f78c8](https://github.com/Norgate-AV/generator-norgate-av/commit/e5f78c843d7aadac830465cad0618a673d42ba17))
-   **simpl:** fix incorrect arg passed to assertion helper for ([79ba274](https://github.com/Norgate-AV/generator-norgate-av/commit/79ba274eebe1d9a2c31b423c61715c62731deffc))
-   pass an empty string to author as default when running in CI ([fff49b4](https://github.com/Norgate-AV/generator-norgate-av/commit/fff49b443057d1f874910557852172fafef00948))
-   utilize helper assertions in remaining tests ([7cdede3](https://github.com/Norgate-AV/generator-norgate-av/commit/7cdede376a57cc36b9c2c3a199b72f3fae83a644))

## [2.3.0](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.2.0...v2.3.0) (2024-02-21)

### 🌟 Features

-   **nodecli:** add a basic test ([1401082](https://github.com/Norgate-AV/generator-norgate-av/commit/14010823ae3ba158afc3e13b212a5084f5023307))
-   **nodecli:** add a vscode debug launch config ([311813d](https://github.com/Norgate-AV/generator-norgate-av/commit/311813db4e80fe3319af1391a86127b6cc76df25))
-   **nodecli:** add boilerplate cli app ([4cd0018](https://github.com/Norgate-AV/generator-norgate-av/commit/4cd0018dc771f4b3eb988614704ba90ec010d665))
-   **nodecli:** add eslint config ([60d4d9b](https://github.com/Norgate-AV/generator-norgate-av/commit/60d4d9b127b7f7cce81ca26c39eed57c998a8d0b))
-   **nodecli:** update gitattributes ([534d695](https://github.com/Norgate-AV/generator-norgate-av/commit/534d695437bac309528cc7705133f8b6d5f20431))
-   **nodecli:** update gitignore ([16e5ef7](https://github.com/Norgate-AV/generator-norgate-av/commit/16e5ef7803132b1c5f8c2b2b90aed710f65207be))
-   **nodecli:** update semantic-release ci config ([5d5ec03](https://github.com/Norgate-AV/generator-norgate-av/commit/5d5ec03e5f641ff7c0e3467ef1eb48e545d9f024))
-   **nodecli:** update vscode extensions ([65d5480](https://github.com/Norgate-AV/generator-norgate-av/commit/65d5480bda34d94cb43258e741e7b7957f0dbddb))

### 🧰 Chores

-   merge pull request [#134](https://github.com/Norgate-AV/generator-norgate-av/issues/134) from feat/update-nodecli ([a5abfb2](https://github.com/Norgate-AV/generator-norgate-av/commit/a5abfb2b4212b086c7beae962c0b6c6b0d275f36))

### 🧪 Tests

-   update nodecli tests for added features ([13475b5](https://github.com/Norgate-AV/generator-norgate-av/commit/13475b5b4a13212130efe86eccef200d4d3c77f2))

## [2.2.0](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.1.0...v2.2.0) (2024-02-21)

### 🌟 Features

-   **javascript:** add a basic test ([c1f6843](https://github.com/Norgate-AV/generator-norgate-av/commit/c1f6843f6da65f40b77f737842ba41b40a370995))
-   **javascript:** add basic eslint config ([8694b3d](https://github.com/Norgate-AV/generator-norgate-av/commit/8694b3dd5c79637ea6c18b354642994be097281d))
-   **javascript:** add debug launch config ([106a1c7](https://github.com/Norgate-AV/generator-norgate-av/commit/106a1c780941c827b0564b21647408699357d52c))
-   **javascript:** add more comprehensive ci workflow ([9b8202c](https://github.com/Norgate-AV/generator-norgate-av/commit/9b8202c8389200df49f56bc7ce562cf7981bf4e7))
-   **javascript:** update extensions list ([3396e14](https://github.com/Norgate-AV/generator-norgate-av/commit/3396e148d5dd9c7a56f37f5af395e4632df5b1ca))

### 🧰 Chores

-   merge pull request [#133](https://github.com/Norgate-AV/generator-norgate-av/issues/133) from feat/update-js ([4ee85ea](https://github.com/Norgate-AV/generator-norgate-av/commit/4ee85ea4ba0a34e32374802b8fdd5574c31d905d))
-   **javascript:** update changelogrc ([065d4c2](https://github.com/Norgate-AV/generator-norgate-av/commit/065d4c24e84a2817a9dc0b4278e1c21921aa1fc1))
-   **javascript:** update gitattributes ([787ccf4](https://github.com/Norgate-AV/generator-norgate-av/commit/787ccf421d543cd4545e2e5111f59183f8f92c86))
-   **javascript:** update gitignore ([0f6ce2d](https://github.com/Norgate-AV/generator-norgate-av/commit/0f6ce2dd7c88607abc20cd6381328173e87d6679))

### 🧪 Tests

-   update javascript test for added features ([f1a6680](https://github.com/Norgate-AV/generator-norgate-av/commit/f1a6680e729d491860d679b715d63e9bb73bdae6))

## [2.1.0](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.12...v2.1.0) (2024-02-21)

### 🌟 Features

-   **html:** add alive-server setup ([6b541ad](https://github.com/Norgate-AV/generator-norgate-av/commit/6b541ad1df922d3a4c46023df80a73fd8100383e))
-   **html:** add better ci workflow ([231500b](https://github.com/Norgate-AV/generator-norgate-av/commit/231500b9b82282151065b459efbb596ad08bb404))
-   **html:** update default web page with some interactivity ([20d92eb](https://github.com/Norgate-AV/generator-norgate-av/commit/20d92ebb9d66a4df89f13a7d242247b05821b87b))
-   **html:** update gitattributes ([a2d1949](https://github.com/Norgate-AV/generator-norgate-av/commit/a2d194994669e991b63e8db0d50cb58bbcaa03da))
-   **html:** update gitignore ([98977a0](https://github.com/Norgate-AV/generator-norgate-av/commit/98977a0acbbfdc1687033778dda70b45af12283c))

### 🧰 Chores

-   **deps:** bump all deps ([0ff5937](https://github.com/Norgate-AV/generator-norgate-av/commit/0ff593757f452690f1079dcad7c28c06102a385a))
-   **node:** bump to 20.11.1 ([2f376e8](https://github.com/Norgate-AV/generator-norgate-av/commit/2f376e8dcdbf0da16aceceafbee3e5bb04d8c06d))
-   merge pull request [#132](https://github.com/Norgate-AV/generator-norgate-av/issues/132) from feat/update-html ([7b27ac4](https://github.com/Norgate-AV/generator-norgate-av/commit/7b27ac423e9bd13f6a3ee39e84937eb1cbadd40f))
-   **semantic-release:** update config ([312bc9e](https://github.com/Norgate-AV/generator-norgate-av/commit/312bc9efae854e22f074bc742600cffbdb50cb03))
-   **git:** update gitignore ([871ce6a](https://github.com/Norgate-AV/generator-norgate-av/commit/871ce6a88a86b67e9b3aabb7dc2f845523014232))

### 🧪 Tests

-   **html:** update test for new features ([b8c52e6](https://github.com/Norgate-AV/generator-norgate-av/commit/b8c52e6065db18e6e257335a71fe5d01fbd4bf70))

### 🤖 CI

-   convert repository to lowercase for docker build ([ebaa6c4](https://github.com/Norgate-AV/generator-norgate-av/commit/ebaa6c45e1bd65e60b0e6c871e5f8b8bc73e5573))
-   remove working dir from docker build ([8a35e42](https://github.com/Norgate-AV/generator-norgate-av/commit/8a35e428bf04c7c20bc93b3dee3ca3c705f91ff5))

## [2.0.12](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.11...v2.0.12) (2024-02-13)

### 🐛 Bug Fixes

-   remove node config ([#119](https://github.com/Norgate-AV/generator-norgate-av/issues/119)) ([ed0da87](https://github.com/Norgate-AV/generator-norgate-av/commit/ed0da87c84cfb543d406502ca3e26d9701fcd40d))

## [2.0.11](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.10...v2.0.11) (2024-02-08)

### 🐛 Bug Fixes

-   update keys when getting signatures ([65e1acc](https://github.com/Norgate-AV/generator-norgate-av/commit/65e1acc06b5ad69f3d97206e226dd2be2fa91c60))

## [2.0.10](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.9...v2.0.10) (2024-02-08)

### 🐛 Bug Fixes

-   make generator keys and ids match with no "-" ([531ec44](https://github.com/Norgate-AV/generator-norgate-av/commit/531ec44e78488b7ad5df2374d8a5421b80bf489b))

## [2.0.9](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.8...v2.0.9) (2024-02-08)

### 🐛 Bug Fixes

-   remove "-" from template folder indexing ([0d90296](https://github.com/Norgate-AV/generator-norgate-av/commit/0d902969d591b664168b384583b35724008d9744))

## [2.0.8](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.7...v2.0.8) (2024-02-08)

### 🐛 Bug Fixes

-   remove "-" from generator configs ([9115b41](https://github.com/Norgate-AV/generator-norgate-av/commit/9115b41fe33b2f5dae4991288168885bfd140673))

## [2.0.7](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.6...v2.0.7) (2024-02-08)

### ✨ Refactor

-   **config:** rename "Node" templates to "Node.js..." ([d26a7c1](https://github.com/Norgate-AV/generator-norgate-av/commit/d26a7c101c40758246ee1e75ddc14b14a77aa060))

## [2.0.6](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.5...v2.0.6) (2024-02-08)

### 🐛 Bug Fixes

-   read config directory into app ([efa07f6](https://github.com/Norgate-AV/generator-norgate-av/commit/efa07f640526e1d6bab9578a418a121617a7f84d))

## [2.0.5](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.4...v2.0.5) (2024-02-08)

### 🐛 Bug Fixes

-   set node config directory in environment ([0909795](https://github.com/Norgate-AV/generator-norgate-av/commit/090979532693664ec9140d6edd278d2309abca17))

## [2.0.4](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.3...v2.0.4) (2024-02-07)

### 🐛 Bug Fixes

-   copy config directory to correct location ([c683e71](https://github.com/Norgate-AV/generator-norgate-av/commit/c683e71fb76dd6114e4c0569b5469fd1a7b8349b))

## [2.0.3](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.2...v2.0.3) (2024-02-07)

### 🐛 Bug Fixes

-   fix linting errors ([6a16dbb](https://github.com/Norgate-AV/generator-norgate-av/commit/6a16dbbfb4e2e760be194dd78e1a9fc653b7dd37))
-   make build output correct structure for yeoman ([78bb5d8](https://github.com/Norgate-AV/generator-norgate-av/commit/78bb5d83c228252e15cc45fa3d9515b4350c8cd0))

## [2.0.2](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.1...v2.0.2) (2024-02-07)

### 🐛 Bug Fixes

-   output build to generators folder ([7d3a5e8](https://github.com/Norgate-AV/generator-norgate-av/commit/7d3a5e87903a76802841e4338f8f5c6940620dbc))

## [2.0.1](https://github.com/Norgate-AV/generator-norgate-av/compare/v2.0.0...v2.0.1) (2024-02-07)

### 🐛 Bug Fixes

-   do not lint templates directory ([579f28f](https://github.com/Norgate-AV/generator-norgate-av/commit/579f28f27ef62e4d2f88e24efcf4415d40b29fa2))
-   fix ci workflow to correctly build and release ([61c24d2](https://github.com/Norgate-AV/generator-norgate-av/commit/61c24d20f4e138c433f917379e2e6962f20c8502))

## [2.0.0](https://github.com/Norgate-AV/generator-norgate-av/compare/v1.0.6...v2.0.0) (2024-02-07)

### ⚠ BREAKING CHANGES

-   convert to typescript (#118)

### 🌟 Features

-   convert to typescript ([#118](https://github.com/Norgate-AV/generator-norgate-av/issues/118)) ([d673cef](https://github.com/Norgate-AV/generator-norgate-av/commit/d673cef6ec39f8f520387afc76711c71f1f4de5a))

## [1.0.6](https://github.com/Norgate-AV/generator-norgate-av/compare/v1.0.5...v1.0.6) (2023-09-24)

## [1.0.5](https://github.com/Norgate-AV/generator-norgate-av/compare/v1.0.4...v1.0.5) (2023-09-24)

### Bug Fixes

-   insert dash for ejs template ([5110b4c](https://github.com/Norgate-AV/generator-norgate-av/commit/5110b4ccd175ed9c3bfd346f42597cbdcc5792eb))

## [1.0.4](https://github.com/Norgate-AV/generator-norgate-av/compare/v1.0.3...v1.0.4) (2023-09-24)

### Bug Fixes

-   **project-ts:** remove trailing quotes in ejs file ([9a278a5](https://github.com/Norgate-AV/generator-norgate-av/commit/9a278a5d38e8bfeb1766ccf04fcec363c9ad4ffe))

## [1.0.3](https://github.com/Norgate-AV/generator-norgate-av/compare/v1.0.2...v1.0.3) (2023-09-24)

## [1.0.2](https://github.com/Norgate-AV/generator-norgate-av/compare/v1.0.1...v1.0.2) (2023-09-24)

### Bug Fixes

-   **templates:** add missing .changelogrc.json file ([7c11bbe](https://github.com/Norgate-AV/generator-norgate-av/commit/7c11bbe8cfafe0230f9b1c01441c96427f0a977d)), closes [#95](https://github.com/Norgate-AV/generator-norgate-av/issues/95) [#96](https://github.com/Norgate-AV/generator-norgate-av/issues/96) [#97](https://github.com/Norgate-AV/generator-norgate-av/issues/97) [#98](https://github.com/Norgate-AV/generator-norgate-av/issues/98)
-   **c-template:** copy Makefile into project ([b2ea949](https://github.com/Norgate-AV/generator-norgate-av/commit/b2ea949102dec9443c70d460d40615746aafebee)), closes [#100](https://github.com/Norgate-AV/generator-norgate-av/issues/100)
-   **python-template:** remove nodejs related files ([0d055dd](https://github.com/Norgate-AV/generator-norgate-av/commit/0d055ddbaf965d6d867590b637f1bb32351f2f3f)), closes [#99](https://github.com/Norgate-AV/generator-norgate-av/issues/99)

## [1.0.1](https://github.com/Norgate-AV/generator-norgate-av/compare/v1.0.0...v1.0.1) (2023-09-19)

### Bug Fixes

-   fix typo in project dir name ([368cc68](https://github.com/Norgate-AV/generator-norgate-av/commit/368cc685fbde0e7acaf767b374423b6125218cfe))

## 1.0.0 (2023-09-19)

### Features

-   **docker:** add bash script to wrap running the generator within docker ([cfdb21f](https://github.com/Norgate-AV/generator-norgate-av/commit/cfdb21fd2ecebbee9deff7fed866b1cd07ad576f))
-   **generator:** add clang generator ([22ec631](https://github.com/Norgate-AV/generator-norgate-av/commit/22ec63164de3f7ec0210f2ccbc53eed0a7bbbf13))
-   **generator:** add cli project generator ([cba1cd0](https://github.com/Norgate-AV/generator-norgate-av/commit/cba1cd00f73fd80c87c155cc06dde7c11bdb2506))
-   **generator:** add console output for git init ([232f0d7](https://github.com/Norgate-AV/generator-norgate-av/commit/232f0d71ceae95fc263106f67a848d5d09eb6673))
-   **generator:** add dependency getter function ([3fcd411](https://github.com/Norgate-AV/generator-norgate-av/commit/3fcd41194af0b5dc1738ec8d876952141003d7b8))
-   **docker:** add Dockerfile ([d3bda50](https://github.com/Norgate-AV/generator-norgate-av/commit/d3bda50f9e92eecc170214033f8515617daba085))
-   **env:** add git and code path helper functions ([c8d9f8a](https://github.com/Norgate-AV/generator-norgate-av/commit/c8d9f8a5e5869c82a5a4be4973c875c8e2470dae))
-   **generator:** add global dependency store ([06dd0e6](https://github.com/Norgate-AV/generator-norgate-av/commit/06dd0e68ffe79ed1d47ab842cfdd7133fd9c8ef2))
-   **generator:** add initial implementation of generator ([96adc6d](https://github.com/Norgate-AV/generator-norgate-av/commit/96adc6da837ea12ca6cb9f1fe843610a3bf8ab5c))
-   **generator:** add list of global deps to project config ([b78991d](https://github.com/Norgate-AV/generator-norgate-av/commit/b78991d98760367fe1ab79535a4371394d33780a))
-   add pnpm as package manager option ([044dcf9](https://github.com/Norgate-AV/generator-norgate-av/commit/044dcf93ce1d56fd91971f14f022e1756eb52aa3))
-   **generator:** add project-js template ([e3734f2](https://github.com/Norgate-AV/generator-norgate-av/commit/e3734f2ee1e836e82b9194d81d622cea500d390f))
-   **generator:** add python generator ([d5caa2d](https://github.com/Norgate-AV/generator-norgate-av/commit/d5caa2d818d02473c231c5f8f94a1969d8447cfd))
-   add template for Crestron SIMPL ([0b6eb06](https://github.com/Norgate-AV/generator-norgate-av/commit/0b6eb066a81b88f88dfffa8b0d2b2b58e2dc60f6))
-   add typesctipt project generator ([a64b4c6](https://github.com/Norgate-AV/generator-norgate-av/commit/a64b4c69425e7eb12dfdf223e2bc87323791ab4e))
-   **generator:** add vanilla html, css & js generator ([b9e512b](https://github.com/Norgate-AV/generator-norgate-av/commit/b9e512b9b5ed80497a07ff0b3a6f40f726c76fde))
-   **project-html:** add yeoman svg ([7d05f07](https://github.com/Norgate-AV/generator-norgate-av/commit/7d05f078590c2b163ab6ae466f293c44031049e8))
-   get node version from dependencies ([4716d1a](https://github.com/Norgate-AV/generator-norgate-av/commit/4716d1a0a922907023688475e79f2656265c7f78))
-   update dependecies ([c48e005](https://github.com/Norgate-AV/generator-norgate-av/commit/c48e005f25332e3311ded4d3a78264cde8918aa1))

### Bug Fixes

-   **project-js:** add missing colon ([0c303be](https://github.com/Norgate-AV/generator-norgate-av/commit/0c303becba7c411191516a04bb82dac12ebf9be5))
-   **generate-javascript:** apply projectConfig to jsconfig template ([8543056](https://github.com/Norgate-AV/generator-norgate-av/commit/8543056c3d7f9a4a724771703e517b1f58f22736))
-   **project-ts:** fix file ext on main entry point ([6798acb](https://github.com/Norgate-AV/generator-norgate-av/commit/6798acb9cabe54827a7acfaf0ac69ea336c49a77))
-   **generator:** fix typo in dependencies directory name ([6be07f3](https://github.com/Norgate-AV/generator-norgate-av/commit/6be07f33de1af390809f51f6fc2c043c59cb8324))
-   remove dangling comma ([ff0ccee](https://github.com/Norgate-AV/generator-norgate-av/commit/ff0cceeb97ebcf7c5332c0c0c17adac16ea6098c))
-   **generator:** use options property on generator for skip prompts ([9fc9a40](https://github.com/Norgate-AV/generator-norgate-av/commit/9fc9a4002a553eb02d907b43a1949a62b85831e5))
