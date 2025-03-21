import {
  createPsychologist,
  getPsychologistByUser,
  updatePsychologistByUser,
} from "@/app/_database/daos/psychologistDao";
import {
  createUser,
  getUpdatedUserByEmail,
  getUserByEmail,
  getUserById,
  updateUserByEmail,
} from "@/app/_database/daos/userDao";
import Roles from "@/app/_enums/Roles";
import { UserStates } from "@/app/_enums/UserStates";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import IUser from "@/app/_interfaces/IUser";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import slugify from "slugify";
import { comparePass } from "@/app/_encryption/userPass";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.edu.co",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email) throw Error("Las credenciales están vacías.");
        const user: IUser = await getUserByEmail(credentials.email);
        if (!user) throw Error("El usuario no existe.");
        if (!user.password)
          throw new Error("El usuario está logueado con Google.");
        if (user.state !== UserStates.Activo)
          throw new Error("El usuario está inactivo.");
        {
          const matchPass = await comparePass(
            credentials.password,
            user.password
          );

          if (!matchPass) throw new Error("Contraseña incorrecta.");
        }
        return {
          id: user._id!,
          name: user.firstName!,
          email: user.email!,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ credentials, account, profile }) {
      if (credentials) return true;
      if (!profile?.email) throw new Error("No profile");
      const newUser: Partial<IUser> = {
        firstName: profile.given_name,
        lastName: profile.family_name,
        fullName: profile.name,
        email: profile.email,
        profilePicture: profile.picture,
      };
      const receivedUser = await getUserByEmail(profile.email);
      if (receivedUser) {
        await updateUserByEmail(profile.email, {
          profilePicture: profile.picture,
        });
        if (receivedUser.role === Roles.Practicante) {
          const userPsychologist: IPsychologist = {
            fullName: receivedUser.fullName,
            gender: receivedUser.gender || "Indefinido",
            profilePicture: receivedUser.profilePicture!,
            user: receivedUser._id!,
            slug: slugify(profile.name!),
            isPublic: true,
            state: UserStates.Activo,
          };
          const psychologist = await getPsychologistByUser(receivedUser._id!);
          if (psychologist) {
            console.log("Este psicólogo sí existe");
            await updatePsychologistByUser(receivedUser._id!, userPsychologist);
          } else {
            console.log("Este psicólogo no existe");
            await createPsychologist(userPsychologist);
          }
        }
      } else {
        newUser.state = UserStates.Activo;
        newUser.role = Roles.Consultante;
        await createUser(newUser as IUser);
      }
      return true;
    },
    async jwt({ token, user, profile, trigger, session }) {
      console.log("JWT");
      if (trigger === "update") {
        if (session) {
          if (session.appointmentPatientId) {
            token.appointmentPatientId = session.appointmentPatientId as string;
            token.appointmentPatientName = (
              await getUserById(session.appointmentPatientId as string)
            )?.fullName;
          } else {
            token.user = await getUpdatedUserByEmail(token.email!, session);
          }
        } else {
          token.appointmentPatientId = undefined;
          token.appointmentPatientName = undefined;
        }
      } else if (user) {
        const dbUser = await getUserByEmail(user.email as string);
        token.user = dbUser;
        token.psychologist = await getPsychologistByUser(dbUser?._id!);
      }
      return token;
    },
    session({ session, token, user }) {
      session.user = token.user as IUser;
      session.psychologist = token.psychologist as IPsychologist;
      session.appointmentPatientId = token.appointmentPatientId as string;
      session.appointmentPatientName = token.appointmentPatientName as string;
      return session;
    },
  },
};

export default authOptions;
