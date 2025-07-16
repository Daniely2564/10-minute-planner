// route: /api/signin
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import clientPromise from "@custom/lib/mongodb";
import { User } from "@custom/models";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function GET() {
  const headersList = await headers();
  const user = JSON.parse(decodeURIComponent(headersList.get("user") || "{}"));
  return NextResponse.json({ ...user });
}

export async function POST(req: Request) {
  await clientPromise;

  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };

  const sanitizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: sanitizedEmail });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const passwordMatches = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatches) {
    return NextResponse.json(
      { message: "Incorrect Password" },
      { status: 401 }
    );
  }

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days

  const token = await new SignJWT({
    id: existingUser._id,
    email: existingUser.email,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    avatar: existingUser.avatar,
    userType: existingUser.userType,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

  const userCopy = JSON.parse(JSON.stringify(existingUser));
  delete userCopy.password;

  return NextResponse.json(
    { ...userCopy },
    {
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Max-Age=${exp}; Path=/`,
      },
    }
  );
}
