const prisma = require("../prisma/prisma-client");

const followUser = async (req, res) => {
   const { followingId } = req.body;
   const userId = req.user.userId;

   if (followingId === userId) {
      return res.status(500).json({ error: "You can't follow yourself" });
   }

   try {
      const existingFollow = await prisma.follows.findFirst({
         where: {
            AND: [{ followerId: userId }, { followingId }],
         },
      });

      if (existingFollow) {
         return res.status(400).json({ error: "Subscription is already exist" });
      }

      await prisma.follows.create({
         data: {
            follower: { connect: { id: userId } },
            following: { connect: { id: followingId } },
         },
      });

      res.status(201).json({ message: "Subscription successfully created" });
   } catch (error) {
      console.error("Follow Error", error);
      res.status(500).json({ error: "Internal server error" });
   }
};
const unfollowUser = async (req, res) => {
   const { followingId } = req.body;
   const userId = req.user.userId;

   try {
      const follows = await prisma.follows.findFirst({
         where: {
            AND: [{ followerId: userId }, { followingId }],
         },
      });

      if (!follows) {
         return res.status(404).json({ error: "Subscription not found" });
      }

      await prisma.follows.delete({
         where: {
            id: follows.id,
         },
      });

      res.status(201).json({ message: "Subscription successfully removed" });
   } catch (error) {
      console.error("Follow Error", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

const FollowController = {
   followUser: followUser,
   unfollowUser: unfollowUser,
};

module.exports = FollowController;
