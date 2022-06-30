# Newo Letter

세상 바쁜 당신을 위한 한우 관련 뉴소레터

## Project run

```shell
docker compose up
```

도커를 통해서 로컬에서 watch 모드로 빌드할 수 있습니다.

`http://localhost:4000/` 로 이동해주세요.

## Build

빌드 과정에서는 gulp와 webpack이 작동합니다.

1. scss -> css (gulp)
2. js bundling (webpack)

```shell
# npm
npm run build

# yarn
yarn build
```

## CSS Watch mode

gulp watch 모드를 통해서 scss를 빌드 할 수 있습니다.

```shell
# npm
npm run gulp:watch

# yarn
yarn gulp:watch
```

## 뉴스레터 크롤링

script를 통해 [뉴소레터 아카이브](https://page.stibee.com/archives/137513)에 있는 뉴스레터를 크롤링 할 수 있습니다.

```
# 최근 기사 하나 다운로드
npm run crawl

# 모든 기사 다운로드
npm run crawl-all
```

## 개발할 때 실행할 것

```shell
# jekyll watch모드로 실행
docker compose up

# gulp watch 모드로 실행
npm run gulp:watch
```

## jekyll config

`_config.yml`에서 baseurl을 설정할 수 있습니다. github에는 baseurl:""로 설정되어있습니다.

만약 포크해서 gh-page로 빌드할 때 baseurl을 바꿔주어야합니다.

gh-page 기본 url이 `https://youngkyo0504.github.io/newso/`일 때, baseurl을 newso로 설정해야합니다.
