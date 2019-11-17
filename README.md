![](https://codebuild.us-east-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicGgrNDN3TGVzeTJPckpTVklKMmI4NWsyclZBSHBSdEdBOHpzeDdMamdXbW1vakhya0NiSytQeGszckVXVlM5NXdnaHNMOUdKZHc5TmgrdG9PR1RlTGQwPSIsIml2UGFyYW1ldGVyU3BlYyI6IlM3NktvSWJoZlBuYjJhOVUiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

# Introducción

Back-end para Desafio Ripley Transformacion Digital, utiliza varios servicios de AWS para el hosting de las distintas tecnologias, NodeJs y Express para la creacion de la API, Docker para encapsular la API en un container y Redis para almacenar en cache consultas recientes.

# Endpoints

### `GET /`

Endpoint que utiliza AWS Application Load Balancer para monitoriar la salud de cada nodo de la API

Response Body:
```
Everything is fine in the back-end
```

### `GET /part_number/{partNumber}`

Endpoint que el front-end pueda consultar sobre productos segun su sku

Response Body:
```
{
    "uniqueID": "16135124",
    "partNumber": "2000375653014P",
    "name": "BICICLETA NINJA ARO 27.5 21V",
    "locals": {...},
    "fullImage": "//home.ripley.cl/store/Attachment/WOP/D192/2000375653014/2000375653014_2.jpg",
    "images": [...],
    "prices": {...},
    "shortDescription": "Mountain Bike",
    "longDescription": "<h2>BICICLETA NINJA ARO 27.5 21V</h2><p>M&#xE1;xima comodidad en la mejor combinaci&#xF3;n de elementos es lo que te presenta Kawasaki con su l&#xED;nea de bicicletas mountain bike. Apuestas vers&#xE1;tiles y pr&#xE1;cticas para solventar tus tramos en la ciudad. Recorre tu entorno bajo los elementos que Kawasaki tiene para ti. En esta ocasi&#xF3;n anima tus traslados con la bicicleta MTB Ninja Aro 27.5 de 21 velocidades. Composici&#xF3;n de aluminio y frenos de disco mec&#xE1;nicos para un control ideal. &#xA1;Encuentra esta propuesta deportiva a trav&#xE9;s de Ripley.com!</p><br><br><b>CARACTER&#xCD;STICAS T&#xC9;CNICAS</b><br><p>Marco: Aluminio. Talla 17.5.<br>Horquilla: Suspensi&#xF3;n delantera 100mm Suntoure.<br>Llantas: Aluminio doble pared.<br>Neum&#xE1;ticos: 27.5 x 2.10 Wanda.<br>Sistema de frenos: Disco mec&#xE1;nico (Delantero y Trasero).<br>Sill&#xED;n Quick Release: S&#xED;.<br>Cambios: Shimano Tourney.<br>Manubrio: Aluminio.<br>Asiento: MTB VD-1153.</p>",
    "definingAttributes": [],
    "attributes": [...],
    "shipping": {...},
    "xCatEntryCategory": "D192",
    "productString": "bicicleta-ninja-aro-275-21v-2000375653014p",
    "SKUs": [...],
    "isMarketplaceProduct": false,
    "marketplace": {},
    "warranties": [],
    "url": "/bicicleta-ninja-aro-275-21v-2000375653014p",
    "thumbnailImage": "//home.ripley.cl/store/Attachment/WOP/D192/2000375653014/2000375653014_2.jpg",
    "simple": {...},
    "single": true
}
```

# Stack de Tecnologias

+ NodeJs
+ Express
+ Redis
+ Docker

# Servicios de Amazon Web Services utilizados
+ ElastiCache para hosting del cache Redis.
+ Aplication Load Balancer para servir de "front controller" entre el front-end y los posibles varios nodos de la API, el servicio tambien la salud y uso de cada nado, redireccionando requests a los nodos que tengan menos carga.
+ Auto Scaling Group para el auto escalado de la API, actualmente esta configurado para siempre tener un nodo corriendo, en el caso que este falle y muera, se inicia otro inmediatamente previniendo downtimes, ademas este puede escalar a dos nodos si la carga aumenta drasticamente, y se reducira a uno nuevamente cuando esta baje.
+ ECS Fargate para el manejo de las imagenes Docker de la API, con este servicio puedo hostear la API sin provicionar servers.
+ ECR para tener un registro y versionado de las imagenes Docker de la API, se utiliza como referencia para hacer deploys de la API.
+ CodeBuild servicio de CI/CD, despues de cada commit a GitHub, se crea una build, donde se crea una imagen Docker con los ultimos cambios, se almacena en ECR y se indica a ECS que haga un nuevo deploy.
+ SSM Parameter Store gracias a este servicio, puedo tener todos los secretos (en este caso la direccion de conexion a Elasticache) en AWS sin tener que subirlos a Git y exponer informacion.
