import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
// import { upsertUser } from "../services/user.service";
import { db } from "../db/db.config";
import { env } from "../configs/env.config";
import { TRPCError } from "@trpc/server";

interface RegisterFormType {
  email: string;
  userName: string;
  password: string;
  role: string;
}

export const Auth: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  fastify.post("/auth/register", async function (request, reply) {
    try {
      const { email, userName, password, role } =
        request.body as RegisterFormType;

      const user = await db.user.create({
        email: email,
        name: userName,
        password: password,
        role: role,
      });

      console.info(user);

      const jwtToken = fastify.jwt.sign({ user });
      reply.setCookie("session", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        domain: new URL(env.FRONTEND_URL as string).hostname,
      });

      reply.code(200).send({
        success: true,
        redirectUrl: `${env.FRONTEND_URL}/auth/login`,
      });
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post("/auth/login", async function (request, reply) {
    try {
      const { email, password } = request.body as Omit<
        RegisterFormType,
        "role" | "userName"
      >;

      const user = await db.user.where({ email }).where({ password });

      if (user[0]?.id) {
        const jwtToken = fastify.jwt.sign({ user: user[0] });
        reply.setCookie("session", jwtToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
          domain: new URL(env.FRONTEND_URL as string).hostname,
        });

        reply.send({
          statusCode: 200,
          success: true,
          redirectUrl: `${env.FRONTEND_URL}/auth/login`,
        });
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized User",
        });
      }
    } catch (error) {
      reply.send(error);
    }
  });
});
