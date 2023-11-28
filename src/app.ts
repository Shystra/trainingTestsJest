import express, { Request, Response } from 'express';
import { prisma } from './prisma.client';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/users', async (request: Request, Response: Response) => {
    const users = await prisma.user.findMany();
    request.json(users);
});

app.get('/users/:id', async(request: Request) => {
    
})