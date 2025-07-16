// route: /api/signup
import { NextResponse } from "next/server";
import clientPromise from "@custom/lib/mongodb";
import { User } from "@custom/models";

export async function POST(req: Request, res: Response) {
  await clientPromise;
  const body = (await req.json()) as {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    username: string;
  };

  const failureMessage = [];

  if (body.password !== body.confirmPassword) {
    failureMessage.push("Password and confirm password do not match");
  }
  if (body.password.length < 8) {
    failureMessage.push("Password must be at least 8 characters");
  }

  if (body.firstName.length < 1) {
    failureMessage.push("First name is required");
  }

  if (body.lastName.length < 1) {
    failureMessage.push("Last name is required");
  }

  if (body.username.length < 1) {
    failureMessage.push("Username is required");
  }

  const sanitizedEmail = body.email.trim().toLowerCase();

  if (!isValidEmail(sanitizedEmail)) {
    failureMessage.push(`${body.email} is not a valid email`);
  }

  // username should not contain space nor special characters
  if (body.username.match(/[^a-zA-Z0-9]/)) {
    failureMessage.push(
      '"Username" should not contain special characters. only alphanumeric characters are allowed'
    );
  }

  if (failureMessage.length > 0) {
    return NextResponse.json({ message: failureMessage }, { status: 400 });
  }

  const userFoundByEmail = await User.findOne({ email: sanitizedEmail });

  if (userFoundByEmail) {
    failureMessage.push("User already exists");
  }

  const userFoundByUsername = await User.findOne({ username: body.username });

  if (userFoundByUsername) {
    failureMessage.push("Username already exists");
  }

  if (failureMessage.length > 0) {
    return NextResponse.json({ message: failureMessage }, { status: 400 });
  }

  await User.create({
    email: sanitizedEmail,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    username: body.username,
  });

  return NextResponse.json({ message: "Successfully created a user" });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
