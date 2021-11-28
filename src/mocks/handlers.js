import { rest } from "msw";

const baseUrl = 'http://localhost:3000/api'

export const handlers = [
  rest.post(baseUrl + "/auth", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "abc123",
        user: {
          id: 1,
          nickname: "VictorTurraF",
          full_name: "Victor Turra",
        },
      })
    );
  }),

  rest.get(baseUrl + "/rooms", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 2,
          type: "contact",
          user: { nickname: "AmandaTF", name: "Amanda Turra" },
        },
        {
          id: 3,
          type: "contact",
          user: { nickname: "GagrielTF", name: "Gabriel Turra" },
        },
      ])
    );
  }),
];
