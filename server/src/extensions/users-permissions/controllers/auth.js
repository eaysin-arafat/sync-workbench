"use strict";

const { sanitizeEntity } = require("strapi-utils");
const jwt = require("jsonwebtoken");

module.exports = {
  async callback(ctx) {
    const provider = ctx.params.provider || "local";

    const params = ctx.request.body;

    const { identifier, password } = params;

    // Check if the identifier and password are provided
    if (!identifier || !password) {
      return ctx.badRequest(
        null,
        "Please provide both your identifier and password."
      );
    }

    // Find the user by the identifier
    const user = await strapi.query("user", "users-permissions").findOne({
      provider,
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
    });

    if (!user) {
      return ctx.badRequest(null, "Identifier or password invalid.");
    }

    const validPassword = await strapi.plugins[
      "users-permissions"
    ].services.user.validatePassword(password, user.password);

    if (!validPassword) {
      return ctx.badRequest(null, "Identifier or password invalid.");
    }

    // Check if the user is confirmed and not blocked
    if (user.blocked) {
      return ctx.badRequest(
        null,
        "Your account has been blocked by an administrator."
      );
    }

    if (!user.confirmed) {
      return ctx.badRequest(null, "Please confirm your account.");
    }

    // Generate JWT token
    const token = strapi.plugins["users-permissions"].services.jwt.issue({
      id: user.id,
    });

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      strapi.config.get("server.jwtSecret"), // Use the JWT secret from your Strapi configuration
      {
        expiresIn: "7d", // Set refresh token expiration time
      }
    );

    // Send both tokens to the user
    ctx.send({
      jwt: token,
      refreshToken,
      user: sanitizeEntity(user, {
        model: strapi.query("user", "users-permissions").model,
      }),
    });
  },
  async refresh(ctx) {
    const { refreshToken } = ctx.request.body;

    if (!refreshToken) {
      return ctx.badRequest("Refresh token is required");
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        strapi.config.get("server.jwtSecret")
      );

      const newToken = strapi.plugins["users-permissions"].services.jwt.issue({
        id: decoded.id,
      });

      ctx.send({
        jwt: newToken,
      });
    } catch (err) {
      return ctx.badRequest("Invalid refresh token");
    }
  },
};
