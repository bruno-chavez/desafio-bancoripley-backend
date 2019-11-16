![](https://codebuild.us-east-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicGgrNDN3TGVzeTJPckpTVklKMmI4NWsyclZBSHBSdEdBOHpzeDdMamdXbW1vakhya0NiSytQeGszckVXVlM5NXdnaHNMOUdKZHc5TmgrdG9PR1RlTGQwPSIsIml2UGFyYW1ldGVyU3BlYyI6IlM3NktvSWJoZlBuYjJhOVUiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

# Introduccion

Back-end para Desafio Ripley Transformacion Digital, utiliza varios servicios de AWS para el hosting de las distintas tecnologias


# Stack de Tecnologias

+ Express
+ Redis
+ Docker

# Servicios de Amazon Web Services utilizados
+ ElastiCache para hosting del cache Redis.
+ Aplication Load Balancer para servir de "front controller" entre el front-end y los posibles varios nodos de la API, el servicio tambien la salud y uso de cada nado, redireccionando requests a los nodos que tengan menos carga.
+ Auto Scaling Group para el auto escalado de la API, actualmente esta configurado para siempre tener un nodo corriendo, en el caso que este falle y muera, se inicia otro inmediatamente previniendo downtimes, ademas este puede escalar a dos nodos si la carga aumenta drasticamente, y se reducira a uno nuevamente cuando esta baje.
+ ECS Fargate para el manejo de las imagenes Docker de la API, con este servicio puedo hostear la API sin provicionar servers.
+ ECR para tener un registro y versionado de las imagenes Docker de la API, se utiliza como referencia para hacer deploys de la API
+ CodeBuild servicio de CI/CD, despues de cada commit a GitHub, se crea una build, donde se crea una imagen Docker con los ultimos cambios, se almacena en ECR y se indica a ECS que haga un nuevo deploy
+ SSM Parameter Store gracias a este servicio, puedo tener todos los secretos (en este caso la direccion de conexion a Elasticache) en AWS sin tener que subirlos a Git y exponer informacion
