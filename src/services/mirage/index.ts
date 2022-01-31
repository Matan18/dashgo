import { createServer, Factory, Model } from "miragejs";
import Leite from 'leite';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },
    factories: {
      user: Factory.extend({
        name(index: number) {
          return `User ${index + 1}`;
        },
        email() {
          return new Leite().pessoa.email().toLowerCase();
        },
        createdAt() {
          return new Date()
        },
      })
    },
    seeds(server) {
      server.createList('user', 10);
    },
    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    }
  });
  return server;
}