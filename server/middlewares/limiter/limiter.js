const rateLimit = require("express-rate-limit");

const configLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100000, // for development
  message: {
    message: "Too many requests, please try again later.",
  },
});

const logLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100000,
  message: {
    message: "Too many requests, please try again later.",
  },
});

const createPostLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100000,
  message: { message: "Too many requests, please try again later." },
});

const likeSaveLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100000, // allow 250 requests per 10 minutes combined for like,unlike,save,unsave
  message: { message: "Too many requests, please try again later." },
});

const followLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100000,
  message: { message: "Too many requests, please try again later." },
});

const signUpSignInLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100000,
  message: { message: "Too many requests, please try again later." },
});

const commentLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100000,
  message: { message: "Too many comments, please try again later." },
});

module.exports = {
  configLimiter,
  logLimiter,
  createPostLimiter,
  likeSaveLimiter,
  followLimiter,
  signUpSignInLimiter,
  commentLimiter,
};
