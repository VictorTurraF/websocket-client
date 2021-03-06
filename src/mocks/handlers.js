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
          id: 1,
          type: "contact",
          user: { id: 2, nickname: "AmandaTF", full_name: "Amanda Turra" },
        },
        {
          id: 2,
          type: "contact",
          user: { id: 3, nickname: "GagrielTF", full_name: "Gabriel Turra" },
        },
      ])
    );
  }),
];
