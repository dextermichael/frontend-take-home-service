import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge : 1 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            name: credentials?.name,
            email: credentials?.email,
          }),
          "cache": "no-cache"

        });
        // get Header Of that
        if (res.ok) {
          const headers = res.headers;
          const cookies = headers.get('set-cookie');
          if (cookies) {
            const fetchAccessTokenCookie = cookies
              .split(', ') // Split multiple cookies
              .find(cookie => cookie.startsWith('fetch-access-token=')); // Find the specific cookie

            if (fetchAccessTokenCookie) {
              // Extract the value of the cookie
              const fetchAccessToken = fetchAccessTokenCookie
                .split(';')[0] // Get the key-value pair
                .split('=')[1]; // Extract the value
                return {
                  name : credentials.name,
                  email: credentials.email,
                  randomKey: fetchAccessToken
                }
            }
            else {
              return null;
            }
          } else {
            return null;
          }

        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/"
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.randomKey,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        const u = user as unknown as any;
        // console.log(u)
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }

      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
        token.email = session.email;
      }

      return token;
    },
  },
};
