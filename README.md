# auth-api
Este proyecto esta echo con Express.

Utiliza sequialize como ORM.

Crea y permite la autenticación de usuarios. Al completarse el inicio de sesión, se genera un token (jwt), el cual se comprueba que sea válido para acceder demás endpoints de la API.

# Tiene 4 endpoints

- Crear Usuario /new
- Login Usuario /
- Renovar token /renew
- Listar usuarios /list