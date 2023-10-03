# Currency-converter-backend

### Acceso

| Método | Endpoint       | Descripción                               | Body (Cuerpo de la solicitud)                                                                                                                                             | Headers (Encabezados de la solicitud)                         |
|--------|----------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| POST   | /signup        | Crear usuario                             | { "nombre": "Rodrigo Rodriguez","email": "rrodriguez@ejemplo.com","password": "12345678" }                                                                                | Content-Type: application/json                                |
| POST   | /signin        | Autenticar usuario                        | { "email": "rrodriguez@ejemplo.com","password": "12345678" }                                                                                                              | Content-Type: application/json                                |
| POST   | /me            | Traer Informacio de usuario               | N/A                                                                                                                                                                       | Authorization: Bearer {token}                                 |

### Funcionalidad principal

| Método | Endpoint       | Descripción                               | Body (Cuerpo de la solicitud)                                                                                                                                              | Headers (Encabezados de la solicitud)                         |
|--------|----------------|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| POST   | /converter     | Convertir Uf a clp segun fecha            | { "fecha": "28-03-2022", "uf": 2 }                                                                                                                                         | Authorization: Bearer {token}                                 |
| POST   | /transactions  | Historial de conversiones                 | N/A                                                                                                                                                                        | Authorization: Bearer {token}                                 |                           |
| POST   | /excell        | Disponibiliza un excell con transacciones | N/A                                                                                                                                                                        | Authorization: Bearer {token}                                 |
| POST   | /today         | Actualizar información de una publicacion | N/A                                                                                                                                                                        | Authorization: Bearer {token}                                 |
