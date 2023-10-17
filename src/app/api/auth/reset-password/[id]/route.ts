import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/database/db';
import User from '@/models/User';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params: { id } }: Params) {
  try {
    await db.connect();
    const { password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatePassword = await User.findOneAndUpdate({ _id: id }, { password: hashedPassword });
    await db.disconnect();

    if (!updatePassword) {
      return NextResponse.json({ message: 'Password update failed.' }, { status: 403 });
    }

    return NextResponse.json({ message: 'Your password has been updated.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error?.toString() }, { status: 403 });
  }
}
