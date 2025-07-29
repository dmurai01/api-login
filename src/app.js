const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const cors = require('cors');

const app = express();

// Permitir requisições de qualquer origem (ou especifique a origem do seu frontend)
app.use(cors({
  // origin: 'http://192.168.1.103:4000', // ou use '*' para todas as origens (não recomendado para produção)
  origin: '*',
  credentials: true // se precisar enviar cookies/autenticação
}));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

