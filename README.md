# Generic task executor

![Arquitectura](https://github.com/matiasgimenezdev/generic-task-service/assets/117539520/fddcdd47-a28e-4077-b282-6f134ce04cc4)

## Descripción

Para iniciar los proyectos con spring utilizamos el [Spring Initialzr](https://start.spring.io/). Luego, para la comunicación del servidor con el demonio de Docker hicimos uso de la liberia [docker-java](https://github.com/docker-java/docker-java), ya que Docker no provee una libreria oficial para Java pero si recomienda algunas y esta es una de ellas.

## Instrucciones de ejecución

La idea es levantar localmente el contenedor que contiene el servidor, por lo cual, debe tener Docker instalado. Luego, ejecutar el cliente para que se inicie la comunicacion entre procesos.

#### Descargar imagen del servidor

```
$ docker pull mgimenezdev/task-server:v1
```

#### Crear el contenedor

```
$ docker run --name=task-server --network=host -v /var/run/docker.sock:/var/run/docker.sock mgimenezdev/task-server:v1
```

-   Puede agregar la opcion **-d o --detach** para ejecutar el servidor en segundo plano. Sin embargo, recomiendo no hacerlo la primera vez para ver el progreso de la ejecucion del servidor.
-   La opcion **-v /var/run/docker.sock:/var/run/docker.sock** es para montar el socket de Docker del host en el contenedor, lo que permite que el contenedor pueda interactuar con el demonio de Docker que se está ejecutando en el host.
-   La opcion **--network=host** es para que el contenedor se ejecute en la red del host y pueda interactuar con el contenedor del servicio que va a ejecutarse dentro del host, como contenedor hermano.

#### Ejecutar el cliente

Una vez que el contenedor del servidor se encuentra en ejecucion, en una nueva terminal o en la misma, dependiendo de si uso o no la **opcion -d o --detach** en el paso anterior, ubiquese en el directorio 'client' e inicie el cliente. <br>

```
$ cd client
$ java -jar target/client.jar
```
