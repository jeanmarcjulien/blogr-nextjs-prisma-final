import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

function createCategoriesFromArray(values, object) {
  const newArray = [];
  for (let i = 0; i < values.length; i++) {
    const newObject = Object.assign({}, object);
    newObject.category = {
      create: {
        name: values[i],
      },
    };
    newArray.push(newObject);
  }

  return newArray;
}

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, image, content, business,fashion,food,health,movie,music,news,sports,technology,travel } = req.body;
  const CatValues = [business,fashion,food,health,movie,music,news,sports,technology,travel]

  for (let i = 0; i < CatValues.length; i++) {
    CatValues[i] = CatValues[i].trim();
  }

  const object = {
    assignedBy: "",
    assignedAt: new Date(),
    category: {
      create: {
        name: "New category",
      },
    },
  };

  const categoryValues = createCategoriesFromArray(CatValues, object);

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      image:image,
      author: { connect: { email: session?.user?.email } },
      categories: {
        create: categoryValues,
      },
      
    },
  });
  res.json(result);
}