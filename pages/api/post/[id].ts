import prisma from "../../../lib/prisma";

// DELETE /api/post/:id
export default async function handle(req, res) {
  const postId = Number(req.query.id);
  if (req.method === "DELETE") {
    // Delete the categories associated with the post
    const categories = await prisma.categoriesOnPosts.findMany({
      where: { postId },
    });

    for (const category of categories) {
      await prisma.categoriesOnPosts.delete({
        where: { 
          postId_categoryId: {
            postId: category.postId,
            categoryId: category.categoryId
          }
        },
      });
    }

    // Delete the post
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}