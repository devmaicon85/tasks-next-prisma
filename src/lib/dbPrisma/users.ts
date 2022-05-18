import prisma from "../prisma";

export type UserCreateType = {
    email: string;
    name: string;
    image: string | null;
};

export async function getUserByEmail(email: string) {
    if (!email) {
        console.log("Nenhum Email enviado");
        return null;
    }
    const data = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    return data;
}

export async function createOrUpdateUser(data: UserCreateType) {
    const { email, name, image } = data;

    if (!email) {
        console.log("Email não enviado para criação ou atualização do usuário");
        return false;
    }

    console.log("createOrUpdateUser()::");

    //procura user pelo email
    const user = await getUserByEmail(email);

    if (!user) {
        console.log(
            "createOrUpdateUser():: criando usuario com o email...",
            email
        );

        // se nao encontrar, cria
        try {
            const userBD = await prisma.user.create({
                data: {
                    email,
                    name,
                    image,
                    emailVerified: new Date(),
                },
            });
            console.log("createOrUpdateUser():: usuario criado:", name, email);
            return userBD;
        } catch (error) {
            console.log("error:", error);
            return false;
        }
    }

    // se encontrar, atualiza
    const userBD = await prisma.user.update({
        data: {
            email,
            name,
            image,
        },
        where: { email },
    });
    console.log("retornou existente usuario:::", email, name);

    return userBD;
}
