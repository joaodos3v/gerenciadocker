# LEIA-ME
# 1 -> Esse Dockerfile possui os comandos necessários para buildar um container (ubuntu/debian/alpine/centos)
# com o algoritmo de detecção de falhas (adaptive-dsd). Vale ressaltar, só será possível buildar uma imagem
# de cada vez, ou seja, comente as outras quando não estiver utilizando-a.
# 2 -> Os comandos do ubuntu e do debian são os mesmos, builde-os respeitando a primeira observação. Mantenha no FROM
# um de cada vez.

FROM centos
RUN yum install python3 -y
EXPOSE 5000
COPY . /var/www/app
WORKDIR /var/www/app
ENTRYPOINT ["python3"]
CMD ["adaptive-dsd.py"]


FROM alpine
RUN apk add --update python3
EXPOSE 5000
COPY . /var/www/app
WORKDIR /var/www/app
ENTRYPOINT ["python3"]
CMD ["adaptive-dsd.py"]


FROM debian / ubuntu
RUN apt-get update && apt-get install -y python3 locales
RUN locale-gen pt_BR.UTF-8
ENV LANG pt_BR.utf8  
ENV LANGUAGE pt_BR.utf8  
ENV LC_ALL pt_BR.utf8 
EXPOSE 5000
COPY . /var/www/app
WORKDIR /var/www/app
ENTRYPOINT ["python3"]
CMD ["adaptive-dsd.py"]
