/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as astrology from "../astrology.js";
import type * as auth from "../auth.js";
import type * as chatbot from "../chatbot.js";
import type * as doshaAnalysis from "../doshaAnalysis.js";
import type * as horoscopes from "../horoscopes.js";
import type * as http from "../http.js";
import type * as marriageTiming from "../marriageTiming.js";
import type * as products from "../products.js";
import type * as remedies from "../remedies.js";
import type * as router from "../router.js";
import type * as subscription from "../subscription.js";
import type * as successGuide from "../successGuide.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  astrology: typeof astrology;
  auth: typeof auth;
  chatbot: typeof chatbot;
  doshaAnalysis: typeof doshaAnalysis;
  horoscopes: typeof horoscopes;
  http: typeof http;
  marriageTiming: typeof marriageTiming;
  products: typeof products;
  remedies: typeof remedies;
  router: typeof router;
  subscription: typeof subscription;
  successGuide: typeof successGuide;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
