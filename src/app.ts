import express, { Request, Response, response } from 'express';
import { prisma } from './prisma.client';
import { User } from './user';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/users', async (request: Request, Response: Response) => {
    const users = await prisma.user.findMany();
    response.json(users);
});

app.get('/users/:id', async(request: Request, response: Response) => {
    const {id} = request.params;
    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    if (!user){
        return response.status(404).json({ error: 'User not found' });
    };

    response.json(user)
});


app.post('/users', async (request: Request, response: Response) => {
    const { name, email } = request.body;
    const user = new User(name, email);
    User.validate(user);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    
    response.status(201).json(newUser);
});


app.put('/users/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, email } = request.body;
    const updateUser = await prisma.user.update({
        where: { id: id },
        data: {
            name,
            email,
        },
    });
    response.json(updateUser);
});

app.delete('/users/:id', async(request: Request, response: Response) => {
    const { id } = request.params;
    const deleteUser = await prisma.user.delete({
        where: { id: id },
    });    

    response.json(deleteUser);
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})