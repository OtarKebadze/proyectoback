USO MONGO DE MANERA LOCAL, DEJO EL ZIP CON LA BASE DE DATOS PARA QUE PUEDA USARSE.

DB=firebase node server. --> para conectar a firebase
DB=mongoose node server.js --> para conectar a mongoose

CRUD endpoints 

GET--> PRODUCTS -> http://localhost8080/api/products/:id?( CON ID DEVUELVE EL PRODUCTO ID , SIN ID DEVUELVE TODOS )

        CART -> http://localhost8080/api//cart/:id?( BUSCAR LA CART POR ID, SINO TRAE TODAS)

POST--> PRODUCTS -> http://localhost8080/api/products/create (CREA UN PRODUCTO CON EL REQBODY)

        CART -> http://localhost8080/api/:id_cart/products/:id_prod (SI NO ENCUENTRA LA IDCART, CREA UNA , DEVUELVE SU ID Y DESPUES DEJA AGREGAR UN PRODUCTO POR SU ID, USANDO LA ID DE LA CART YA CREADA, USAR ID DE CART YA CREADA kLQ2yWiYsV1hUzyQjgZ0 PARA PROBAR, O SINO USAR CUALQUIER ID PARA GENERAR UNA NUEVA)

DELETE-->PRODUCTS -> http://localhost8080/api/delete/:id? (CON ID BUSCA DEL PRODUCTO Y BORRA, SIN ID BORRA TODO)

         CART -> http://localhost8080/api/cart/delete/:id(CON ID BUSCA Y BORRA, SIN ID BORRA TODO, MENOS EN FIREBASE QUE NO EXISTE UN METODO PARA BORRAR TODA UNA COLECCION)


