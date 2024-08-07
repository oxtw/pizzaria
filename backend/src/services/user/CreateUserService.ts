import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    //Verificar se ele enviou um e-mail
    if (!email) {
      throw new Error("E-mail Incorrect");
    }

    //Verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    //Cadastrando Usuário no banco de dados
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
      select:{
        id: true,
        name: true,
        email: true,
      }
    });

    return { name: name };
  }
}

export { CreateUserService };
