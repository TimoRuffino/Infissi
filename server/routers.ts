import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { commesseRouter } from "./routers/commesse";
import { apertureRouter } from "./routers/aperture";
import { interventiRouter } from "./routers/interventi";
import { anomalieRouter } from "./routers/anomalie";
import { ticketRouter } from "./routers/ticket";
import { squadreRouter } from "./routers/squadre";
import { garanzieRouter } from "./routers/garanzie";
import { verbaliRouter } from "./routers/verbali";
import { clientiRouter } from "./routers/clienti";
import { fornitoriRouter } from "./routers/fornitori";
import { produzioneRouter } from "./routers/produzione";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  commesse: commesseRouter,
  aperture: apertureRouter,
  interventi: interventiRouter,
  anomalie: anomalieRouter,
  ticket: ticketRouter,
  squadre: squadreRouter,
  garanzie: garanzieRouter,
  verbali: verbaliRouter,
  clienti: clientiRouter,
  fornitori: fornitoriRouter,
  produzione: produzioneRouter,
});

export type AppRouter = typeof appRouter;
