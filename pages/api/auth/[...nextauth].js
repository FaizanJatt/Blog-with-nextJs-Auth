import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import clientPromise from "./lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          image: profile.picture.data.url,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],
  session: {
    jwt: true,
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("user", user);
    //   console.log(account);
    //   console.log(profile);
    //   // console.log(credentials);
    //   return true;
    // },

    jwt: async ({ token, user }) => {
      console.log(token);
      console.log(user);
      console.log("!user");
      if (user) {
        console.log("user");
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      console.log(token, user, session);
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
