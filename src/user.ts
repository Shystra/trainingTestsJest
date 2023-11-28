class User {
    name: string;
    email: string;
    id?: string;

    constructor(name: string, email: string, id?: string){
        this.name = name;
        this.email = email;
        this.id = id;
    };

    static validate(user: User){
        const isEmailValid = user.email.includes('@');
        if (user.name.length < 5) throw new Error('Invalid user');

        if(!isEmailValid) throw new Error('Invalid email');
    };

    static create(name: string, email: string){
        const newUser = new User(name, email);
        User.validate(newUser);
        return newUser;
    };
}

export { User };