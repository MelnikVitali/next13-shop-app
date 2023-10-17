import db from '@/database/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    await db.connect();

    const { email } = await req.json();
    const user = await User.findOne({ email }).select('_id');

    await db.disconnect();

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'User Not found' }, { status: 204 });
  }
};
