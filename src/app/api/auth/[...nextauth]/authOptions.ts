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
import slugify from "slugify";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  providers: [
    // Credentials({
    //     credentials: {
    //         email: {label: "Correo", type: "text"}
    //     }
    //     ,
    //     async authorize(credentials, req) {
    //         await connect();
    //         const userFound = await User.findOne({email: credentials?.email})
    //         return userFound ? userFound : null;
    //     }
    // }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
      const newUser: Partial<IUser> = {
        firstName: profile.given_name,
        lastName: profile.family_name,
        fullName: profile.name,
        email: profile.email,
        profilePicture: profile.picture,
      };
      // await connect();
      // const user = await User.findOne({ email: profile.email });
      const user = await getUserByEmail(profile.email);
      if (user) {
        // await User.updateOne({ email: profile.email }, upsertUser);
        await updateUserByEmail(profile.email, {
          profilePicture: profile.picture,
        });
        if (user.role === Roles.Practicante) {
          const upsertPsychologist: IPsychologist = {
            fullName: user.fullName,
            gender: user.gender || "Indefinido",
            profilePicture: user.profilePicture!,
            user: user._id!,
            slug: slugify(profile.name!),
            isPublic: true,
            state: UserStates.Activo,
          };
          // const psychologist = await Psychologist.findOne({ user: user._id });
          const psychologist = await getPsychologistByUser(user._id!);
          if (psychologist) {
            console.log("Este psicólogo sí existe");
            // await Psychologist.updateOne({ user: user._id }, upsertPsychologist)
            await updatePsychologistByUser(user._id!, upsertPsychologist);
          } else {
            console.log("Este psicólogo no existe");
            // await Psychologist.create(upsertPsychologist);
            await createPsychologist(upsertPsychologist);
          }
        }
      } else {
        newUser.state = UserStates.Activo;
        newUser.role = Roles.Consultante;
        // await User.create(upsertUser);
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
            console.log("Session es: " + JSON.stringify(session));
            console.log("Token es: " + JSON.stringify(token));
            // token.user = await User.findOneAndUpdate({ email: token.email }, session, {new: true});
            token.user = await getUpdatedUserByEmail(token.email!, session);
          }
        } else {
          token.appointmentPatientId = undefined;
          token.appointmentPatientName = undefined;
        }
      }
      // console.log("llamando jwt");
      // console.log("El usuario es:" + JSON.stringify(token.user))
      // console.log("El perfil es:" + JSON.stringify(profile))
      // console.log("El token es:" + JSON.stringify(token))
      else if (user) {
        // const dbUser = await User.findOne({ email: user.email });
        const dbUser = await getUserByEmail(user.email as string);
        token.user = dbUser;
        console.log("El usuario es:" + JSON.stringify(token.user));
        // token.psychologist = await Psychologist.findOne({ user: dbUser?._id })
        console.log("Buscando psicólogo");
        token.psychologist = await getPsychologistByUser(dbUser?._id!);
        console.log(`El psicólogo es: ${token.psychologist}`);
      }
      return token;
    },
    session({ session, token, user }) {
      // console.log("llamando session");
      session.user = token.user as IUser;
      session.psychologist = token.psychologist as IPsychologist;
      session.appointmentPatientId = token.appointmentPatientId as string;
      session.appointmentPatientName = token.appointmentPatientName as string;
      return session;
    },
  },
};

export default authOptions;
