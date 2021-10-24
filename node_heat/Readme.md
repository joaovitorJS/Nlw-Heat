# Node Heat

>>Iniciando o projeto -> package.json
```bash
  yarn init -y
```

>>Instalando dependências
```bash
  # Express
  yarn add express

  # Dotenv -> para usar o process.env
  yarn add dotenv

  # Axios -> fazer chamadas de api externas
  yarn add axios

  # Lidar com os tokens JWT
  yarn add jsonwebtoken 

  # Socket.io
  yarn add socket.io

  # Cors
  yarn add cors
```

>>Instalando dependências de desenvolvimento
```bash
  # Tipagens
  yarn add -D @types/express typescript ts-node-dev

  # Prisma
  yarn add -D prisma
  yarn prisma init # iniciando um modelo

  # Tipagens do axios
  yarn add -D @types/axios

  # Tipagens do jsonwebtoken
  yarn add -D @types/jsonwebtoken 

  # Tipagens do socket.io
  yarn add -D @types/socket.io

  # Tipagens do cors
  yarn add -D @types/cors
``` 

>>Iniciando o tsconfig.json
```bash
  yarn tsc --init
```

>> Criando uma migration com o prisma
```bash
  yarn prisma migrate dev
  # após esse comando, será pedido o nome da migration
```

>> Prisma Studio
```bash
  yarn prisma studio
  # abre uma porta, para ver as tabelas da base de dados
```
