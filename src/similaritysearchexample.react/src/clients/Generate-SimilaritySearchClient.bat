
SET CLIENT_NAME=similarity-search 
CALL curl http://localhost:5107/swagger/all/swagger.json --output %CLIENT_NAME% 
CALL openapi-zod-client %CLIENT_NAME%
DEL %CLIENT_NAME%