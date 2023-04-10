import { Users } from "../../models/user/user.model.js";

export const createUser = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Al parecer hay problemas al intentar crear un nuevo usuario",
    });
  }
};
