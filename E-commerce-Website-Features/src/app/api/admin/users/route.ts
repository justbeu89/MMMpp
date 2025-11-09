// app/api/admin/users/route.ts
import { sql } from "@/lib/utils"
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let users;
    if (search) {
      users = await sql`
        SELECT id, name, email, role, created_at, updated_at 
        FROM users 
        WHERE name ILIKE ${`%${search}%`} OR email ILIKE ${`%${search}%`}
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      users = await sql`
        SELECT id, name, email, role, created_at, updated_at 
        FROM users 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, role } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO users (name, email, role) 
      VALUES (${name}, ${email}, ${role || 'user'})
      RETURNING id, name, email, role, created_at, updated_at
    `;

    return NextResponse.json({ user: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    if (error instanceof Error && error.message.includes('unique constraint')) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}