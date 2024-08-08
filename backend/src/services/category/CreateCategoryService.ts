import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    //Se o o nome for igual a uma string vazia:
    if (name === "") {
      throw new Error("Name invalid");
    }

    //cadastrando no banco
    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      //utilizo select para escolher apenas o que eu quero que retorne
      select: {
        id: true,
        name: true,
      },
    });
    
    return category;
  }
}

export { CreateCategoryService };
