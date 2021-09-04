import { createServer } from 'http';
import { port } from '@config/config';

const server = createServer((req, res) => {
  res.end('<h1>Hello world!</h1>');
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
