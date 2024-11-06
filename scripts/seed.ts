const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data : [
                {
                    name: "Web Development",
                },
                {
                    name: "Mobile Development",
                },
                {
                    name: "Data Science",
                },
                {
                    name: "Machine Learning",
                },
                {
                    name: "Artificial Intelligence",
                },
                {
                    name: "Cybersecurity",
                },
                {
                    name: "Game Development",
                },
            ],
    });
    console.log("Success");
    } catch (error) {
        console.log("Error seeding categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();