import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { isValidEmail } from '@/utils/validationsEmail';
import db from '@/database/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (password !== null && password?.length < 6) {
      return NextResponse.json(
        {
          message: 'The password must be 6 characters',
        },
        { status: 400 },
      );
    }

    if (name?.length < 2) {
      return NextResponse.json(
        {
          message: 'The name must be 2 characters',
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: 'The email is not in email format',
        },
        { status: 400 },
      );
    }

    const hashedPassword = await (password && bcrypt.hash(password, 10));
    await db.connect();

    const userExists = await User.findOne({ email }).select('_id');

    if (userExists) {
      throw new Error('The user with this email address is already registered');
    }

    if (hashedPassword) {
      const newUser = new User({
        email: email?.toLocaleLowerCase(),
        password: hashedPassword,
        role: 'client',
        name,
      });

      await newUser.save({ validateBeforeSave: true });
    } else {
      const newUser = new User({
        email: email?.toLocaleLowerCase(),
        role: 'client',
        name,
      });

      await User.create(newUser);
    }

    return NextResponse.json({ message: 'User successfully registered.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          ((error as Error)?.message as string) || 'An error occurred while registering the user.',
      },
      { status: 400 },
    );
  }
}
