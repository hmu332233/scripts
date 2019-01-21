FROM node:8
MAINTAINER minung.han(hmu332233@gmail.com)

# 설치
RUN apt-get update
RUN apt-get install locales language-pack-ko

# /app 디렉토리 생성
RUN mkdir -p /app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app
# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /app
# npm install 을 실행
RUN npm install

# set locale ko_KR
ENV LANG ko_KR.UTF-8
ENV LANGUAGE ko_KR.UTF-8

RUN locale-gen ko_KR.UTF-8  && \
    update-locale LANG=ko_KR.UTF-8 && \
    dpkg-reconfigure locales

RUN bash -c 'echo "Asia/Seoul" > /etc/timezone' && \
    dpkg-reconfigure -f noninteractive tzdata

# remove apt-get list
RUN rm -rf /var/lib/apt/lists/*