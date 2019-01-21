FROM node:8
MAINTAINER minung.han(hmu332233@gmail.com)

# 타임존 변경
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# /app 디렉토리 생성
RUN mkdir -p /app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app
# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /app
# npm install 을 실행
RUN npm install