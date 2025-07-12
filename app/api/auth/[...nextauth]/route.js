import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const domain = (process.env.NODE_ENV === "production" ? ".toolstol.com" : "localhost")

const handler = NextAuth({
    cookies: {
        sessionToken: {
            name: "__drk__session_token",
            options: {
                domain: domain,
                httpOnly: true,
                sameSite: "lax",
                secure: true,
                path: "/",
            }
        },
        callbackUrl: {
            name: `__drk__callback_url`,
            options: {
                sameSite: 'lax',
                domain: domain,
                path: '/',
                secure: true
            }
        },
        csrfToken: {
            name: `__drk__csrf_token`,
            options: {
                httpOnly: true,
                domain: domain,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        pkceCodeVerifier: {
            name: `__drk_pkce_code_verifier`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                domain: domain,
                path: '/',
                secure: true,
                maxAge: 900
            }
        },
        state: {
            name: `__drk_state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                domain: domain,
                path: "/",
                secure: true,
                maxAge: 900
            },
        },
        nonce: {
            name: `__drk_nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                domain: domain,
                path: "/",
                secure: true,
            },
        },
    },
    providers: [
        GoogleProvider({
            clientId: "933246840942-mfb7r" + "toe4qfbii962l791ea4jdmci3kg.a" + "pps.googleusercontent.com",
            clientSecret: "GOCSPX-3jeg1of" + "ezHLvLIvbqIXT" + "CR--qC4Y",
            authorization: {
                params: {
                    scope: "openid email profile",
                },
            },
        }),
    ],
    events: {

    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.uid = profile.sub || token.sub
                token.email_verified = profile.email_verified
            }

            if (token.sub) {
                delete token.sub
            }

            return token
        },

        async session({ session, token }) {
            session.user.uid = token.uid
            session.user.email_verified = token.email_verified || false

            return session
        },

        async signIn({ user, account, credentials, email, profile }) {
            return true
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 3,
        updateAge: 60 * 60 * 24,
    },
    jwt: {
        secret: "this-is-great-jwt-secret",
    },
    secret: "next-auth-secret-by-drk",
});

export { handler as GET, handler as POST };