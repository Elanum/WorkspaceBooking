## [1.0.1](https://github.com/Elanum/workspace-booking/compare/v1.0.0...v1.0.1) (2021-02-20)


### Bug Fixes

* hotfix multiple bookings are occupied bug ([6ec654e](https://github.com/Elanum/workspace-booking/commit/6ec654e3d00271d71e853df45c412e16a1aa980c))

# [1.0.0](https://github.com/Elanum/workspace-booking/compare/v0.3.0...v1.0.0) (2021-02-20)


### Features

* add filter for workspaces ([a744d4b](https://github.com/Elanum/workspace-booking/commit/a744d4b2bb7825a977c62e73093bf29eaed567c4))
* change new booking modal ([11264b6](https://github.com/Elanum/workspace-booking/commit/11264b69f9a34639da25fef0144a56c6a768af60))


### BREAKING CHANGES

* complete new design of workspaces

# [0.3.0](https://github.com/Elanum/workspace-booking/compare/v0.2.1...v0.3.0) (2021-02-07)


### Bug Fixes

* fix undefined user id on new bookings ([13df46c](https://github.com/Elanum/workspace-booking/commit/13df46c06fcfd234a5754ee8dd0346d4b63c97b4))


### Features

* add rate-limiting to routes ([ac778a1](https://github.com/Elanum/workspace-booking/commit/ac778a1d18b70a9fa93d7992804ece120494510d))
* remove room views ([2c91365](https://github.com/Elanum/workspace-booking/commit/2c91365ffc65dfb7566262b5e8174fb03af1703a))


### Performance Improvements

* increased rate limit ([277dd58](https://github.com/Elanum/workspace-booking/commit/277dd5823e53f5daacf06d60ecba2691cbadf634))

## [0.2.1](https://github.com/Elanum/workspace-booking/compare/v0.2.0...v0.2.1) (2021-01-29)


### Bug Fixes

* fix update_develop workflow ([68cb7e9](https://github.com/Elanum/workspace-booking/commit/68cb7e99c9e1a69ef6199f131b0afae8df7df4d9))

# [0.2.0](https://github.com/Elanum/workspace-booking/compare/v0.1.0...v0.2.0) (2021-01-29)


### Bug Fixes

* add working directories to workflow ([3931b93](https://github.com/Elanum/workspace-booking/commit/3931b934d3be8785cf38d86374756fc52cb8f080))
* change server port to heroku config vars ([fa318c0](https://github.com/Elanum/workspace-booking/commit/fa318c071f6e22e40d6728d7c3d993301538d4f7))
* fix no-unused-vars error ([a28a6a6](https://github.com/Elanum/workspace-booking/commit/a28a6a6e668cf18e098f4c63da2047336ed3a9e0))
* fix proxy function due to update ([dbf687d](https://github.com/Elanum/workspace-booking/commit/dbf687d5fa90b61f778520a9c200b4aaa43eeb22))
* fix workspace initialization ([1b3b0c1](https://github.com/Elanum/workspace-booking/commit/1b3b0c1227672e9fa1d21f7037d6a47cdffa3f6e))


### Features

* add eslint workflow ([e4345cb](https://github.com/Elanum/workspace-booking/commit/e4345cb7853895980ea2e1e5ee41b60354e3ea89))
* error handling with sentry ([b971b45](https://github.com/Elanum/workspace-booking/commit/b971b453f411bb2fdb454bc925f099e6b6fdb764)), closes [#13](https://github.com/Elanum/workspace-booking/issues/13)
* initial sentry setup ([5b68f97](https://github.com/Elanum/workspace-booking/commit/5b68f975c917c85817b2d99d4899180d9eebb30b))


### Reverts

* re-add changelog ([bed17c2](https://github.com/Elanum/workspace-booking/commit/bed17c286c9acd95e2f9f264e49ead09a80c5f06))

## 0.1.0 (2021-01-03)


### Features

* **client:** add booking via workspaces ([c6d060f](https://github.com/Elanum/workspace-booking/commit/c6d060fc4c41a8d999e2125afe06110c2d230ba9))
* **client:** add bootstrap css framework ([da9d225](https://github.com/Elanum/workspace-booking/commit/da9d225868dd854f509cfeaad88126b72fb474d6))
* **client:** add filter and update to form ([9452cb8](https://github.com/Elanum/workspace-booking/commit/9452cb8a1dba81d281647f29cab1342ad5e55f12))
* **client:** add frontend login & logout ([e6c9f42](https://github.com/Elanum/workspace-booking/commit/e6c9f42527735b0ce995efbe694b0cc15d4e0a83))
* **client:** add http-proxy for internal requests ([db2ecaf](https://github.com/Elanum/workspace-booking/commit/db2ecafa93b00ed071f87dc26d61bedf18a70d57))
* **client:** add room view ([813caae](https://github.com/Elanum/workspace-booking/commit/813caaea62a40479a35adee09b26aaac2448c7ab))
* **client:** add views for rooms, workplaces, bookings and profile ([0cc81bf](https://github.com/Elanum/workspace-booking/commit/0cc81bfeb2611973fdba3fae135a50be227f14bc))
* **client:** create client with create-react-app ([182b8b1](https://github.com/Elanum/workspace-booking/commit/182b8b1a1fae5bc3aaa368b457ea0a5af11ebe1b))
* **client:** first design implementations ([c83af0a](https://github.com/Elanum/workspace-booking/commit/c83af0ad21cb8589db5fa576b9128c1a253bbac7))
* **server:** add express server ([41ba8d5](https://github.com/Elanum/workspace-booking/commit/41ba8d53e6744183a656cff6a11acdff1815c287))
* **server:** add new routes ([4d9ee1d](https://github.com/Elanum/workspace-booking/commit/4d9ee1dc2b8335f9320734a2e5417c0d68242229))
* **server:** add routes for booking ([4d2aee2](https://github.com/Elanum/workspace-booking/commit/4d2aee2703c7eed5e360ca0c4477413a0046e585))
* improve workspaces routes and views ([d4a671a](https://github.com/Elanum/workspace-booking/commit/d4a671ace1b16f24417137918e87f2468bb4ee33))
* init base structure ([42d830e](https://github.com/Elanum/workspace-booking/commit/42d830e5cc7f981532880d1ec3df7d221304c7b3))
* **server:** add username & password input check ([5e677c5](https://github.com/Elanum/workspace-booking/commit/5e677c552f69823105c1c6a30c92024933989699))
* **server:** change bookings model ([a20d341](https://github.com/Elanum/workspace-booking/commit/a20d341a5a695c552ed84cfef78fe8ab254d9ed8))
* **server:** extended routes for bookings, rooms and workplaces ([b7879e9](https://github.com/Elanum/workspace-booking/commit/b7879e9052ea6cf3b511a87ef9584be5349821bc))
* **server:** imporve init data import to mongoose ([a118406](https://github.com/Elanum/workspace-booking/commit/a1184067b50896948e3bd0e9c7c73b4d909f4970))


### Bug Fixes

* **client:** final fix of redux dispatch on navlinks ([d5cb178](https://github.com/Elanum/workspace-booking/commit/d5cb178062d94657a225cb39855c2fee44c793a8)), closes [#1](https://github.com/Elanum/workspace-booking/issues/1)
* **client:** fix dispatch on navlink ([85fa5bb](https://github.com/Elanum/workspace-booking/commit/85fa5bb77deafffee253c259259165a8bd5dc66a))
* **client:** fix password crypt ([c9e3ce0](https://github.com/Elanum/workspace-booking/commit/c9e3ce00f68729ef41dc0f6e0b385583b425989a))
* **client:** fix redux routing ([e716fff](https://github.com/Elanum/workspace-booking/commit/e716fff74f1236333847738245de33d3cb096fc6))
* **server:** fix booking filter ([4b488e3](https://github.com/Elanum/workspace-booking/commit/4b488e374f0f34d087e4de8ea1eec70da30c8029))
* **server:** fix exeption on specific user ([81ad74c](https://github.com/Elanum/workspace-booking/commit/81ad74cac2a28be7ad4b1266b249170fe18ef143))
* **server:** fix initalization of workspaces ([c2467eb](https://github.com/Elanum/workspace-booking/commit/c2467ebc7f30540b0c9723357543ed1c56748cd0))
* **server:** fix password check on login ([56109bc](https://github.com/Elanum/workspace-booking/commit/56109bc796deac11dad87729c50c1024e318d258))
* **server:** fix reset password route ([03e6e47](https://github.com/Elanum/workspace-booking/commit/03e6e475bcfc8ebe3620a9f001dbae42f22aed8c))
* remove booking error on modal close ([da1cbfc](https://github.com/Elanum/workspace-booking/commit/da1cbfcd0eaa841bc726b30768c499f7f5b0f2b7))
* **server:** fix return on error ([8278274](https://github.com/Elanum/workspace-booking/commit/82782745428f4ed4a5622ac3f81c04e5c4814edd))
* remove Container from logout view ([da4dd28](https://github.com/Elanum/workspace-booking/commit/da4dd282a8d43e1dd35e42994724421142c0ff23))
